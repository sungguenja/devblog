from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('oauth/<str:code>',views.oauth,name="oauth")
]