from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *


from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

from django.views.decorators.csrf import csrf_exempt
# Create your views here.

class CreateUserView(CreateAPIView):
    serializer_class = CreateUserSerializer
    permission_classes = [AllowAny]

    @csrf_exempt
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_seception= True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        #generate token for future authentication
        token = Token.objects.create(user=serializer.instance)
        token_data = {"token": token}
        return Response(
            {**serializer.data, **token_data},
            status = status.HTTP_201_CREATED,
            headers = headers
        )

class LogoutUserAPIView(APIView):

    queryset = get_user_model().objects.all()

    def get(self, request, format=None):
        #delete the token
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class MusicView(APIView):
    def get(self,  *args, **kwargs):
        musics = Music.objects.all()
        serializer = MusicSerializer(musics, many=True)
        return Response(serializer.data)
    

class AlbumView(APIView):
    def get(self, *args, **kwargs):
        albums = Album.objects.all()
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)

class ArtistView(APIView):
    def get(self, *args, **kwargs):
        artistes = Artiste.objects.all()
        serializer = ArtistSerializer(artistes, many=True)
        return Response(serializer.data)

class PlaylistView(APIView):
    def get(self, *args, **kwargs):
        playlists = Playlist.objects.all()
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)

class GenreView(APIView):
    def get(self, *args, **kwargs):
        genres = Genre.objects.all()
        serializer = GenreSerializer(genres, many=True)
        return Response(serializer.data)