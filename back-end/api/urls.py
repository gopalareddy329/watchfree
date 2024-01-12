from django.urls import path
from . import views


urlpatterns = [
    path('getmovies/<str:order>/',views.GetMoviesList),
    path('getseries/<str:order>/',views.GetMoviesList),
    path('getherobanner/',views.GetHeroBanner),
    path('getgenres/',views.GetGenres),
]
