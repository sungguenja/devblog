from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.conf import settings
import requests

# needed function
def getAccessToken(code):
    data = {
        'client_id': settings.OAUTH_CLIENT_ID,
        'client_secret': settings.OAUTH_CLIENT_SECRET,
        'code': code
    }
    res = requests.post('https://github.com/login/oauth/access_token',data)
    access_token = res.text.split('&')[0].split('=')[1]
    return access_token

def oauthAuthentication(access_token):
    headers = {
        'Authorization': 'token {}'.format(access_token)
    }
    res = requests.get('https://api.github.com/user',headers=headers)
    return res

# Create your views here.
def getCsrf(request,protectcode):
    if protectcode != 'asdf' or request.method != 'GET':
        return JsonResponse({'csrf_token':'reject'})
    response = JsonResponse({'csrf_token':'success'})
    csrf_token = get_token(request)
    response.set_cookie('csrftoken',csrf_token)
    return response

def oauth(request,code):
    access_token = getAccessToken(code)
    oauthToken = oauthAuthentication(access_token)
    print(oauthToken.json())
    return JsonResponse({'success':'yes'})