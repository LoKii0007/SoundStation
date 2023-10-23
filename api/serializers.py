from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'host', 'code', 'guestCanPause', 'votesToSkip','createdAt')

class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        exclude = ('id', 'host', 'code', 'createdAt')

class UpdateRoomSerializer(serializers.ModelSerializer):
    code =  serializers.CharField(validators=[])

    class Meta:
        model = Room
        exclude = ('id', 'host', 'createdAt')