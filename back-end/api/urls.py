from django.urls import path
from . import views


urlpatterns = [
    path('getdata/<str:type>/<str:order>/',views.GetDataList),
    path('getdetails/<str:type>/<str:id>/',views.GetDetails),
    path('getherobanner/<str:type>/',views.GetHeroBanner),
    path('getgenres/<str:type>/',views.GetGenres),
]
