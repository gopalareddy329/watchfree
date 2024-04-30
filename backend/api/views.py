# myapp/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from .models import User,MoviesList,UserHistory
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
from .Recommenders.content_recommender import RecommenderWithCache
from django.db.models import Q

recommender = RecommenderWithCache()

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
    setOrder=20
    if order:
        if order=="TopAiring":
            setOrder=0
        elif order=="popular":
            setOrder=10
        
    
    data=MoviesList.objects.filter(rating_count__gt=10).order_by('-rating')[setOrder:setOrder+10]
        
    
    
    serial=MovieItemSerializer(data,many=True)
    
    return Response(serial.data)


@api_view(['GET'])
def GetDetails(request,id):
        data = MoviesList.objects.get(movieId=id)
        
        serial=MovieItemSerializer(data,many=False)
    

        return Response({"moviedata":serial.data})
        
    
    
    
    


@api_view(["GET"])
def GetHeroBanner(request):
    try:
        number=random.randint(0,3)
        data=MoviesList.objects.all()[number]
        serial=MovieItemSerializer(data,many=False)
        return Response(serial.data)
    except Exception as e:
        return Response({"error":str(e)},status=400)


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def update_rating(request):
    try:
        movieId=request.data.get('movieId')
        rating=request.data.get('rating')
        user=User.objects.get(username=request.user)
        movie=MoviesList.objects.get(movieId=movieId)
        history, created=UserHistory.objects.get_or_create(movie=movie,user=user)

        if not rating:
            return  Response({"value":history.rating})
        
            
        
        if history.rating is None:
            movie.rating=((movie.rating * movie.rating_count) + int(rating)) / (movie.rating_count+1)
            movie.rating_count=movie.rating_count+1
            movie.save()


        if history.rating is not None:
            value=((movie.rating * movie.rating_count) - int(history.rating)) 
            movie.rating=((max(0,value)) + int(rating)) / (movie.rating_count)
            movie.save()



        history.rating=rating
        history.save()
            
        
        return Response({"result":"updated"})
    except Exception as e:
        return Response({"error":str(e)}, status=status.HTTP_400_BAD_REQUEST)






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
    dtype_dict = {'movieId': int,'average_rating':float,'title':str,'genre':str,'imdbId': float, 'tmdbId': str,'image_link':str,'youtubeId':str,'rating_count':int,'overview':str}
    data = pd.read_csv('/Users/gopalareddy/Desktop/repo/all_python/movierec/movie_overview.csv',dtype=dtype_dict)
    data = data.dropna(subset=['imdbId'],axis=0)
    data['imdbId'] = data['imdbId'].astype(int)
    for index, row in data.iterrows():
        print(index)
        try:
            movie=MoviesList()
            movie.title=row["title"]
            movie.movieId=row["movieId"]
            movie.tmdbId=row["tmdbId"]
            movie.imdbId=int(row["imdbId"])
            movie.genres=row["genre"]
            movie.rating=row["average_rating"]
            movie.img_link=row["image_link"]
            movie.youtubeId=row["youtubeId"]
            movie.rating_count=row["rating_count"]
            movie.movieOverview=row["overview"]
            movie.save()
        except Exception as e:
            MoviesList.objects.all().delete()
            print(str(e))
            break
    return True


@api_view(["GET"])
def GetMovie(request):
    MoviesList.objects.all().delete()

    update_dataset()
    return Response({"got":"HI"})



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def recommend_movie(request) :
    user = request.user
    print(user)

    user_history = UserHistory.objects.filter(user__id=user.id, rating__gt=3.5)[:3]
    print(user_history)
    if user_history is not None: 
        added_ids = set()
        ids =  []
        for movie in user_history:
            print(movie.movie.imdbId)
            added_ids.add(movie.movie.imdbId)
            ids.extend(recommender.recommend(movie_id=movie.movie.imdbId , movie_overview= movie.movie.movieOverview))
        response = []
        

        for id in ids:
            try:
                movie = MoviesList.objects.get(imdbId=id)
                if movie.imdbId not in added_ids:  # Check if IMDb ID is already in the set
                    response.append(movie)
                    added_ids.add(movie.imdbId)  # Add IMDb ID to the set to mark it as added
            except MoviesList.DoesNotExist:
                pass
            
        serial = MovieItemSerializer(response , many=True) 
        return Response(serial.data)
    return Response({"noData":"no data"}) 

    