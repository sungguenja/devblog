from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    nickname = models.CharField(max_length=255,default='')
    github_id = models.IntegerField(default=0)
    node_id = models.TextField(default='')
    github_url = models.TextField(default='')

    def __str__(self):
        return self.nickname + " " + self.github_url