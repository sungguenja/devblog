# Generated by Django 3.2.7 on 2021-12-21 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('writing', '0002_bookmark_comment_like'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='menu',
            name='category_id',
            field=models.IntegerField(default=0),
        ),
    ]
