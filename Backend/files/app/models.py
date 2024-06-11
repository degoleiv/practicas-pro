from typing import List, Dict, Optional

from pydantic import BaseModel, Field
from datetime import datetime


from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, config):
        # def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid Objectid')
        return str(v)


class Metadata(BaseModel):
    autor:  str
    palabras_clave: Optional[List[str]] = []
    año: str = str(datetime.now().year)

# comentarios


class Comment(BaseModel):
    usuario: str
    texto: str
    # Puedes ajustar el tipo de dato según tus necesidades
    fecha: str = str(datetime.now().strftime("%d/%m/%Y"))  

# @dataclass(config=MyConfig)


class Files(BaseModel):
    id_base: Optional[PyObjectId] = Field('', alias='_id')
    # id: PyObjectId | None = Field(alias='_id')
    nombre: str
    ruta: str
    tipo: str
    # Puedes ajustar el tipo de dato según tus necesidades
    # Puedes ajustar el tipo de dato según tus necesidades
    fecha_creacion: str =str(datetime.now().strftime("%d/%m/%Y"))  
    tamaño: int
    descripcion: Optional[str] = 'no hay descripcion'
    etiquetas: Optional[List[str]] = ["documento"]
    metadatos: Optional[Metadata]
    comentarios: Optional[List[Comment]] = []
    # estado : str = "Activo"
    # version : int = 1

    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
