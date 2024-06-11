from middlewares.rate_limit import rate_limit
from middlewares.cache import cache_api
from uuid import uuid4
from typing import List
from fastapi import APIRouter, Header, HTTPException, Request,Response, Cookie
from pydantic import BaseModel, EmailStr
from datetime import datetime
from middlewares.functions_jwt import jwt_validator
from fastapi.responses import JSONResponse
auth_routes = APIRouter()

@auth_routes.get("/verify/token")
@rate_limit(max_requests=5, Window=60)
@cache_api(time=3600)
async def verify_token(request: Request):
    """
    NOTE: Validation of Bearer Token and decode information as user 
    :param Authorization: Bearer Token 
    :return: Email, expiration token, otros atributos del usuario
    """
    access_token_cookie = request.cookies.get("idToken")
    print(access_token_cookie)
    if access_token_cookie:
        user = jwt_validator(access_token_cookie)
        print(user)
        if user:
            return {'recuperado con exito'}
        else:
            # Manejar el caso en el que el token no sea válido
            raise HTTPException(
                status_code=401, detail="Token de acceso no válido")
    else:
        # Manejar el caso en el que no se reciba el token de acceso
        raise HTTPException(
            status_code=401, detail="Token de acceso no proporcionado")


@auth_routes.get('/jwt_auth')
@rate_limit(max_requests=5, Window=60)
@cache_api(time=3600)
async def handle_request(request: Request, response : Response, authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Esquema de autenticación inválido")
        if not jwt_validator(token):
            raise HTTPException(status_code=401, detail="Token inválido")
        response.set_cookie(key="idToken", value=token, httponly=True)
        return {"status":"jwt validado"}
    except ValueError:
        raise HTTPException(status_code=401, detail="Encabezado de autorización no está en el formato esperado")