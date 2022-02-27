from django.urls import path
from . import views

app_name = 'writing'
urlpatterns = [
    path('mainmenu/',views.getArticlesInMainMenu,name='getMainMenuArticle'),
    path('menus/',views.getMenu,name='menus'),
    path('menus/<int:menu_pk>/',views.getArticlesWithMenu,name='getArticlesWithMenu'),
    path('article/<int:article_pk>/',views.getArticleDetail,name='getArticleDetail'),
    path('comment/',views.commentCUD,name='commentCUD'),
    path('comment/<int:article_pk>/',views.getCommentListWithArticlePk,name='getCommentListWithArticlePk'),
    path('like/',views.likeCRUD,name='likeCRUD'),
    path('bookmark/',views.bookmarkCRUD,name='bookmarkCRUD'),
    path('likebookmark/<int:article_pk>',views.checkUserLikeAndBookmark,name='checkUserLikeAndBookmark'),
    path('all-article-pk/',views.getAllArticlePk,name='getAllArticlePk')
]