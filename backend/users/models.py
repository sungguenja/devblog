from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    nickname = models.CharField(max_length=255)
    github_id = models.IntegerField()
    node_id = models.TextField()
    github_url = models.TextField()

    def __str__(self):
        return self.nickname + " " + self.github_url