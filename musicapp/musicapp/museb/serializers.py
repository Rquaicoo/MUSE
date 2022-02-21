from asyncore import read
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import *

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

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ('id', 'title', 'imageURL', 'image', 'fileURL','main_artiste', 'collaborators', 'music_file', 'streams', 'trending', 'genre')

class CoverArtiseSerilizer(serializers.ModelSerializer):
    class Meta:
        model = CoverArtiste
        fields = ('id', 'title', 'imageURL', 'image', 'fileURL','main_artiste', 'collaborators', 'music_file', 'streams', 'trending')

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ('id', 'title', 'image', 'imageURL', 'artiste')

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artiste
        fields = ('id', 'name', 'image', 'imageURL', 'popular')

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ('id', 'title', 'image', 'imageURL', 'songs')

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ('id', 'title')

class LikedMusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedMusic
        fields = ('id','user_token','music')

class ListenLaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListenLater
        fields = ('id','user_token','music')

class FollowedArtistesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowedArtistes
        fields = ('id','user_token','artistes')