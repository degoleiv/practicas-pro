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


class Comment(BaseModel):
    usuario: str
    texto: str
    fecha: str = str(datetime.now().strftime("%d/%m/%Y"))  


class Notification(BaseModel):
    id_base: Optional[PyObjectId] = Field('', alias='_id')
    title: str
    message: str
    sender: str
    recipients: List[str]
    fecha_creacion: str = str(datetime.now().strftime("%d/%m/%Y"))  
    tipo: str
    etiquetas: Optional[List[str]] = ["Alerta"]

    comentarios: Optional[List[Comment]] = []

    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}
