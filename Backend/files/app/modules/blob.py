
import json
import requests
import os
from urllib.parse import quote
# import pandas as pd
from azure.storage.blob import BlobServiceClient, generate_blob_sas, BlobSasPermissions,ContentSettings
from os import getenv
from io import BytesIO


class BlobStorage:
    def __init__(self):
        self.ACCOUNT_NAME = getenv("account_name")
        self.ACCOUNT_KEY = getenv("account_key")
        self.CONTAINER_NAME = getenv("container_name")
        self.blob_connect()

    def blob_connect(self):
        # create a client to interact with blob storage
        connect_str = 'DefaultEndpointsProtocol=https;AccountName=' + self.ACCOUNT_NAME + \
            ';AccountKey=' + self.ACCOUNT_KEY + ';EndpointSuffix=core.windows.net'
        blob_service_client = BlobServiceClient.from_connection_string(
            connect_str)
        # use the client to connect to the container
        self.container_client = blob_service_client.get_container_client(
            self.CONTAINER_NAME)

    def create(self, name,content_type, contents):
        try:
            
            data = BytesIO(contents)
            self.container_client.upload_blob(
                name=name, data=data,  overwrite=True, content_settings=ContentSettings(content_type=content_type))
            return 'Archivo subido exitosamente.', 200
        except Exception as e:
            return 'Error al subir el archivo: ' + str(e), 500

    
    def url_file(self, name):
        blob_name_encoded = quote(name)
        url = f'https://{self.ACCOUNT_NAME}.blob.core.windows.net/{self.CONTAINER_NAME}/{blob_name_encoded}'
        return url

    def delete():
        pass

