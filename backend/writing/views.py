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
    return HttpResponse(article_serialized,content_type="text/json-comment-filtered")

def getArticleDetail(request,article_pk):
    article = Article.objects.get(id=article_pk)
    hash_tag_nn_list = ArticleHashTag.objects.filter(article_pk=article_pk)
    hash_tag_list = []
    for hash_tag in hash_tag_nn_list:
        hash_tag_list.append(HashTag.objects.get(id=hash_tag.hashtag_pk))
    return JsonResponse({'article':article,'hash_tag_list':list(hash_tag_list)})