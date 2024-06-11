from fastapi import FastAPI
from routes.preinscripciones import incripscion_routes
from fastapi.middleware.cors import CORSMiddleware
import os 


app = FastAPI()

app.include_router(incripscion_routes, prefix="/preinscriptions")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.0.12:4699"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get('/')
async def welcome():
    return {'message': 'api de practicas corriendo'}



