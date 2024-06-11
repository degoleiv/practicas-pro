import json
from os import getenv
import msal
import requests
from init import *
from .get_template import template

class MicrosoftGraph:
    def __init__(self):
        self.CLIENT_ID = getenv("CLIENT_ID")
        self.AUTHORITY = getenv("AUTHORITY_URL") + getenv("TENANT_ID")
        self.CLIENT_SECRET = getenv("CLIENT_SECRET")
        self.USER_ID = getenv("USER_ID")
        self.GRAPH_ENDPOINT = getenv("GRAPH_ENDPOINT")
        self.SCOPES = getenv("SCOPES")

        self.connection_MsGraph()

    def connection_MsGraph(self):
        app = msal.ConfidentialClientApplication(
            client_id=self.CLIENT_ID,
            authority=self.AUTHORITY,
            client_credential=self.CLIENT_SECRET
        )
        self.result = app.acquire_token_silent([self.SCOPES], account=None)

        if not self.result:
            self.result = app.acquire_token_for_client(scopes=[self.SCOPES])
        if "access_token" in self.result:
            self.token = self.result['access_token']
        else:
            raise Exception("no Access token found")

    def email(self, email):
        endpoint = self.GRAPH_ENDPOINT + f'/users/{self.USER_ID}/sendMail'

        http_headers = {'Authorization': 'Bearer ' + self.token,
                        'Content-type': 'application/json'
                        }
        request_body = template(email)
        response = requests.post(endpoint, headers=http_headers, data=json.dumps(request_body))

        print(response.json())
        return response
    
    def users(self):
        endpoint = self.GRAPH_ENDPOINT + f'/users'
        http_headers = {'Authorization': 'Bearer ' + self.token,
                        'Content-type': 'application/json'
                        }
        response = requests.get(endpoint, headers=http_headers, )
        print(response.json())
        return response
