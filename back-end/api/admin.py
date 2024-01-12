from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.MoviesList)
admin.site.register(models.HeroBanner)
admin.site.register(models.Genres)