from django.db import models
from rest_framework.authtoken.models import Token

# Create your models here.
class Artiste(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    image = models.ImageField(blank=False, null=False)
    popular = models.BooleanField(blank=False)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url= ''
        return url

    def __str__(self):
        return self.name

class Album(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    artiste = models.ForeignKey(Artiste, on_delete=models.CASCADE)
    trending = models.BooleanField(blank=False)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url= ''
        return url

    def __str__(self):
        return self.title

class Genre(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.title


class Music(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True, blank=True)
    trending = models.BooleanField(null=False)
    main_artiste = models.ForeignKey(Artiste, on_delete=models.CASCADE)
    collaborators = models.CharField(max_length=100, blank=True, null=True)
    music_file = models.FileField(blank=False)
    streams = models.IntegerField(default=0)
    

    @property
    def fileURL(self):
        try:
            url = self.music_file.url
        except:
            url= ''
        return url

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url= ''
        return url

    def __str__(self):
        return self.title

class CoverArtiste(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True, blank=True)
    trending = models.BooleanField(null=False)
    main_artiste = models.ForeignKey(Artiste, on_delete=models.CASCADE)
    collaborators = models.CharField(max_length=100, blank=True, null=True)
    music_file = models.FileField(blank=False)
    streams = models.IntegerField(default=0)
    
    
    @property
    def fileURL(self):
        try:
            url = self.music_file.url
        except:
            url= ''
        return url


    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url= ''
        return url

    def __str__(self):
        return self.title

class Playlist(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    songs = models.ForeignKey(Music, on_delete=models.CASCADE)

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url= ''
        return url

    def __str__(self):
        return self.title

class FollowedArtistes(models.Model):
    user_token = models.OneToOneField(Token, on_delete=models.SET_NULL, null=True)
    artistes = models.ForeignKey(Artiste, on_delete=models.SET_NULL, null=True)
    

class LikedMusic(models.Model):
    user_token = models.OneToOneField(Token, on_delete=models.SET_NULL, null=True)
    music = models.ForeignKey(Music, on_delete=models.SET_NULL, null=True)