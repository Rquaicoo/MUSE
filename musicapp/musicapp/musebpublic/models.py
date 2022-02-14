from django.db import models

# Create your models here.

class BetaUsers(models.Model):
    name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name