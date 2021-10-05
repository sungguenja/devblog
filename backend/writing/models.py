from django.db import models

# Create your models here.
class Menu(models.Model):
    title = models.CharField(max_length=255)

class Article(models.Model):
    menu_pk = models.ForeignKey(Menu,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    github_url = models.TextField(default='No')

class HashTag(models.Model):
    title = models.CharField(max_length=255)

class ArticleHashTag(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    hashtag_pk = models.ForeignKey(HashTag,on_delete=models.CASCADE)

class Comment(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    user_pk = models.ForeignKey('users.User',on_delete=models.SET_NULL,null=True)
    content = models.TextField()

class Bookmark(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    user_pk = models.ForeignKey('users.User',on_delete=models.CASCADE)

class Like(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    user_pk = models.ForeignKey('users.User',on_delete=models.CASCADE)