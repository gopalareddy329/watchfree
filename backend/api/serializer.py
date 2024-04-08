# myapp/serializers.py
from rest_framework import serializers
from .models import User,MoviesList,HeroBanner

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'name']



class MovieItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoviesList
        fields= '__all__'

class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields= '__all__'

