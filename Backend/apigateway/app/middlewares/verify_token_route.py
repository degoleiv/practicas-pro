
from fastapi import Request
from middlewares.functions_jwt import jwt_validator
from fastapi.routing import APIRoute
class VerifyTokenRoute(APIRoute):
    def get_route_handler(self):
        original_route = super().get_route_handler()

        async def verify_token_middleware(request: Request):
            
            token = request.cookies.get("idToken")
            validation_response = jwt_validator(token)


            if validation_response == None:
                return await original_route(request)
            else:
                return validation_response
        return verify_token_middleware