from django.contrib import admin
from .models import Category,Menu,Article,HashTag,ArticleHashTag,Comment,Bookmark,Like
# Register your models here.
admin.site.register(Category)
admin.site.register(Menu)
admin.site.register(Article)
admin.site.register(HashTag)
admin.site.register(ArticleHashTag)
admin.site.register(Comment)
admin.site.register(Bookmark)
admin.site.register(Like)
