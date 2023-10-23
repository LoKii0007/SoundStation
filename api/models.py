from django.db import models
import string, random

# Create your models here.

def Generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code = code).count()== 0:
            break

    return code



class Room(models.Model):
    code = models.CharField(max_length=20, default=Generate_unique_code, unique=True)
    host = models.CharField(max_length=20, default="")
    guestCanPause  = models.BooleanField(null=False, default=False)
    votesToSkip = models.IntegerField(null=False,default=1)
    createdAt = models.DateTimeField(auto_now=False, auto_now_add=True)
