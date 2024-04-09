from django.contrib import admin
from .models import User,MoviesList,HeroBanner,UserHistory

# Register your models here.fr
admin.site.register(User)
admin.site.register(MoviesList)
admin.site.register(HeroBanner)
admin.site.register(UserHistory)