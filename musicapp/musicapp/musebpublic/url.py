from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.signUp, name='signUp'),
    path('users/', views.users, name='users')
]