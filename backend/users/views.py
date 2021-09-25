from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth import get_user_model,authenticate,login,logout

# needed package
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
    user_dict = oauthToken.json()
    User = get_user_model()
    try:
        login_user = User.objects.get(node_id=user_dict['node_id'])
        if login_user is not None:
            login(request,login_user)
            return JsonResponse({
                'id':login_user.github_id,
                'node_id':login_user.node_id,
                'nickname':login_user.nickname,
                'github_url':login_user.github_url,
                'is_login':True,
                'success':True
            })

    except User.DoesNotExist:
        new_user = User.objects.create(
            node_id = user_dict['node_id'],
            github_id = user_dict['id'],
            nickname = user_dict['login'],
            github_url = user_dict['html_url']
        )
        login(request,new_user)
        return JsonResponse({
            'id':user_dict['id'],
            'node_id':user_dict['node_id'],
            'nickname':user_dict['login'],
            'github_url':user_dict['html_url'],
            'is_login':False,
            'success':True
        })
        
    return JsonResponse({'success':False})