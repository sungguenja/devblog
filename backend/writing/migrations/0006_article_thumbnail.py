# Generated by Django 3.2.7 on 2022-02-23 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('writing', '0005_auto_20220202_2214'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='thumbnail',
            field=models.CharField(default=None, max_length=255, null=True),
        ),
    ]
