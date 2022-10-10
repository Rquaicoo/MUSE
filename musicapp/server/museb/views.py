import json

import random

from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.views import APIView
from .serializers import *
import json


from rest_framework.parsers import JSONParser
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

#from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
##from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
#from dj_rest_auth.registration.views import SocialLoginView

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
        try:
            UserImage.objects.create(token=token)
        except:
            pass
        token_data = {"token": token}
        print(token_data)
        return Response(
            {**serializer.data, **token_data},
            status = status.HTTP_201_CREATED,
            headers = headers
        )

class LogoutUserAPIView(APIView):

    queryset = get_user_model().objects.all()

    def get(self, request):
        if request.user.is_authenticated:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

"""
class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
"""    

def get_song_by_primary_key(pk):
    if pk.isdigit():
        music = Music.objects.get(id=pk)
        serializer = MusicSerializer(music)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #check if the pk is 'trending'
    elif pk == 'trending':
        music = Music.objects.all().order_by('-streams')
        serializer = MusicSerializer(music, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #check if the pk is 'new'
    elif pk == 'new':
        music = Music.objects.all().order_by('-date')
        serializer = MusicSerializer(music, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    #check if the pk is 'random'
    elif pk == 'random':
        music = Music.objects.all()
        music = random.choice(music)
        serializer = MusicSerializer(music)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MusicView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MusicSerializer 

    def get(self, request, pk=None):
        if pk:
            try:
                return get_song_by_primary_key(pk)
            except:
                return Response( status=status.HTTP_404_NOT_FOUND)
        else:
            music = Music.objects.all()
            serializer = MusicSerializer(music, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        parser_classes = (MultiPartParser, FormParser)

        serializer = MusicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    def put(self, request):
        try:
            serializer = MusicSerializer(data=request.data)
            music_dict = dict(serializer.initial_data)
            music_id = music_dict['id']
            music = Music.objects.get(id=music_id)
            music.streams += 1
            music.save()
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
        

class CoverArtisteView(APIView):
    def get(self, request, *args, **kwargs):
        cover = CoverArtiste.objects.all()
        serializer = CoverArtiseSerializer(cover, many=True)
        return Response(serializer.data)
    
    def post(self, ):
        pass
    def put(self, request):
        try:
            serializer = MusicSerializer(data=request.data)
            music_dict = dict(serializer.initial_data)
            music_id = music_dict['id']
            music = Music.objects.get(id=music_id)
            music.streams += 1
            music.save()
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PopularArtistView(APIView):
    def get(self, request, *args, **kwargs):
        music = Artiste.objects.filter(popular=True)
        
        serializer = ArtistSerializer(music, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class AlbumAPIView(APIView):
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            try:
                album = Album.objects.get(id=pk)
                serializer = AlbumSerializer(album)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            albums = Album.objects.all()
            serializer = AlbumSerializer(albums, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        parser_classes = (MultiPartParser, FormParser)

        serializer = AlbumSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class ArtistAPIView(APIView):
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            try:
                artist = Artiste.objects.get(id=pk)
                serializer = ArtistSerializer(artist)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            artists = Artiste.objects.all()
            serializer = ArtistSerializer(artists, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        parser_classes = (MultiPartParser, FormParser)

        serializer = ArtistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class PlaylistAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                playlist = Playlist.objects.get(id=pk)
                serializer = PlaylistSerializer(playlist)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            playlists = Playlist.objects.all()
            serializer = PlaylistSerializer(playlists, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        parser_classes = (MultiPartParser, FormParser)

        serializer = PlaylistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class GenreView(APIView):
    def get(self, request, pk=None):
        if pk:
            try:
                genre = Genre.objects.get(id=pk)
                serializer = GenreSerializer(genre)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            genres = Genre.objects.all()
            serializer = GenreSerializer(genres, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request,):
        parser_classes = (MultiPartParser, FormParser)

        serializer = GenreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ArtistePageView(APIView):
    def post(self, request,):
        artist_serializer = ArtistSerializer(data=request.data)
        
        
        artist = str(dict(artist_serializer.initial_data)["name"])

        artist_id = Artiste.objects.get(name=artist).id
        artist_music = Music.objects.filter(main_artiste_id=artist_id)
        
        artist_album = Album.objects.filter(artiste=artist_id)

        artiste_music_serializer = MusicSerializer(artist_music, many=True)
        artiste_album_serializer = AlbumSerializer(artist_album, many=True)

        return(Response({"music": artiste_music_serializer.data, "album": artiste_album_serializer.data}, status=status.HTTP_302_FOUND))




class LikedMusicView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        liked_music = LikedMusic.objects.filter(user=request.user)
        serializer = LikedMusicSerializer(liked_music, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, pk=None):
        if pk:
            user = request.user
            LikedMusic.objects.create(user=user, music_id=pk)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        if pk:
            user = request.user
            LikedMusic.objects.filter(user=user, music_id=pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        

class ListenLaterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        listen_later = ListenLater.objects.filter(user=request.user)
        serializer = ListenLaterSerializer(listen_later, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    def post(self, request, pk=None):
        if pk:
            user = request.user
            ListenLater.objects.create(user=user, music_id=pk)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk:
            user = request.user
            ListenLater.objects.filter(user=user, music_id=pk).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class FollowedArtistesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        followed_artistes = FollowedArtistes.objects.filter(user=request.user)
        serializer = FollowedArtistesSerializer(followed_artistes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
    def post(self, request, artist_id=None):
        if artist_id:
            user = request.user
            FollowedArtistes.objects.create(user=user, artiste_id=artist_id)
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, artist_id=None):
        if artist_id:
            user = request.user
            FollowedArtistes.objects.filter(user=user, artiste_id=artist_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class UserAPIView(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserImageView(APIView):
    def get(self, request):
        user_data = UserImage.objects.filter(user=request.user)
        serializer = UserImageSerializer(user_data)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        parser_classes = (MultiPartParser, FormParser)

        serializer = UserImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
