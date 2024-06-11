from fastapi import HTTPException,Request, status

from functools import wraps
from init import RedisConnect
import redis.asyncio as redis
import json
class APICacher (RedisConnect):
    async def init_redis (self):
        await self.initialize()
    async def get_data(self, key: str):
        cached_response = await self.redis.get(key)
        if cached_response:
            cached_json = json.loads(cached_response) 
            return cached_json
        return None

    async def set_data(self, key: str, value: str, expiration: int):
        try:
            
            value_str = json.dumps(value)  
            await self.redis.set(key, value_str, ex=expiration)
        except redis.ConnectionError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Redis error: {str(e)}"
            ) from e

def cache_api(time: int):
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            cacher = APICacher()
            await cacher.init_redis()
            cache = await cacher.get_data(request.url.path)
            if cache:
                return cache
                # raise HTTPException(
                #     status_code=status.HTTP_200_OK,
                #     detail=cache
                # )
            response = await func(request, *args, **kwargs)
            await cacher.set_data(request.url.path, response, time)  # 1 hour expiration
            return response
        return wrapper
    return decorator