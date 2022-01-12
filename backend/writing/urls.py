from django.urls import path
from . import views

app_name = 'writing'
urlpatterns = [
    path('menus/',views.getMenu,name='menus'),
    path('menus/<int:menu_pk>/',views.getArticlesWithMenu,name='getArticlesWithMenu'),
    path('article/<int:article_pk>/',views.getArticleDetail,name='getArticleDetail'),
    path('comment/<int:article_pk>/',views.getCommentListWithArticlePk,name='getCommentListWithArticlePk'),
    path('all-article-pk/',views.getAllArticlePk,name='getAllArticlePk')
]