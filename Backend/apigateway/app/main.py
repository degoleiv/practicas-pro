

  
    
# documentacion de las api : http://localhost:8000/docs#/
# http://localhost:8000/redoc#/
# ejecutar el server 
# uvicorn main:app --reload

from fastapi import FastAPI,Request,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import auth_routes
from routes.users import usersApi
from init import *
description = """
API Gateway para el sistema de prácticas profesionales de Uniminuto.
## Funcionalidades

El sistema permite a estudiantes, docentes y empresas interactuar de manera eficiente y segura para la gestión de prácticas profesionales.

### Funcionalidades Principales:

* **Gestión de Estudiantes**: Registro, actualización y consulta de perfiles de estudiantes.
* **Gestión de Prácticas Profesionales**: Creación, actualización y seguimiento de ofertas de prácticas.
* **Gestión de Empresas**: Registro, actualización y publicación de ofertas de prácticas por parte de empresas.
* **Gestión de Docentes y Tutores**: Asignación y seguimiento de tutores a estudiantes y prácticas.
"""

app = FastAPI(
    title="Uniminuto Prácticas Profesionales",
    description=description,
    summary="API Gateway para la gestión de prácticas profesionales en Uniminuto.",
    version="1.0.0",
    terms_of_service="http://example.com/terms/",
    contact={
        "name": "Equipo de TI Uniminuto",
        "url": "http://uniminuto.edu/contact/",
        "email": "ti@uniminuto.edu",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    }
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost", "http://localhost:5173"],  
  allow_credentials=True,
  allow_methods=["GET", "POST","PUT","DELETE"], # include additional methods as per the application demand
  allow_headers=["Content-Type","Set-Cookie","Authorization"], # include additional headers as per the application demand
)
# poner eventos de inicio de api y de final de api 
app.include_router(auth_routes, prefix="/practicas")
app.include_router(usersApi, prefix="/redirect")

