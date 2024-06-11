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
    

class Comment(BaseModel):
    usuario: str
    texto: str
    fecha: str = str(datetime.now().strftime("%d/%m/%Y"))   # Puedes ajustar el tipo de dato según tus necesidades

class Estado(BaseModel):
    descripcion: Optional [str] = 'no hay descripcion'
    observaciones: Optional[List[Comment]] = []
    estado : Optional [str] = 'Activo'
    etiquetas: Optional[List[str]] = ["Empresa"] 
 
class EscenarioPractica(BaseModel):
    razon_social: str
    direccion_empresa:str
    nit:str
    telefono:str
    
class Vacantes(BaseModel):        
    escenario:EscenarioPractica
    descripcion_funciones:str
    citacion:str
    requisitos:str
    cantidad_plazas:str
    observaciones:str
    
class Area(BaseModel):
    nombre_area : str
    jefe_inmediato : str
    cedula : str
    telefono_jefe : str
    contacto_escenario : str
    telefono_escenario : str
    vacantes: Optional[List[Vacantes]] = []
    
class Empresa(BaseModel):
    id_base: Optional[PyObjectId] = Field('', alias='_id')
    fecha_creacion: str = str(datetime.now().strftime("%d/%m/%Y"))  
    razon_social: str
    direccion: str
    nit:str
    telefono:str
    area_practica: Optional[List[Area]] = []
    estado : Optional[Estado] = {}
    class Config:
        from_attributes = True
        populate_by_name = True
        json_encoders = {ObjectId:str}

