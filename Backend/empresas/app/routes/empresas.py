from fastapi import APIRouter,HTTPException
from database import get_all_incripscion, upload_incripscion, get_one_incripscion, delete_incripscion, update_incripscion,get_search_incripscion

empresas_routes = APIRouter()

from models import Empresa


@empresas_routes.get('')
async def get_all():
    
    incripscion = await get_all_incripscion()
    
    if incripscion:
        return incripscion
    else:
        raise HTTPException(400, 'La lista de preinscripciones está vacía o es None')
    

from typing import Optional, Union
@empresas_routes.get('/search')
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


@empresas_routes.post('' , response_model=Empresa)
async def create_inscription(incripscion: Empresa):

    created = await upload_incripscion(incripscion.model_dump())
    if created:
        return created
    raise HTTPException(400, 'Something went wrong')


@empresas_routes.get('/read', response_model=Empresa)
async def get_one(id: str):
    inscripcion = await get_one_incripscion(id)
    if inscripcion:
        return inscripcion
    raise HTTPException(404, f'incripscion {id} not found ')

@empresas_routes.put('', response_model=Empresa)
async def put_incripscion(id: str, incripscion: Empresa):
    response = await update_incripscion(id, incripscion)
    if response:
        return response
    raise HTTPException(404, f'preinscripcion {id} not found ')


@empresas_routes.delete('')
async def del_preinscripcion(id : str):
    incripscion = await delete_incripscion(id)
    if incripscion:
        return incripscion
    raise HTTPException(404, f'preinscripcion with {id} not found ')

