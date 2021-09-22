from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('csrftoken/<str:protectcode>',views.getCsrf,name='getCsrf'),
    path('oauth/<str:code>',views.oauth,name="oauth"),
]