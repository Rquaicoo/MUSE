from django.urls import path, re_path

from rest_framework.authtoken.views import obtain_auth_token
from .views import *


'''
authentication endpoints
Oauth2 endpoints

GET /auth/login/ - login user
POST /auth/register/ - register user
GET /auth/logout/ - logout user

GET /music/ - get all music
GET /cover/ - get cover art
GET /new/ - get new music
GET /trending/ - get trending music

GET /liked/ - get liked music
GET /followedartists/ - get followed artists
GET /listenlater/ - get listen later music

GET /getlikedmusic/ - get liked music
GET /getfollowedartists/ - get followed artists
GET /getuser/ - get user

GET /album/ - get all albums
GET /artist/ - get all artistes
GET /popular_artists/ - get popular artistes
GET /artist_content/ - get artiste page
GET /genre/ - get all genres
GET /playlist/ - get all playlists

'''

urlpatterns = [
    re_path(r'^auth/login/$', obtain_auth_token, name="auth_user_login"),
    re_path(r'^auth/register/$', CreateUserView.as_view(), name="auth_user_register"),
    re_path(r'^auth/logout/$', LogoutUserAPIView.as_view(), name="auth_user_logout"),
    
    #path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    #path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),

    path('music/', MusicView.as_view(), name="music_list"),
    path('music/<str:pk>/', MusicView.as_view(), name="music_detail"),
 
    path('cover/', CoverArtisteView.as_view(), name="cover"),
    
    
    path('liked/', LikedMusicView.as_view(), name="liked_music"),
    path('liked/<str:pk>/', LikedMusicView.as_view(), name="liked_music_detail"),

    path('followedartists/', FollowedArtistesView.as_view(), name="followed_artists"),
    path('followedartists/<str:artist_id>/', FollowedArtistesView.as_view(), name="followed_artists_detail"),

    path('listenlater/', ListenLaterView.as_view(), name="listen_later"), 
    path('listenlater/<str:pk>/', ListenLaterView.as_view(), name="listen_later_detail"),

    path('user/', UserAPIView.as_view(), name="get_user"),
    path('userimage/', UserImageView.as_view(), name="get_user_image"),
    
    
    re_path(r'^album/$', AlbumAPIView.as_view(), name="album_list"),
    path('album/<str:pk>/', AlbumAPIView.as_view(), name="album_detail"),

    re_path(r'^artist/$', ArtistAPIView.as_view(), name="artist_list"),
    path('artist/<str:pk>/', ArtistAPIView.as_view(), name="artist_detail"),

    re_path(r'^popular_artists/$', PopularArtistView.as_view(), name="popular_artist_list"),
    re_path(r'^artist_content/$', ArtistePageView.as_view(), name="artist_page"),
    re_path(r'^genre/$', GenreView.as_view(), name="genre_list"),
    path('genre/<str:pk>/', GenreView.as_view(), name="genre_detail"),

    re_path(r'^playlist/', PlaylistAPIView.as_view(), name="playlist_list"),
    path('playlist/<str:pk>/', PlaylistAPIView.as_view(), name="playlist_detail"),
]
