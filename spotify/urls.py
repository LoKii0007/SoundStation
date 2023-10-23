from django.urls import path
from .views import AuthUrl, isAuthenticated, spotify_callback, CurrentSong

urlpatterns = [
   path('get-auth-url', AuthUrl.as_view() , name='AuthUrl'),
   path('redirect', spotify_callback,  name="spotify_callback"),
   path('is-authenticated', isAuthenticated.as_view() , name="isAuthenticated"),
   path('current-song', CurrentSong.as_view() , name="currentSong")
]