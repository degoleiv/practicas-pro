from typing import List, Dict,Optional

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

class informacion_personal(BaseModel):
    id: str
    nombre :str
    cedula :str
    correo :str
    numero :str
    facultad :str
    especialidad: str
    

# comentarios 
class Horario(BaseModel):
    dia: str
    hora: str
    fecha: str = str(datetime.now().strftime("%d/%m/%Y"))    # Puedes ajustar el tipo de dato según tus necesidades

class Profesores(BaseModel):
    id_base: Optional[PyObjectId] = Field('', alias='_id')
    fecha_creacion: str = str(datetime.now().strftime("%d/%m/%Y"))   # Puedes ajustar el tipo de dato según tus necesidades
    descripcion: Optional[str] = 'no hay descripcion'
    horarios: Optional[List[Horario]] = []
    estado : Optional [str] = 'activo'
    etiquetas: Optional[List[str]] = ["profesor"] 
    tutor_practicas: informacion_personal
    
    # 
    # version : int = 1
    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId:str}


