from django.urls import path
from . import views


urlpatterns = [
    path('getdata/<str:type>/<str:order>/',views.GetDataList),
    path('getdetails/<str:id>/',views.GetDetails),
    path('getherobanner/<str:types>/',views.GetHeroBanner),
    path('getgenres/',views.GetGenres),
    path('getlanguages/',views.GetLanguages),
    path('searchdata/',views.GetSearchResults),
]
