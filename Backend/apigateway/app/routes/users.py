from fastapi import APIRouter,Request,HTTPException,Response
from middlewares.verify_token_route import VerifyTokenRoute
from typing import Optional
from fastapi.responses import JSONResponse
import httpx
from middlewares.rate_limit import rate_limit
from middlewares.cache import cache_api

# usersApi = APIRouter(route_class=VerifyTokenRoute)
usersApi = APIRouter()

# Configuración de las URL de los servicios API
services = {
    "preinscriptions": "http://192.168.0.12:8001/preinscriptions",
    "files": "http://192.168.0.12:8002/files",
    "empresas": "http://192.168.0.12:8003/empresas",
    "notificaciones": "http://192.168.0.12:8004/notificaciones",
    "profesores": "http://192.168.0.12:8005/profesores",
}

async def forward_request(method: str, service: str, funcion: str, data: dict):
    if service not in services:
        
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    
    url = f"{services[service]}"
    url = url  + f"{funcion}" if funcion != '' else url  
    print(url)
    async with httpx.AsyncClient() as client:
        if method == "GET":
            response = await client.get(url)
        elif method == "POST":
            response = await client.post(url, json=data)
        elif method == "PUT":
            response = await client.put(url, json=data)
        elif method == "DELETE":
             response = await client.delete(url)
        else:
            raise HTTPException(status_code=405, detail="Método no permitido")
            
        return response.content, response.status_code

@usersApi.api_route("/{service}", methods=["GET", "POST", "PUT", "DELETE"])
@rate_limit(max_requests=5, Window=30)
# @cache_api(time=3600)
async def handle_request(request: Request, service: str, funcion: Optional[str] = '' ):
    method = request.method
    
    data = {}
    if method == "POST":
        try:
            data = await request.json()
        except:
           pass
    content, status_code = await forward_request(method, service, str(funcion), data)
    return Response(content=content, status_code=status_code)



   
@usersApi.get('/')
@rate_limit(max_requests=5, Window=30)
@cache_api(time=3600)
async def welcome(request: Request):
    return {'message': 'apigateway corriendo'}