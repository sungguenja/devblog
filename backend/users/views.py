from django.shortcuts import render

# Create your views here.
def oauth(request,code):
    print(request.POST,code)
    return {'resoponse':1}