from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
import json
from writing.models import Article, ArticleHashTag, Comment, HashTag, Menu, Category
from users.models import User
from django.views.decorators.csrf import csrf_protect

# Create your views here.
def parseData(data):
    return json.loads(data.decode('utf-8'))

def getMenu(request):
    menu_list = Menu.objects.all()
    menu_serialized = serializers.serialize('json',menu_list)
    menu_serialized = json.loads(menu_serialized)

    category_list = Category.objects.all()
    category_serialized = serializers.serialize('json',category_list)
    category_serialized = json.loads(category_serialized)
    return JsonResponse({'menu_list': menu_serialized,'category_list': category_serialized})

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

def getUserDataAndComment(comm):
    now_data = serializers.serialize('json',[comm])
    if comm.isAnonymous:
        nickname = comm.anonymousName
        comment_cell_data = json.loads(now_data)[0]
        comment_cell_data['isAnonymous'] = True
        comment_cell_data['node'] = ''
        comment_cell_data['nickname'] = nickname
        comment_cell_data['pk'] = comm.pk
        comment_cell_data['content'] = comm.content
    else:
        node_string = comm.user_pk.node_id
        nickname = comm.user_pk.nickname
        comment_cell_data = json.loads(now_data)[0]
        comment_cell_data['isAnonymous'] = False
        comment_cell_data['node'] = node_string
        comment_cell_data['nickname'] = nickname
        comment_cell_data['pk'] = comm.pk
        comment_cell_data['content'] = comm.content

    del comment_cell_data['fields']
    
    return comment_cell_data

def getCommentListWithArticlePk(request,article_pk):
    comment_list_json = []
    comment_list = Comment.objects.filter(article_pk=article_pk)
    for comm in comment_list:
        comment_list_json.append(getUserDataAndComment(comm))
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
    return JsonResponse({'article_list':article_list})

@csrf_protect
def createComment(request):
    body_data = parseData(request.body)
    print(body_data)
    if request.method == 'POST':
        print(request.user.is_authenticated)
        comment_model = Comment()
        if request.user.is_authenticated and body_data['isLogin']:
            if len(body_data['comment']) == 0:
                return JsonResponse({'success':False,'message':'값 입력 확인을 부탁드립니다'},status=400)
            comment_model.content = body_data['comment']
            comment_model.isAnonymous = False
            comment_model.user_pk = request.user
            comment_model.article_pk = Article.objects.get(pk=body_data['pk'])
            comment_model.save()
        else:
            if len(body_data['comment']) == 0 or len(body_data['nickname']) == 0 or len(body_data['password']) == 0:
                return JsonResponse({'success':False,'message':'값 입력 확인을 부탁드립니다'},status=400)
            comment_model.content = body_data['comment']
            comment_model.isAnonymous = True
            comment_model.anonymousName = body_data['nickname']
            comment_model.anonymousPassword = body_data['password']
            comment_model.article_pk = Article.objects.get(pk=body_data['pk'])
            comment_model.save()
        return JsonResponse({'success':True,'message':'good'})
    
    return JsonResponse({'success':False,'message':'잘못된 요청이 들어왔습니다.'},status=500)