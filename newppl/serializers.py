# import serializers from the REST framework
from rest_framework import serializers

from .models import Event
from django.contrib.auth.models import User

class EventSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        owner = serializers.ReadOnlyField(source='owner.username')
        return Event.objects.create(**validated_data)
    class Meta:
        model = Event
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    events = serializers.PrimaryKeyRelatedField(many = True, queryset=Event.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'events']

# import the todo data model