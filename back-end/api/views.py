import random
from django.shortcuts import render
from .serializer import MovieItemSerializer,HeroBannerSerializer,GenresSeriallizer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MoviesList,HeroBanner,Genres
# Create your views here.



@api_view(['GET'])
def GetMoviesList(request,order):
    setOrder=None
    if order:
        if order=="TopAiring":
            setOrder="rating"

    data = MoviesList.objects.all()[:20]

    if setOrder:
        try:
            data=sorted(data,key=lambda x: getattr(x,str(setOrder)), reverse=True)
        except:
            pass
    
    
    serial=MovieItemSerializer(data,many=True)
    return Response(serial.data)


@api_view(["GET"])
def GetHeroBanner(request):
    number=random.randint(1,5)
    data=HeroBanner.objects.get(id=number)
    serial=HeroBannerSerializer(data,many=False)
    return Response(serial.data)


@api_view(["GET"])
def GetGenres(request):
    data=Genres.objects.all()
    serial=GenresSeriallizer(data,many=True)
    return Response(serial.data)