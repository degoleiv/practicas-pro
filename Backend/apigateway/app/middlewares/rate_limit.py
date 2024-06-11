

import redis.asyncio as redis
from init import RedisConnect
from fastapi import HTTPException,Request, status
import time
from functools import wraps
from dotenv import load_dotenv


    
        
class RateLimiter (RedisConnect):
    async def init_redis (self):
        await self.initialize()
      
    async def is_rate_limited(self, key: str, max_requests: int, window: int) -> bool:
        
        
        current = int(time.time())
        window_start = current - window
        async with  self.redis.pipeline(transaction=True) as pipe:      
          
            try:
                pipe.zremrangebyscore(key, 0, window_start)
                pipe.zcard(key)
                
                ttl = await self.redis.ttl(key)
                print(ttl)
                if ttl != -2:  
                    time_remaining = ttl
                else:
                    time_remaining = window
                print(current)
                pipe.zadd(key, {current: current})
                
                pipe.expire(key, time_remaining)
                results = await pipe.execute()
                
                pipe.zrange(key, 0, 0, withscores=True)
                time_remaining = ttl
               

            except redis.ConnectionError as e:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Redis error: {str(e)}"
                ) from e
        is_limited = results[1] > max_requests        
        return is_limited, time_remaining

def rate_limit(max_requests: int, Window: int):
    
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            key = f"rate_limit:{request.client.host}:{request.url.path}"
            limiter = RateLimiter()
            await  limiter.init_redis()
            is_limited, time_remaining = await limiter.is_rate_limited(key=key, max_requests=max_requests, window=Window)
            
            if is_limited:  
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail=f"has hecho muchas solicitudes por favor espera {time_remaining} segundos. "
                )
            return await func(request, *args, **kwargs)
    
            
        return wrapper
    return decorator



