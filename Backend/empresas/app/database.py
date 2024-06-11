from motor.motor_asyncio import  AsyncIOMotorClient
from models import Empresa
from os import getenv
from init import *
from bson import ObjectId

client = AsyncIOMotorClient(f'mongodb://{getenv("IP_MONGODB")}')

database = client.empresadb
collection = database.empresa
    

async def get_all_incripscion ():
    incripscion = []
    cursor =  collection.find({})
    async for document in cursor:
        incripscion.append(Empresa(**document))
    return incripscion

async def get_one_incripscion (id):
    incripscion = await collection.find_one({'_id': ObjectId(id)})
    return incripscion

async def get_search_incripscion ( regex):
    incripscion = []
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
        incripscion.append(Empresa(**document))
    return incripscion

async def upload_incripscion (incripscion):
    new_incripscion = await collection.insert_one(incripscion)
    created_incripscion = await collection.find_one({'_id': new_incripscion.inserted_id})
    return created_incripscion
   

# calidar si queda una copia incativa del mismo archivo 
async def update_incripscion ( id: str, data):
    incripscion = {k: v  for k, v in data.dict().items() if v is not None }
    await collection.update_one({'_id': ObjectId(id)}, {'$set': incripscion})
    document = await collection.find_one({'_id': ObjectId(id)})
    return document

async def delete_incripscion ( id : str):
    await collection.delete_one({'_id': ObjectId(id)})
    return True
