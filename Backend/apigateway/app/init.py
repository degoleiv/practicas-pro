from dotenv import load_dotenv, find_dotenv
from os import getenv
import redis.asyncio as redis
loaded = load_dotenv()


if loaded:
    print(".env cargado correctamente")
else:
    print("No se pudo cargar el archivo .env")


class RedisConnect:
    def __init__(self):
        self.redis = None  # Placeholder for the Redis connection

    async def initialize(self):
        self.redis = await redis.Redis(host=getenv("IP_REDIS"), password=getenv("PASSWORD_REDIS"))