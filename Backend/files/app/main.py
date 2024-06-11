from fastapi import FastAPI
from routes.files import file_routes
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://192.168.0.12:4699"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(file_routes, prefix="/files")

@app.get('/')
async def welcome():
    return {'message': 'api de archivos corriendo'}