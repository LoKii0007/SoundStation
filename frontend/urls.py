from .views import index, getroom
from django.urls import path

app_name = 'frontend'

urlpatterns = [
    path('', index, name="index"),    
    path('create', index, name="create"),
    path('join', index, name="join"),
    path('room/<str:roomCode>', getroom, name="getroom")
]
