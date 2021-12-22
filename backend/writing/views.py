from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
import json
from writing.models import Article, ArticleHashTag, HashTag, Menu

# Create your views here.
def getMenu(request):
    menu_list = Menu.objects.all()
    return JsonResponse({'menu_list':list(menu_list)})

def getArticlesWithMenu(request,menu_pk):
    article_list = Article.objects.filter(menu_pk=menu_pk)
    article_serialized = serializers.serialize('json',article_list)
    article_serialized = json.loads(article_serialized)
    return JsonResponse(article_serialized,safe=False,json_dumps_params={'ensure_ascii':False})

def getArticleDetail(request,article_pk):
    article = Article.objects.get(pk=article_pk)
    hash_tag_nn_list = ArticleHashTag.objects.filter(article_pk=article_pk)
    hash_tag_list = []
    for hash_tag in hash_tag_nn_list:
        now_data = serializers.serialize('json',[hash_tag.hashtag_pk])
        hash_tag_list.append(json.loads(now_data)[0])
    article = serializers.serialize('json',[article])
    article = json.loads(article)
    return JsonResponse({'article':article[0],'hash_tag_list':hash_tag_list},safe=False,json_dumps_params={'ensure_ascii':False})