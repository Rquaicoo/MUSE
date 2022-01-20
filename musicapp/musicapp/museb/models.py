from email.mime import image
from turtle import title
from django.db import models

# Create your models here.

class Artiste(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    cover_image = models.ImageField(blank=False, null=False)
    popular = models.BooleanField(blank=False)

class Album(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    artiste = models.OneToOneField(Artiste, on_delete=models.SET_NULL)
    trending = models.BooleanField(blank=False)

class Genre(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)

class Music(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    genre = models.ForeignKey(Genre, on_delete=models.SET_NULL)
    trending = models.BooleanField(null=False)
    main_artiste = models.OneToOneField(Artiste, on_delete=models.SET_NULL)
    collaborators = models.ForeignKey(Artiste, on_delete=models.SET_NULL,)
    music_file = models.FileField(blank=False)
    streams = models.IntegerField(default=0)

class Playlist(models.Model):
    image = models.ImageField(blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    songs = models.ForeignKey(Music, on_delete=models.SET_NULL)