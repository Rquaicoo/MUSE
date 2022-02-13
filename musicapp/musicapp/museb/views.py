from email.mime import audio
import json
from urllib import request
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *

from rest_framework.parsers import JSONParser
from django.utils.decorators import method_decorator
#from mutagen.mp3 import MP3

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
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception= True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        #generate token for future authentication
        token = Token.objects.create(user=serializer.instance).key
        token_data = {"token": token}
        print(token_data)
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

@method_decorator(csrf_exempt, name='dispatch')
class MusicView(APIView):
    def get(self, request, *args, **kwargs):
        music = Music.objects.all()
        #for song in music:
        #print(MP3(song.music_file).info.length)
            
        serializer = MusicSerializer(music, many=True)
        return Response(serializer.data)
    
    def post(self, ):
        pass

    def put(self, request):
        serializer = MusicSerializer(request.data)
        if serializer.is_valid():
            music = Music.objects.filter(id=dict(serializer)["id"])
            music.streams += 1
            music.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CoverArtisteView(APIView):
    def get(self, request, *args, **kwargs):
        cover = CoverArtiste.objects.all()
        serializer = CoverArtiseSerilizer(cover, many=True)
        return Response(serializer.data)
    
    def post(self, ):
        pass

class AlbumView(APIView):
    def get(self, *args, **kwargs):
        albums = Album.objects.all()
        serializer = AlbumSerializer(albums, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.method == "POST":
            serializer = AlbumSerializer(data=request.data)
            album_id = dict(serializer.initial_data)["id"]

            album = Album.objects.get(id=album_id)
            music = Music.objects.filter(album=album)

            
            music_serializer = MusicSerializer(music, many=True)
            print(music_serializer.data)
            if serializer.is_valid():
                print("yes")
                return Response(music_serializer.data, status=status.HTTP_201_CREATED)
            return Response(music_serializer.data,status=status.HTTP_302_FOUND)

class ArtistView(APIView):
    def get(self, *args, **kwargs):
        artistes = Artiste.objects.all()
        serializer = ArtistSerializer(artistes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if request.method == 'POST':
            serializer = ArtistSerializer(data=request.data)
            try:
                song_id = dict(serializer.initial_data)["main_artiste"]
            except:
                song_id = int(serializer.initial_data)

            artiste_name = str(Artiste.objects.get(id=song_id))
            
            artiste_name = dict({"artiste": artiste_name})
            print(artiste_name)
            if serializer.is_valid():
                print(serializer.initial_data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(artiste_name, status=status.HTTP_302_FOUND)
            
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

    def post(self, request,):
        genre = list(json.dumps(request.data).split(":")[1])
        genre = "".join([x for x in genre if x.isalpha()])
        genre_id = Genre.objects.get(title=genre).id
        music = Music.objects.filter(genre=genre_id)

        serialized_music = MusicSerializer(music, many=True)

        return Response(serialized_music.data, status=status.HTTP_302_FOUND)
