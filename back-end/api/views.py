import random
from time import sleep
from django.shortcuts import render
from .serializer import MovieItemSerializer,HeroBannerSerializer,GenresSeriallizer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MoviesList,HeroBanner,Genres,Languages
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.cache import cache

# Create your views here.



@api_view(['GET'])
def GetDataList(request,type,order):
    setOrder=None
    if order:
        if order=="TopAiring":
            setOrder="rating"
        elif order=="popular":
            setOrder="popularity"
        

    
    data=MoviesList.objects.filter(mediatype=type)[:10]
        
    
    if setOrder:
        try:
            data=sorted(data,key=lambda x: getattr(x,str(setOrder)), reverse=True)
        except:
            return Response("invalid column name",status= 400)
    
    
    serial=MovieItemSerializer(data,many=True)
    
    return Response(serial.data)


@api_view(['GET'])
def GetDetails(request,id):
        data = MoviesList.objects.get(id=id)
        
        serial=MovieItemSerializer(data,many=False)
        serial_2=HeroBannerSerializer(data.herobanner_set.first(),many=False)

        return Response({"moviedata":serial.data,
                     "herobanner":serial_2.data["backdrop"]})
        
    
    
    
    


@api_view(["GET"])
def GetHeroBanner(request,types):
    number=random.randint(0,4)
    data=HeroBanner.objects.filter(movie__mediatype=types)[number]
    print(data)
    serial=HeroBannerSerializer(data,many=False)
    return Response(serial.data)


@api_view(["GET"])
def GetGenres(request):
    cache_key = f"genres_list"
    cached_data = cache.get(cache_key)
    if cached_data:
        return Response(cached_data)
    data=Genres.objects.all()
    serial=GenresSeriallizer(data,many=True)
    cache.set(cache_key, serial.data, timeout=60) 
    return Response(serial.data)


@api_view(["GET"])
def GetLanguages(request):
    data=Languages.objects.all()
    serial=GenresSeriallizer(data,many=True)
    
    return Response(serial.data)


@api_view(["GET"])
def GetSearchResults(request):
    query=request.GET.get("query","")
    page=request.GET.get("page","")
    data=MoviesList.objects.filter(title__icontains = query)
    paginator=Paginator(data,5)

    try:
        current_page = paginator.page(page)
    except PageNotAnInteger:
        current_page = paginator.page(1)
    except EmptyPage:
        return Response({"error":"Page Not Found"},status=404)
    
    serial=MovieItemSerializer(current_page,many=True)
    
    response_data = {
        'results': serial.data,
        'count': paginator.count,
        'num_pages': paginator.num_pages,
        'current_page': current_page.number,
    }

    
    return Response(response_data)