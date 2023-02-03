from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, Http404
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.urls import reverse


from rest_framework import viewsets

from .models import Event
from .serializers import EventSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EventList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

def respond(request):
    context = {
        'a' : 'AAA',
        'b': 'Jessy is the best wife',
        }
    return JsonResponse(context)


def eventspace(request):
    context = {
        'question' : 'QUESTION SPACE',
        'question_id': 'ID SPACE',
        }
    return render(request, 'polls/detail2.html', context)

def reactrender(request):
    context = {
        'question' : 'QUESTION SPACE',
        'question_id': 'ID SPACE',
        }
    return render (request,'frontend_newppl/build/index.html', context)


def students_list(request):
    if request.method == 'GET':

        context = {
            'a': 'A text',
            'b': 'B text',
            }

        return render (request,'frontend_newppl/build/index.html', context)

    elif request.method == 'POST':
        context = {
            'a': 'A text',
            'b': 'B text',
            }

        return render (request,'frontend_city/build/index.html', context)

# Create your views here.
