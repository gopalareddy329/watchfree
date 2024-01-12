from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.

class Genres(models.Model):
    name=models.TextField(max_length=20)
    def __str__(self):
        return self.name


class MoviesList(models.Model):
    title=models.CharField(max_length=20)
    date= models.DateField()
    poster=models.TextField()
    rating = models.DecimalField(max_digits=3, decimal_places=1, validators=[MinValueValidator(1), MaxValueValidator(10)],blank=True,null=True)
    genres=models.ManyToManyField(Genres,related_name="Genres")
    mediatype=models.CharField(max_length=30,choices=(
        ("movies","movies"),
        ("Shows","Shows")
    ),
    default="movies"
    )
    popularity=models.DecimalField(max_digits=3, decimal_places=1, validators=[MinValueValidator(1), MaxValueValidator(100)],blank=True,null=True)
    class Meta:
        ordering=["-date"]
    def __str__(self):
        return self.title
    



class HeroBanner(models.Model):
    
    backdrop = models.TextField()
    movie=models.ForeignKey(MoviesList,on_delete=models.CASCADE)
    title=models.TextField(max_length=255, blank=True, null=True)


    def save(self,*args,**kwargs):
        if self.movie:
            self.title = self.movie.title
        super().save(*args,**kwargs)
        
    class Meta:
        ordering=["-movie__date"]
    def __str__(self):
        return self.movie.title


