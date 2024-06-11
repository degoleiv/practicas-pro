from models import Incripscion
from fastapi import APIRouter, HTTPException
from database import get_all_incripscion, upload_incripscion, get_one_incripscion, delete_incripscion, update_incripscion, get_search_incripscion
from init import search_student,flatten_dict
from typing import Optional, Union
from bson import ObjectId
incripscion_routes = APIRouter()


@incripscion_routes.get('')
async def get_all():
    incripscion = await get_all_incripscion()
    if incripscion:
        return incripscion
    else:
        raise HTTPException(400, 'La lista de preinscripciones está vacía o es None')

@incripscion_routes.get('/search')
async def get_search(word: Optional[Union[str, int]] = None):
    if word is not None:
        if isinstance(word, str) or isinstance(word, int):
            print("word", word)
            incripscion = await get_search_incripscion(str(word))
            print(incripscion)
        else:
            raise HTTPException(400, 'Invalid input type for "word"')
    else:
        incripscion = await get_all_incripscion()

    if incripscion:
        return incripscion
    else:
        raise HTTPException(400, 'Something went wrong')

@incripscion_routes.post('', response_model=Incripscion)
async def create_inscription(incripscion: Incripscion):

    created = await upload_incripscion(incripscion.model_dump())
    if created:
        return created
    raise HTTPException(400, 'Something went wrong')

@incripscion_routes.get('/read', response_model=Incripscion)
async def get_one(id: str):
    try:
        inscripcion = await get_one_incripscion({'_id': ObjectId(id)})
        if inscripcion:
            return inscripcion
    except :
        print('error no es un id aceptado ')
    raise HTTPException(404, f'incripscion {id} not found ')

@incripscion_routes.put('', response_model=Incripscion)
async def put_incripscion(id: str, incripscion: Incripscion):
    response = await update_incripscion(id, incripscion)
    if response:
        return response
    raise HTTPException(404, f'preinscripcion {id} not found ')

@incripscion_routes.delete('')
async def del_preinscripcion(id: str):
    incripscion = await delete_incripscion(id)
    if incripscion:
        return incripscion
    raise HTTPException(404, f'preinscripcion with {id} not found ')

@incripscion_routes.get('/genesis')
async def del_preinscripcion(id: str):
    try:
        # Busca la inscripción en la preinscripción
        inscripcion = await get_one_incripscion({'estudiante.id': id})
        if inscripcion:
            return flatten_dict(inscripcion)
        
        # Busca la inscripción en Genesis
        inscripcion = search_student(id) 
        if inscripcion:
            return inscripcion
        return HTTPException(status_code=404, detail="No se ha encontrado el estudiante ni en la preinscripción ni en Genesis")
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'ha ocurrido un error en la solicitud')

  
    # si no exite entonces consultar genesis id 
    # returnar informacion 
    # si falla alguna conexion entonces error 
    