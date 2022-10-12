from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home, name='signUp'),

    path('join_waiting_list/', views.signUp, name='signUp'),

    path('users/', views.users, name='users'),
    
    path('download_apk/', views.downloadApp, name='downloadApp'),
]