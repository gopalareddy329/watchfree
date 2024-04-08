# myapp/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .models import User,MoviesList,HeroBanner
from django.views.decorators.csrf import csrf_exempt
from .serializer import UserSerializer, MovieItemSerializer,HeroBannerSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .token import MyTokenObtainPairSerializer
import random
from time import sleep
from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.cache import cache
import pandas as pd
from fuzzy_match import algorithims

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTkxZWM4ODAyYWI4MTg3YzlkNGY5ZWNkNTM1MWQ2MCIsInN1YiI6IjY1OTNmM2JkNTFhNjRlMDI3MWY1NzIxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ctN1FGf0F2b4-MzDGTfwy0triBXOFtIYso19EGdAJrI"
}


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register(request):
    username = request.data.get('username_or_email')
    password = request.data.get('password')
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
    name=request.data.get("name") if request.data.get("name") !=None else  username.split("@")[0] if '@' in username else username
    email=request.data.get("email") if request.data.get("email") !=None else  username if '@' in username else '' 
    

    user, created = User.objects.get_or_create(username=username,email=email,name=name)
    if created:
        user.set_password(password)
        user.save()
        serializer=MyTokenObtainPairSerializer(data={"username":username,"email":email,"name":name,"password":password})
        serializer.is_valid(raise_exception=True)
        

        return Response({'refresh': str(serializer.validated_data["refresh"]),'access':serializer.validated_data['access']}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_details(request):
    print(request.headers)
    print(request.auth)
    user = request.user
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['GET'])
def GetDataList(request,order):
    setOrder=None
    if order:
        if order=="TopAiring":
            setOrder="rating"
        elif order=="popular":
            setOrder="popularity"
        

    
    data=MoviesList.objects.all()[:10]
        
    
    
    serial=MovieItemSerializer(data,many=True)
    
    return Response(serial.data)


@api_view(['GET'])
def GetDetails(request,id):
        data = MoviesList.objects.get(movieId=id)
        
        serial=MovieItemSerializer(data,many=False)
        serial_2=HeroBannerSerializer(data.herobanner_set.first(),many=False)

        return Response({"moviedata":serial.data,
                     "herobanner":serial_2.data["backdrop"]})
        
    
    
    
    


@api_view(["GET"])
def GetHeroBanner(request):
    try:
        number=random.randint(0,4)
        data=HeroBanner.objects.all()[number]
        serial=HeroBannerSerializer(data,many=False)
        return Response(serial.data)
    except Exception as e:
        return Response({"error":str(e)},status=400)








@api_view(["GET"])
def GetSearchResults(request):
    query=request.GET.get("query","")
    page=request.GET.get("page","")
    data=MoviesList.objects.all()
    search_results=[]
    
    for movie in data:
        similarity = algorithims.cosine(movie.title[:-6].lower(), query.lower())

        threshold = 0.4
        if similarity >= threshold:
          
            if similarity>=0.95:
                search_results.insert(0,movie)
            else:
                search_results.append(movie)
                
    
    paginator=Paginator(search_results,5)
    

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



def update_dataset():
    data = pd.read_csv('/Users/gopalareddy/Desktop/repo/watchfree/backend/ml-latest/image_link.csv')
    for index, row in data.iterrows():
        print(index)
        try:
            movie=MoviesList()
            movie.title=row["title"]
            movie.movieId=row["movieId"]
            movie.tmdbId=row["tmdbId"]
            movie.imdbId=row["imdbId"]
            movie.genres=row["genre"]
            movie.rating=row["average_rating"]
            movie.img_link=row["image_link"]
            movie.save()
        except Exception as e:
            MoviesList.objects.all().delete()
            print(str(e))
            break
    return True


@api_view(["GET"])
def GetMovie(request):

    update_dataset()
    return Response({"got":"HI"})