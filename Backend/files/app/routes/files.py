

from database import get_all_files, upload_file, get_one_file, delete_file, update_file, get_search_files
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from models import Files
import json
file_routes = APIRouter()

# get
@file_routes.get('')
async def get_all():
    print('api alcanzada')
    file = await get_all_files()
    if file:
        return file
    raise HTTPException(400, 'Something went wrong')

# ?funcion=search/ejemplo - get
from typing import Optional, Union
@file_routes.get('/search')
async def get_search(word: Optional[Union[str, int]] = None):
    if word is not None:
        if isinstance(word, str) or isinstance(word, int):
            print("word", word)
            incripscion = await get_search_files(str(word))
            print(incripscion)
        else:
            raise HTTPException(400, 'Invalid input type for "word"')
    else:
        incripscion = await get_all_files()

    if incripscion:
        return incripscion
    else:
        raise HTTPException(400, 'Something went wrong')

#  ?funcion=file/1234 - get
@file_routes.get('/read', response_model=Files)
async def get_one(id: str):
    file = await get_one_file(id)
    if file:
        return file
    raise HTTPException(404, f'file {id} not found ')

# ?funcion=file/1234 - put
@file_routes.put('', response_model=Files)
async def put_file(id: str, file: Files):
    response = await update_file(id, file)
    if response:
        return response
    raise HTTPException(404, f'file {id} not found ')

# ?funcion=file/1234 - delete
@file_routes.delete('')
async def del_file(id: str):
    file = await delete_file(id)
    if file:
        return file
    raise HTTPException(404, f'file with {id} not found ')

# ?funcion=file - post
@file_routes.post('', response_model=Files)
# async def upload( files_data: Files, file: UploadFile = File(...)):
async def upload(file: UploadFile = File(...), model: str = Form(...)):
    try:

        model_dict = json.loads(model)

        model_obj = Files.model_validate(model_dict)

        name = model_obj.ruta
        content_type = file.content_type
        contents = file.file.read()

        created = await upload_file(name,content_type, model_obj.model_dump(), contents)
        if created:
            return created
        # return {"filename": file.filename, "content_type": file.content_type}
    except Exception as e:
        # Si ocurre algún error, lanzas una excepción HTTP con un código de error 500
        import traceback

        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail="Internal Server Error ")
