from jwt import encode, decode
from jwt import exceptions
from datetime import datetime, timedelta
from init import *
   
from azure_ad_verify_token import verify_jwt
from os import getenv
from fastapi.responses import JSONResponse
def expire_date (days : int):
    date = datetime.now()
    new_date = date + timedelta(days)
    return new_date


def write_token (data: dict):
    token = encode(payload={**data, "exp" : expire_date(2) }, key=getenv("SECRET_KEY"), algorithm="HS256")  
    return token
def validate_token(token, output=False):
    try:
        if output:
            return decode(token, key=getenv("SECRET_KEY"), algorithms=["HS256"])
        decode(token, key=getenv("SECRET_KEY"), algorithms=["HS256"])
    except exceptions.DecodeError:
        return JSONResponse(content={"message": "Invalid Token"}, status_code=401)
    except exceptions.ExpiredSignatureError:
        return JSONResponse(content={"message": "Invalid Expired"}, status_code=401)

def jwt_validator(token_client):
    TENANT_ID = getenv("TENANT_ID")
    CLIENT_ID = getenv("CLIENT_ID")

    issuer = f"https://login.microsoftonline.com/{TENANT_ID}/v2.0"
    jwks_uri = f"https://login.microsoftonline.com/{TENANT_ID}/discovery/v2.0/keys"

    try:
        payload = verify_jwt(
            token=token_client,
            valid_audiences=[CLIENT_ID],
            issuer=issuer,
            jwks_uri=jwks_uri,
            verify=True,
        )
        print(payload)
        return payload
    except Exception as e:
        print(e)
        
