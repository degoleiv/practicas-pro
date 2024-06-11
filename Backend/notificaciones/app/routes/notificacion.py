

from database import get_all_notifi, create_notifi, get_one_notifi, delete_notifi, update_notifi, get_search_notifi
from fastapi import APIRouter, HTTPException, Form
from models import Notification
import json
notifi_routes = APIRouter()


@notifi_routes.get('')
async def get_all():

    notifi = await get_all_notifi()
    if notifi:
        return notifi
    raise HTTPException(400, 'Something went wrong')


from typing import Optional, Union
@notifi_routes.get('/search')
async def get_search(word: Optional[Union[str, int]] = None):
    if word is not None:
        if isinstance(word, str) or isinstance(word, int):
            print("word", word)
            incripscion = await get_search_notifi(str(word))
            print(incripscion)
        else:
            raise HTTPException(400, 'Invalid input type for "word"')
    else:
        incripscion = await get_all_notifi()

    if incripscion:
        return incripscion
    else:
        raise HTTPException(400, 'Something went wrong')


@notifi_routes.get('/read', response_model=Notification)
async def get_one(id: str):
    notifi = await get_one_notifi(id)
    if notifi:
        return notifi
    raise HTTPException(404, f'notifi {id} not found ')


@notifi_routes.put('', response_model=Notification)
async def put_notifi(id: str, notifi: Notification):
    response = await update_notifi(id, notifi)
    if response:
        return response
    raise HTTPException(404, f'notifi {id} not found ')


@notifi_routes.delete('')
async def del_notifi(id: str):
    notifi = await delete_notifi(id)
    if notifi:
        return notifi
    raise HTTPException(404, f'notifi with {id} not found ')


@notifi_routes.post('', response_model=Notification)
async def create(model: Notification):
    try:

        created = await create_notifi(model.model_dump())
        if created:
            return created
        else:
           raise HTTPException(status_code=400, detail="no se ha enviado el mensaje ") 
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal Server Error ")
