from asyncore import read
from django.contrib.auth import get_user_model
from numpy import require
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class CreateUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only = True, required=True,
    style={'input_type': 'password'})

    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password')
        write_only_fields = ('password',)
        read_only_fields = ('is_staff', 'is_superuser', 'is_active', 'date_joined', 'last_login')

    def create(self, validated_data):
        user = super(CreateUserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'email','is_active', 'date_joined', 'last_login')

class UserImageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserImage
        fields = ('id','image', 'user')

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'title', 'image', 'imageURL', 'artiste')

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artiste
        fields = ('id', 'name', 'image', 'imageURL', 'popular')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'title')


class MusicSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    music_file = serializers.FileField(required=False)
    
    album = AlbumSerializer(read_only=True)
    main_artiste = ArtistSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)

    class Meta:
        model = Music
        fields = ('id', 'title', 'imageURL', 'image', 'fileURL','main_artiste', 'album', 'collaborators', 'music_file', 'streams', 'genre')

class CoverArtiseSerializer(serializers.ModelSerializer):
    album = AlbumSerializer(read_only=True)
    main_artiste = ArtistSerializer(read_only=True)
    genre = GenreSerializer(read_only=True)

    class Meta:
        model = CoverArtiste
        fields = ('id', 'title', 'imageURL', 'image', 'fileURL','main_artiste', 'album', 'collaborators', 'music_file', 'streams', 'genre')



class PlaylistSerializer(serializers.ModelSerializer):

    songs = MusicSerializer(read_only=True, many=True)

    class Meta:
        model = Playlist
        fields = ('id', 'title', 'image', 'imageURL', 'songs')



class LikedMusicSerializer(serializers.ModelSerializer):
    music = MusicSerializer(read_only=True, many=True)
    
    class Meta:
        model = LikedMusic
        fields = ('id','user','music')

class ListenLaterSerializer(serializers.ModelSerializer):
    music = MusicSerializer(read_only=True, many=True)
    class Meta:
        model = ListenLater
        fields = ('id','user','music')

class FollowedArtistesSerializer(serializers.ModelSerializer):
    artistes = ArtistSerializer(read_only=True, many=True)
    class Meta:
        model = FollowedArtistes
        fields = ('id','user','artistes')


