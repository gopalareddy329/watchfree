# Generated by Django 5.0 on 2024-01-11 17:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='movieslist',
            old_name='data',
            new_name='date',
        ),
    ]
