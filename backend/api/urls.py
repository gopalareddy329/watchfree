# myproject/urls.py
from django.contrib import admin
from django.urls import path
from .token import MyTokenObtainPairView
from . import views

from rest_framework_simplejwt.views import (

    TokenRefreshView,
)


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.register, name='register'),
    path('get_user_data/', views.get_user_details, name='get_user_details'),
    path('getdata/<str:order>/',views.GetDataList),
    path('getdetails/<str:id>/',views.GetDetails),
    path('getherobanner/',views.GetHeroBanner),
    path('searchdata/',views.GetSearchResults),
    path('update_rating/',views.update_rating),
    path('getmovie/',views.GetMovie),
    path('get_recommendation/',views.recommend_movie),
]
