from . import models
from rest_framework import serializers

class MovieItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MoviesList
        fields= '__all__'

class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HeroBanner
        fields= '__all__'


class GenresSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = models.Genres
        fields='__all__'