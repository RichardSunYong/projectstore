from django.urls import path, include

from rest_framework.urlpatterns import format_suffix_patterns

from . import views

from django.views.generic import TemplateView

from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [

    path('', (TemplateView.as_view(template_name='frontend_newppl/build/index.html',)), name='index.html'),
    path('otherreact', (TemplateView.as_view(template_name='frontend_city/build/index.html',)), name='index.html'),
    path('events/', views.EventList.as_view()),
    path('events/<int:pk>', views.EventDetail.as_view()),
    ]

urlpatterns = format_suffix_patterns(urlpatterns)
