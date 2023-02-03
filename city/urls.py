from django.urls import path, include

from rest_framework.urlpatterns import format_suffix_patterns

from . import views

from django.views.generic import TemplateView

urlpatterns = [

    path('', (TemplateView.as_view(template_name='frontend_city/build/index.html',)), name='index.html'),
    path('respond', views.respond, name = 'respond'),
    path('snippets', views.snippet_list),
    path('snippets/<int:pk>/', views.snippet_detail),
    path('classsnippets/', views.SnippetListClass.as_view()),
    path('classsnippets/<int:pk>/', views.SnippetDetailClass.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    ]

urlpatterns = format_suffix_patterns(urlpatterns)