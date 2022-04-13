from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name

class Menu(models.Model):
    title = models.CharField(max_length=255)
    category_id = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Article(models.Model):
    menu_pk = models.ForeignKey(Menu,on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    thumbnail = models.CharField(max_length=255,default=None,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    github_url = models.TextField(default='No')
    description = models.CharField(max_length=255,default="description",null=True,blank=True)

    def __str__(self):
        return self.title

class HashTag(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

class ArticleHashTag(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    hashtag_pk = models.ForeignKey(HashTag,on_delete=models.CASCADE)

class Comment(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    user_pk = models.ForeignKey('users.User',on_delete=models.SET_NULL,null=True)
    content = models.TextField()
    is_anonymous = models.BooleanField(default=False)
    anonymous_name = models.CharField(default='', blank=True, max_length=255)
    anonymous_password = models.CharField(default='', blank=True, max_length=255)

class Bookmark(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    user_pk = models.ForeignKey('users.User',on_delete=models.CASCADE)

class Like(models.Model):
    article_pk = models.ForeignKey(Article,on_delete=models.CASCADE)
    user_pk = models.ForeignKey('users.User',on_delete=models.CASCADE)