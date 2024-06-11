from motor.motor_asyncio import AsyncIOMotorClient
from models import Files
from os import getenv
from init import *
from bson import ObjectId

from modules.blob import BlobStorage
print(getenv("IP_MONGODB"))
client = AsyncIOMotorClient(f'mongodb://{getenv("IP_MONGODB")}')
blobobj = BlobStorage()
database = client.filesdb
collection = database.files


async def get_all_files():
   
    files = []
    cursor = collection.find({})
    async for document in cursor:
        for blob_i in blobobj.container_client.list_blobs():
            
            try:
                url = blobobj.url_file(blob_i.name)
               
                if document['ruta'] == blob_i.name:
                    
                    document['ruta'] =  url
            except:
                print('no se ha encontrado la clave')        
        files.append(Files(**document))
    return files


async def get_one_file(id):
    file = await collection.find_one({'_id': ObjectId(id)})
    
    blob = blobobj.container_client.get_blob_client(file['ruta'])
    
    url = blobobj.url_file(blob.blob_name)
    file['ruta'] = url
    return file


async def get_search_files(regex):
    files = []
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

    condicion_regex = [{clave: {"$regex": regex_pattern}}
                       for clave in CAMPOS_BUSQUEDA]
    consulta_dinamica = {"$or": condicion_regex}
    cursor = collection.find(consulta_dinamica)

    async for document in cursor:
        for blob_i in blobobj.container_client.list_blobs():
            try:
                url = blobobj.url_file(blob_i.name)
               
                if document['ruta'] == blob_i.name:
                    
                    document['ruta'] =  url
            except:
                print('no se ha encontrado la clave')  
        files.append(Files(**document))
    return files
# calidar si queda una copia incativa del mismo archivo


async def update_file(id: str, data):
    
    file = {k: v for k, v in data.dict().items() if v is not None}
    await collection.update_one({'_id': ObjectId(id)}, {'$set': file})
    document = await collection.find_one({'_id': ObjectId(id)})
    return document


async def delete_file(id: str):
    await collection.delete_one({'_id': ObjectId(id)})
    return True


async def upload_file(name,content_type,data, contents ):
   
    blobobj.create(name,content_type, contents)
    new_file = await collection.insert_one(data)
    created_File = await collection.find_one({'_id': new_file.inserted_id})
    return created_File
