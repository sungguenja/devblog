from email import message
from urllib import request
from django.http.response import HttpResponse, JsonResponse
from django.core import serializers
import json
from writing.models import Article, ArticleHashTag, Comment, HashTag, Like, Menu, Category, Bookmark
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
    article_list = Article.objects.filter(menu_pk=menu_pk).order_by('-pk')
    article_serialized = serializers.serialize('json',article_list)
    article_serialized = json.loads(article_serialized)
    for article in article_serialized:
        article['hashtag'] = getHashTagListWithArticlePk(article['pk'])
    return JsonResponse(article_serialized,safe=False,json_dumps_params={'ensure_ascii':False})

def getHashTagListWithArticlePk(article_pk):
    hash_tag_nn_list = ArticleHashTag.objects.filter(article_pk=article_pk).order_by('-pk')
    hash_tag_list = []
    for hash_tag in hash_tag_nn_list:
        now_data = serializers.serialize('json',[hash_tag.hashtag_pk])
        hash_tag_list.append(json.loads(now_data)[0])
    return hash_tag_list

def getUserDataAndComment(comm):
    now_data = serializers.serialize('json',[comm])
    if comm.is_anonymous:
        nickname = comm.anonymous_name
        comment_cell_data = json.loads(now_data)[0]
        comment_cell_data['is_anonymous'] = True
        comment_cell_data['node'] = ''
        comment_cell_data['nickname'] = nickname
        comment_cell_data['pk'] = comm.pk
        comment_cell_data['content'] = comm.content
        comment_cell_data['article_pk'] = '{0}^{1}'.format(comm.article_pk.pk,comm.article_pk.title)
    else:
        node_string = comm.user_pk.node_id
        nickname = comm.user_pk.nickname
        comment_cell_data = json.loads(now_data)[0]
        comment_cell_data['is_anonymous'] = False
        comment_cell_data['node'] = node_string
        comment_cell_data['nickname'] = nickname
        comment_cell_data['pk'] = comm.pk
        comment_cell_data['content'] = comm.content
        comment_cell_data['article_pk'] ='{0}^{1}'.format(comm.article_pk.pk,comm.article_pk.title)

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

def deleteComment(request):
    body_data = parseData(request.body)
    if request.method == 'DELETE':
        target_comment = Comment.objects.get(pk=body_data['pk'])
        if target_comment.is_anonymous:
            if target_comment.anonymous_password == body_data['password']:
                target_comment.delete()
                return JsonResponse({'success':True,'message':'??????????????? ?????? ????????????'})
            else:
                return JsonResponse({'success':False,'message':'?????? ?????? ?????????????????????'},status=403)
        else:
            if request.user.is_authenticated:
                comment_user = target_comment.user_pk
                request_user = request.user
                if comment_user.node_id == request_user.node_id:
                    target_comment.delete()
                    return JsonResponse({'success':True,'message':'??????????????? ?????? ????????????'})
                else:
                    return JsonResponse({'success':False,'message':'?????? ?????? ????????? ???????????? ?????? ????????? ?????????'}, status=403)
            else:
                return JsonResponse({'success':False,'message':'???????????? ???????????? ????????????'},status=403)

    return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

def postComment(request):
    body_data = parseData(request.body)
    comment_model = Comment()
    if request.user.is_authenticated and body_data['isLogin']:
        if len(body_data['comment']) == 0:
            return JsonResponse({'success':False,'message':'??? ?????? ????????? ??????????????????'},status=400)
        comment_model.content = body_data['comment']
        comment_model.is_anonymous = False
        comment_model.user_pk = request.user
        comment_model.article_pk = Article.objects.get(pk=body_data['pk'])
        comment_model.save()
    else:
        if len(body_data['comment']) == 0 or len(body_data['nickname']) == 0 or len(body_data['password']) == 0:
            return JsonResponse({'success':False,'message':'??? ?????? ????????? ??????????????????'},status=400)
        comment_model.content = body_data['comment']
        comment_model.is_anonymous = True
        comment_model.anonymous_name = body_data['nickname']
        comment_model.anonymous_password = body_data['password']
        comment_model.article_pk = Article.objects.get(pk=body_data['pk'])
        comment_model.save()
    return JsonResponse({'success':True,'message':'good'})

def putComment(request):
    body_data = parseData(request.body)
    target_comment = Comment.objects.get(pk=body_data['pk'])
    if body_data.get('isChecker') == True:
        input_password = body_data.get('password')
        if target_comment.is_anonymous and target_comment.anonymous_password == input_password:
            return JsonResponse({'success':True,'message':'?????? ???????????? ?????????'})
        elif not target_comment.is_anonymous and request.user.is_authenticated and target_comment.user_pk.node_id == request.user.node_id:
            return JsonResponse({'success':True,'message':'?????? ?????? ????????? ????????????.'})
        else:
            return JsonResponse({'success':False,'message':'????????? ?????????????????????'},status=403)
    elif body_data.get('isChecker') == False:
        input_comment = body_data.get('comment')
        if len(input_comment) == 0:
            return JsonResponse({'success':False,'message':'????????? ?????????????????? ??????????????????'},status=500)
        else:
            target_comment.content = input_comment
            if target_comment.is_anonymous and len(body_data['nickname']):
                target_comment.anonymous_name = body_data['nickname'] 
            target_comment.save()
            return JsonResponse({'success':True,'message':'??????????????? ??????????????????.'})

    return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

def getComment(request):
    pk = request.GET.get('pk',None)
    target_comment = Comment.objects.get(pk=pk)
    target_comment = getUserDataAndComment(target_comment)
    return JsonResponse({'success':True,'now_comment':target_comment})

@csrf_protect
def commentCUD(request):
    if request.method == 'POST':
        return postComment(request)
    elif request.method == 'DELETE':
        return deleteComment(request)
    elif request.method == 'PUT':
        return putComment(request)
    elif request.method == 'GET':
        return getComment(request)
    
    return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

def postLike(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????. (????????? ?????????????)'},status=403)
    
    body_data = parseData(request.body)
    like_model = Like()
    like_model.article_pk = Article.objects.get(pk=body_data['pk'])
    like_model.user_pk = request.user
    like_model.save()
    return JsonResponse({'success':True,'message':'??????????????? ???????????? ??????????????????'})

def delLike(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????. (????????? ?????????????)'},status=403)
    
    body_data = parseData(request.body)
    target_article = Article.objects.get(pk=body_data['pk'])
    target_like = Like.objects.filter(article_pk=target_article).get(user_pk=request.user)
    target_like.delete()
    return JsonResponse({'success':True,'message':'??????????????? ???????????? ??????????????????'})

def getArticleWithLike(like):
    target_article = like.article_pk
    return {'title':target_article.title,'pk':target_article.pk,'content':target_article.content}

def getLike(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????. (????????? ?????????????)'},status=403)
    
    like_list = Like.objects.filter(user_pk=request.user.pk)
    article_list = []
    for one_like in like_list:
        target_article = one_like.article_pk
        article_list.append({'title':target_article.title,'pk':target_article.pk,'content':target_article.content})
    
    return JsonResponse({'success':True,'article_list':article_list})

@csrf_protect
def likeCRUD(request):
    if request.method == 'GET':
        return getLike(request)
    elif request.method == 'POST':
        return postLike(request)
    elif request.method == 'DELETE':
        return delLike(request)
    elif request.method == 'PUT':
        return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

    return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

def checkUserLikeAndBookmark(request,article_pk):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????.'},status=403)
    
    like_list = Like.objects.filter(user_pk=request.user.pk)
    is_like = False
    for like in like_list:
        if like.article_pk.pk == article_pk:
            is_like - True
            break
    
    bookmark_list = Bookmark.objects.filter(user_pk=request.user.pk)
    is_bookmark = False
    for bookmark in bookmark_list:
        if bookmark.article_pk.pk == article_pk:
            is_bookmark = True
            break
    
    return JsonResponse({'success':True,'is_like':is_like,'is_bookmark':is_bookmark})

def postBookmark(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????. (????????? ?????????????)'},status=403)
    
    body_data = parseData(request.body)
    bookmark_model = Bookmark()
    bookmark_model.article_pk = Article.objects.get(pk=body_data['pk'])
    bookmark_model.user_pk = request.user
    bookmark_model.save()
    return JsonResponse({'success':True,'message':'??????????????? ???????????? ??????????????????'})

def delBookmark(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????. (????????? ?????????????)'},status=403)
    
    body_data = parseData(request.body)
    target_article = Article.objects.get(pk=body_data['pk'])
    target_bookmark = Bookmark.objects.filter(article_pk=target_article).get(user_pk=request.user)
    target_bookmark.delete()
    return JsonResponse({'success':True,'message':'??????????????? ???????????? ??????????????????'})

def getArticleWithBookmark(bookmark):
    target_article = bookmark.article_pk
    return {'title':target_article.title,'pk':target_article.pk,'content':target_article.content}

def getBookmark(request):
    if not request.user.is_authenticated:
        return JsonResponse({'success':False,'message':'???????????? ????????? ????????? ????????? ??????????????????. (????????? ?????????????)'},status=403)
    
    bookmark_list = Bookmark.objects.filter(user_pk=request.user.pk)
    article_list = []
    for one_bookmark in bookmark_list:
        target_article = one_bookmark.article_pk
        article_list.append({'title':target_article.title,'pk':target_article.pk,'content':target_article.content})
    
    return JsonResponse({'success':True,'article_list':article_list})

@csrf_protect
def bookmarkCRUD(request):
    if request.method == 'GET':
        return getBookmark(request)
    elif request.method == 'POST':
        return postBookmark(request)
    elif request.method == 'DELETE':
        return delBookmark(request)
    elif request.method == 'PUT':
        return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

    return JsonResponse({'success':False,'message':'????????? ????????? ??????????????????.'},status=500)

def getArticlesInMainMenu(request):
    article_list = Article.objects.order_by('-pk')[:2]
    article_serialized = serializers.serialize('json',article_list)
    article_serialized = json.loads(article_serialized)
    for article in article_serialized:
        article['hashtag'] = getHashTagListWithArticlePk(article['pk'])
    return JsonResponse(article_serialized,safe=False,json_dumps_params={'ensure_ascii':False})