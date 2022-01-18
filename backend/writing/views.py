from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
import json
from writing.models import Article, ArticleHashTag, Comment, HashTag, Menu
from users.models import User

# Create your views here.
def getMenu(request):
    menu_list = Menu.objects.all()
    return JsonResponse({'menu_list':list(menu_list)})

def getArticlesWithMenu(request,menu_pk):
    article_list = Article.objects.filter(menu_pk=menu_pk)
    article_serialized = serializers.serialize('json',article_list)
    article_serialized = json.loads(article_serialized)
    return JsonResponse(article_serialized,safe=False,json_dumps_params={'ensure_ascii':False})

def getHashTagListWithArticlePk(article_pk):
    hash_tag_nn_list = ArticleHashTag.objects.filter(article_pk=article_pk)
    hash_tag_list = []
    for hash_tag in hash_tag_nn_list:
        now_data = serializers.serialize('json',[hash_tag.hashtag_pk])
        hash_tag_list.append(json.loads(now_data)[0])
    return hash_tag_list

def getCommentListWithArticlePk(request,article_pk):
    comment_list_json = []
    comment_list = Comment.objects.filter(article_pk=article_pk)
    for comm in comment_list:
        now_data = serializers.serialize('json',[comm])
        node_string = comm.user_pk.node_id
        comment_cell_data = json.loads(now_data)[0]
        comment_cell_data['node'] = node_string
        comment_list_json.append(comment_cell_data)
    return JsonResponse({'comment_list_json':comment_list_json},safe=False,json_dumps_params={'ensure_ascii':False})

def getArticleDetailWithArticlePk(article_pk):
    article = Article.objects.get(pk=article_pk)
    article = serializers.serialize('json',[article])
    article = json.loads(article)
    return article[0]

def getArticleDetail(request,article_pk):
    now_article = getArticleDetailWithArticlePk(article_pk)
    hash_tag_list = getHashTagListWithArticlePk(article_pk)
    return JsonResponse({'now_article':now_article,'hash_tag_list':hash_tag_list,},safe=False,json_dumps_params={'ensure_ascii':False})

def getAllArticlePk(request):
    article_list = list(Article.objects.all().values('id','title'))
    print(article_list)
    return JsonResponse({'article_list':article_list})