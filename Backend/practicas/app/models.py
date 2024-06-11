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


class Proceso(BaseModel):
    estado_actual: str = Field(..., description="Estado actual del proceso")
    fecha_creacion: str = str(datetime.now().strftime("%d/%m/%Y"))  
    fecha_actualizacion: str = str(datetime.now().strftime("%d/%m/%Y"))  

class Requisitos(BaseModel):
    practica_rs: str
    porcentaje_creditos: str
    taller_introduccion: Optional[str] = 'no realizado'
    clasificacion: Optional[str] = 'sin seleccion'


class Estudiante(BaseModel):
    id: str
    nombre: str
    tipo_identificacion: str
    numero_documento: str
    correo: str
    numero: str
    programa: str
    
    estado_civil:str 
    hijos: str 


class Comment(BaseModel):
    usuario: str
    texto: str
    fecha: str = str(datetime.now().strftime("%d/%m/%Y"))  


class Incripscion(BaseModel):
    id_base: Optional[PyObjectId] = Field('', alias='_id')
    # id: PyObjectId | None = Field(alias='_id')
    # Puedes ajustar el tipo de dato según tus necesidades
    fecha_creacion: str = str(datetime.now().strftime("%d/%m/%Y"))
    periodo: str
    practica: str
    facultad: str
    descripcion: Optional[str] = 'no hay descripcion'
    observaciones: Optional[List[Comment]] = []
    estado: Optional[str] = 'Pendiente'
    etiquetas: Optional[List[str]] = ["ca"]
    estudiante: Optional[Estudiante]
    requisitos: Requisitos
    proceso: Optional[Proceso]
    profesor_asignado: Optional[str] = 'sin asignacion'
    empresa: Optional[str] = 'si asignacion'
    # version : int = 1
    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId: str}



