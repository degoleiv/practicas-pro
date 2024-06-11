from fastapi import APIRouter,HTTPException
from database import get_all_profesores, upload_profesores, get_one_profesores, delete_profesores, update_profesores,get_search_profesores

profesores_routes = APIRouter()

from models import Profesores


@profesores_routes.get('')
async def get_all():
    
    profesores = await get_all_profesores()
    
    if profesores:
        return profesores
    else:
        raise HTTPException(400, 'La lista de profesores está vacía o es None')
    
from typing import Optional, Union
@profesores_routes.get('/search')
async def get_search(word: Optional[Union[str, int]] = None):
    if word is not None:
        if isinstance(word, str) or isinstance(word, int):
            print("word", word)
            incripscion = await get_search_profesores(str(word))
            print(incripscion)
        else:
            raise HTTPException(400, 'Invalid input type for "word"')
    else:
        incripscion = await get_all_profesores()

    if incripscion:
        return incripscion
    else:
        raise HTTPException(400, 'Something went wrong')


@profesores_routes.post('' , response_model=Profesores)
async def create_inscription(profesores: Profesores):

    created = await upload_profesores(profesores.model_dump())
    if created:
        return created
    raise HTTPException(400, 'Something went wrong')


@profesores_routes.get('/read', response_model=Profesores)
async def get_one(id: str):
    profesores = await get_one_profesores(id)
    if profesores:
        return profesores
    raise HTTPException(404, f'profesores {id} not found ')

@profesores_routes.put('', response_model=Profesores)
async def put_profesores(id: str, profesores: Profesores):
    response = await update_profesores(id, profesores)
    if response:
        return response
    raise HTTPException(404, f'profesores {id} not found ')


@profesores_routes.delete('')
async def del_profesores(id : str):
    profesores = await delete_profesores(id)
    if profesores:
        return profesores
    raise HTTPException(404, f'profesores with {id} not found ')

