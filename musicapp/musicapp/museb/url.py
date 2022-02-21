from django.urls import path, re_path

from rest_framework.authtoken.views import obtain_auth_token
from .views import *

urlpatterns = [
    re_path(r'^auth/login/$', obtain_auth_token, name="auth_user_login"),
    re_path(r'^auth/register/$', CreateUserView.as_view(), name="auth_user_register"),
    re_path(r'^auth/logout/$', LogoutUserAPIView.as_view(), name="auth_user_logout"),
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('music/', MusicView.as_view(), name="music_list"),
    path('cover/', CoverArtisteView.as_view(), name="cover"),
    path('new/', NewMusicView.as_view(), name="new_music"),
    path('trending/', TrendingMusicView.as_view(), name="trending_music"),
    path('liked/', LikedMusicView.as_view(), name="liked_music"),
    path('followedartists/', FollowedArtistesView.as_view(), name="followed_artists"),
    path('listenlater/', ListenLaterView.as_view(), name="listen_later"), 
    path('getlikedmusic/', GetLikedMusicView.as_view(), name="get_liked_music"),
    path('getfollowedartists/', GetFollowedArtistsView.as_view(), name="get_followed_artists"),
    path('getuser/', GetUserView.as_view(), name="get_user"),
    re_path(r'^album/$', AlbumView.as_view(), name="album_list"),
    re_path(r'^artist/$', ArtistView.as_view(), name="artist_list"),
    re_path(r'^popular_artists/$', PopularArtistView.as_view(), name="popular_artist_list"),
    re_path(r'^artist_content/$', ArtistePageView.as_view(), name="artist_page"),
    re_path(r'^genre/$', GenreView.as_view(), name="genre_list"),
    re_path(r'^playlist/', PlaylistView.as_view(), name="playlist_list"),
]