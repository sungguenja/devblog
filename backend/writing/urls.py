from django.urls import path
from . import views

app_name = 'writing'
urlpatterns = [
    path('menus/',views.getMenu,name='menus'),
    path('menus/<int:menu_pk>/',views.getArticlesWithMenu,name='getArticlesWithMenu'),
    path('article/<int:article_pk>/',views.getArticleDetail,name='getArticleDetail'),
    
]