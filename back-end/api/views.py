import random
from time import sleep
from django.shortcuts import render
from .serializer import MovieItemSerializer,HeroBannerSerializer,GenresSeriallizer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MoviesList,HeroBanner,Genres,Languages
# Create your views here.



@api_view(['GET'])
def GetDataList(request,type,order):
    setOrder=None
    if order:
        if order=="TopAiring":
            setOrder="rating"
        elif order=="popular":
            setOrder="popularity"
        

    data = None


    if type=="movies":
        data=MoviesList.objects.filter(mediatype=type)[:20]
        
    elif type=="series":
        data=MoviesList.objects.filter(mediatype=type)[5:10]
        
    else:
        return Response("Type error",status= 400)
    
    if setOrder:
        try:
            data=sorted(data,key=lambda x: getattr(x,str(setOrder)), reverse=True)
        except:
            return Response("invalid column name",status= 400)
    
    serial=None
    if type=="movies":
        serial=MovieItemSerializer(data,many=True)
        
    elif type=="series":
        serial=MovieItemSerializer(data,many=True)
    
    return Response(serial.data)


@api_view(['GET'])
def GetDetails(request,type,id):
    if type == "movies":
        data = MoviesList.objects.get(id=id)
        
        serial=MovieItemSerializer(data,many=False)
        serial_2=HeroBannerSerializer(data.herobanner_set.first(),many=False)

        return Response({"moviedata":serial.data,
                     "herobanner":serial_2.data["backdrop"]})
        
    else:
        return Response("Type Error",status=400)
    
    
    


@api_view(["GET"])
def GetHeroBanner(request,type):
    number=random.randint(0,4)
    data=HeroBanner.objects.all()[number]
    serial=HeroBannerSerializer(data,many=False)
    return Response(serial.data)


@api_view(["GET"])
def GetGenres(request,type):
    data=Genres.objects.all()
    serial=GenresSeriallizer(data,many=True)
    return Response(serial.data)


@api_view(["GET"])
def GetLanguages(request):
    data=Languages.objects.all()
    serial=GenresSeriallizer(data,many=True)
    
    return Response(serial.data)