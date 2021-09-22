from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import requests

# needed function
def getAccessToken(code):
    data = {
        'client_id': '',
        'client_secret': '',
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
@ensure_csrf_cookie
def getCsrf(request,protectcode):
    if protectcode != 'asdf' or request.method != 'GET':
        return JsonResponse({'csrf_token':'reject'})
    response = JsonResponse({'csrf_token':'success'})
    csrf_token = get_token(request)
    response.set_cookie('csrftoken',csrf_token)

    return response

def oauth(request,code):
    access_token = getAccessToken(code)
    print(access_token)
    oauthToken = oauthAuthentication(access_token)
    print(oauthToken)
    print(oauthToken.json())
    return JsonResponse({'success':'yes'})