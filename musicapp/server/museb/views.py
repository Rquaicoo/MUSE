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

class MusicView(APIView):
    def get(self, request, *args, **kwargs):
        music = Music.objects.all()
        serializer = MusicSerializer(music, many=True)
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

class TrendingMusicView(APIView):
    def get(self, request):
        trending_music = Music.objects.filter(trending=True)
        serializer = MusicSerializer(trending_music, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class NewMusicView(APIView):
    def get(self, request):
        new_music = Music.objects.filter(new=True)
        serializer = MusicSerializer(new_music, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
        
        

class CoverArtisteView(APIView):
    def get(self, request, *args, **kwargs):
        cover = CoverArtiste.objects.all()
        serializer = CoverArtiseSerilizer(cover, many=True)
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
        #for song in music:
        #print(MP3(song.music_file).info.length)
        serializer = ArtistSerializer(music, many=True)
        return Response(serializer.data)



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

    def post(self, request):
        songs_list = dict(request.data)["songs"]
        music = Music.objects.filter(id__in=songs_list)
        serializer = MusicSerializer(music, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)




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

class ArtistePageView(APIView):
    def post(self, request,):
        artist_serializer = ArtistSerializer(data=request.data)
        print(artist_serializer.initial_data)
        
        artist = str(dict(artist_serializer.initial_data)["name"])

        artist_id = Artiste.objects.get(name=artist).id
        artist_music = Music.objects.filter(main_artiste_id=artist_id)
        print(artist_music)
        artist_album = Album.objects.filter(artiste=artist_id)

        artiste_music_serializer = MusicSerializer(artist_music, many=True)
        artiste_album_serializer = AlbumSerializer(artist_album, many=True)

        return(Response({"music": artiste_music_serializer.data, "album": artiste_album_serializer.data}, status=status.HTTP_302_FOUND))




class LikedMusicView(APIView):
    def get(self, request):
            token = Token.objects.get(user=request.user)
            liked_music = LikedMusic.objects.filter(user_token=token)
            print(liked_music)
            serializer = LikedMusicSerializer(liked_music, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
    def post(self, request,):
        serializer = LikedMusicSerializer(data=request.data)
        liked_music_dict = dict(serializer.initial_data)
        print(liked_music_dict)
        token = Token.objects.get(key=liked_music_dict["user_token"])
        music = Music.objects.get(id=liked_music_dict["music_id"])
        try:
            LikedMusic.objects.create(user_token=token, music=music)
        except:
            pass
        if serializer.is_valid():
            pass
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        serializer = LikedMusicSerializer(data=request.data)
        liked_music_dict = dict(serializer.initial_data)
        token = Token.objects.get(key=liked_music_dict["user_token"])
        music = Music.objects.get(id=liked_music_dict["music_id"])
        try:
            liked_music = LikedMusic.objects.get(user_token=token, music=music)
        except: 
            pass
        liked_music.delete()
        if serializer.is_valid():
            pass
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListenLaterView(APIView):
    def get(self, request):
            token = Token.objects.get(user=request.user)
            listen_later = ListenLater.objects.filter(user_token=token)
            print(listen_later)
            serializer = ListenLaterSerializer(listen_later, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
    def post(self, request,):
        serializer = ListenLaterSerializer(data=request.data)
        listen_later_dict = dict(serializer.initial_data)
        print(listen_later_dict)
        token = Token.objects.get(key=listen_later_dict["user_token"])
        music = Music.objects.get(id=listen_later_dict["music_id"])
        try:
            ListenLater.objects.create(user_token=token, music=music)
        except:
            pass
        if serializer.is_valid():
            pass
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        serializer = ListenLaterSerializer(data=request.data)
        listen_later_dict = dict(serializer.initial_data)
        token = Token.objects.get(key=listen_later_dict["user_token"])
        music = Music.objects.get(id=listen_later_dict["music_id"])
        try:
            listen_later = ListenLater.objects.get(user_token=token, music=music)
        except: 
            pass
        listen_later.delete()
        if serializer.is_valid():
            pass
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.data, status=status.HTTP_200_OK)
        

class FollowedArtistesView(APIView):
    def get(self, request):
            token = Token.objects.get(user=request.user)
            liked_music = LikedMusic.objects.filter(user_token=token)
            print(liked_music)
            serializer = LikedMusicSerializer(liked_music, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
    def post(self, request,):
        serializer = FollowedArtistesSerializer(data=request.data)
        artist_dict = dict(serializer.initial_data)
        print(artist_dict)
        token = Token.objects.get(key=artist_dict["user_token"])
        artist = Artiste.objects.get(id=artist_dict["artist_id"])
        try:
            FollowedArtistes.objects.create(user_token=token, artistes=artist)
        except:
            pass
        if serializer.is_valid():
            pass
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetFollowedArtistsView(APIView):
    def get(self, request):
            try:
                token = Token.objects.get(key=dict(request.data)["user_token"])
            except KeyError:    
                token = Token.objects.get(user=request.user)
            followed_artists = FollowedArtistes.objects.filter(user_token=token)
            artists = Artiste.objects.filter(id__in=followed_artists.values_list("artistes_id", flat=True))
            serializer = ArtistSerializer(artists, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            token = Token.objects.get(key=dict(request.data)["user_token"])
        except KeyError:
            token = Token.objects.get(user=request.user)
        followed_artists = FollowedArtistes.objects.filter(user_token=token).values_list('artistes')
        artists = Artiste.objects.filter(id__in=followed_artists)
        print(artists)
        serializer = ArtistSerializer(artists, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetLikedMusicView(APIView):
    def get(self, request):
            try:
                token = Token.objects.get(key=dict(request.data)["user_token"])
            except KeyError:
                token = Token.objects.get(user=request.user)
            liked_music = LikedMusic.objects.filter(user_token=token).values_list('music')
            music = Music.objects.filter(id__in=liked_music)
            print(music)
            serializer = MusicSerializer(music, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            token = Token.objects.get(key=dict(request.data)["user_token"])
        except KeyError:
            token = Token.objects.get(user=request.user)
        liked_music = LikedMusic.objects.filter(user_token=token).values_list('music')
        music = Music.objects.filter(id__in=liked_music)
        print(music)
        serializer = MusicSerializer(music, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetUserView(APIView):
    def get(self, request):
        try:
            user = Token.objects.get(key=dict(request.data)["user_token"]).user
        except KeyError:
            user = request.user
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)
        
    def post(self, request):
        try:
            user = Token.objects.get(key=dict(request.data)["user_token"]).user
        except KeyError:
            user = request.user
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)


class GetUserImageView(APIView):
    def get(self, request):
        try:
            token = Token.objects.get(key=dict(request.data)["user_token"])
        except:
            token = Token.objects.get(user=request.user)
        try:
            UserImage.objects.create(token=token)
        except:
            pass
        data = UserImage.objects.filter(token=token)
        userData = UserImageSerializer(data, many=True)
        return Response(userData.data, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            token = Token.objects.get(key=dict(request.data)["user_token"])
        except:
            token = Token.objects.get(user=request.user)
        try:
            UserImage.objects.create(token=token)
        except:
            pass
        data = UserImage.objects.filter(token=token)
        userData = UserImageSerializer(data, many=True)
        return Response(userData.data, status=status.HTTP_200_OK)
    
