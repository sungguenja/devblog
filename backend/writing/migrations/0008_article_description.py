# Generated by Django 3.2.7 on 2022-04-13 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('writing', '0007_alter_article_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='description',
            field=models.CharField(blank=True, default='description', max_length=255, null=True),
        ),
    ]