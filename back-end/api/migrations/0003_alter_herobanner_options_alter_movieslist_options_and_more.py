# Generated by Django 5.0 on 2024-01-11 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_data_movieslist_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='herobanner',
            options={'ordering': ['-movie__date']},
        ),
        migrations.AlterModelOptions(
            name='movieslist',
            options={'ordering': ['-date']},
        ),
        migrations.AddField(
            model_name='herobanner',
            name='title',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
    ]
