
def template (email):
   
    request_body = {
        'message': {
            'subject': 'Notificacion ',
            'body': {
            "contentType": "HTML",
            "content": "hola mundo"
            },
            'toRecipients': [
                {
                    'emailAddress': {
                        'address': email
                    }
                }
            ],
            
        }
    }

    return request_body



