from motor.motor_asyncio import  AsyncIOMotorClient
from models import Profesores
from os import getenv
from init import *
from bson import ObjectId

client = AsyncIOMotorClient(f'mongodb://{getenv("IP_MONGODB")}')

database = client.profesoresdb
collection = database.profesores
    

async def get_all_profesores ():
    profesores = []
    cursor =  collection.find({})
    async for document in cursor:
        profesores.append(Profesores(**document))
    return profesores

async def get_one_profesores (id):
    profesores = await collection.find_one({'_id': ObjectId(id)})
    return profesores

async def get_search_profesores ( regex):
    profesores = []
    import re
    regex_pattern = re.compile(regex, re.IGNORECASE)
    


    sample_document = await collection.find_one()
    def expandir_campos(documento, prefijo=''):
        campos_expandidos = []
        for key, value in documento.items():
            # Si el valor es un diccionario (subcampo), expandir sus claves recursivamente
            if isinstance(value, dict):
                campos_sub = expandir_campos(value, prefijo + key + '.')
                campos_expandidos.extend(campos_sub)
            else:
                # Agregar el nombre del campo con el prefijo
                campos_expandidos.append(prefijo + key)
        return campos_expandidos
    
    CAMPOS_BUSQUEDA = expandir_campos(sample_document)
 
    

    condicion_regex = [{clave: {"$regex": regex_pattern} } for clave in CAMPOS_BUSQUEDA ]
    consulta_dinamica = {"$or":condicion_regex }
    cursor = collection.find(consulta_dinamica)

    async for document in cursor:
        profesores.append(Profesores(**document))
    return profesores

async def upload_profesores  (profesores):
    new_profesores  = await collection.insert_one(profesores)
    created_profesores  = await collection.find_one({'_id': new_profesores .inserted_id})
    return created_profesores
   

# calidar si queda una copia incativa del mismo archivo 
async def update_profesores ( id: str, data):
    profesores = {k: v  for k, v in data.dict().items() if v is not None }
    await collection.update_one({'_id': ObjectId(id)}, {'$set': profesores})
    document = await collection.find_one({'_id': ObjectId(id)})
    return document

async def delete_profesores ( id : str):
    await collection.delete_one({'_id': ObjectId(id)})
    return True
