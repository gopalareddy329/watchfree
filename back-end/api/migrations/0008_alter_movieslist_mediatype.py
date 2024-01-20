# Generated by Django 5.0 on 2024-01-12 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_movieslist_mediatype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movieslist',
            name='mediatype',
            field=models.CharField(choices=[('1', 'movies'), ('2', 'Shows')], default='1', max_length=30),
        ),
    ]