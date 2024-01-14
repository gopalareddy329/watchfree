from django.urls import path
from . import views


urlpatterns = [
    path('getdata/<str:order>/<str:type>/',views.GetDataList),
    path('getherobanner/<str:type>/',views.GetHeroBanner),
    path('getgenres/<str:type>/',views.GetGenres),
]
