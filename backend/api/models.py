# myapp/models.py
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext as _
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    name=models.CharField(_("Name of User"), blank=True, max_length=255)
    pass





class MoviesList(models.Model):
    title=models.TextField(null=True,blank=True)

    movieId=models.TextField(null=True,blank=True,unique=True)
    tmdbId=models.TextField(null=True,blank=True)
    imdbId=models.IntegerField(null=True,blank=True)
    img_link=models.TextField(null=True,blank=True)

    genres=models.TextField(null=True,blank=True)
    rating=models.DecimalField(null=True,blank=True,max_digits=3, decimal_places=2)
    rating_count=models.IntegerField(default=0)
    youtubeId=models.TextField(null=True,blank=True)
    movieOverview = models.TextField(null=True , blank=True)

    def __str__(self):
        return self.title
    

class UserHistory(models.Model):
    movie=models.ForeignKey(MoviesList,on_delete=models.CASCADE,blank=True)
    user=models.ForeignKey(User,on_delete=models.CASCADE,blank=True)
    rating=models.DecimalField(null=True,blank=True,max_digits=3, decimal_places=2)
    created_at=models.DateTimeField(auto_now_add=True,null=True,blank=True)

    class Meta:
        unique_together = ('movie', 'user')
        ordering = ["-created_at"]

    def __str__(self):
        return f'{self.user.username} for {self.movie.title}'


class HeroBanner(models.Model):
    
    backdrop = models.TextField()
    movie=models.ForeignKey(MoviesList,on_delete=models.CASCADE)
    title=models.TextField(max_length=255, blank=True, null=True)
    

    def save(self,*args,**kwargs):
        if self.movie:
            self.title = self.movie.title
        super().save(*args,**kwargs)
    def __str__(self):
        return self.movie.title


