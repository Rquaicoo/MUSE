from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Music)
admin.site.register(Genre)
admin.site.register(Album)
admin.site.register(Artiste)
admin.site.register(Playlist)