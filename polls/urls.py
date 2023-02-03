from django.urls import path

from . import views

from django.views.generic import TemplateView


app_name = 'polls'
urlpatterns = [

    path('', views.index, name = 'index'),

    path('specifics/<int:question_id>/', views.detail, name='detail'),

    path('specifics/<int:question_id>/results/', views.results, name='results'),

    path('specifics/<int:question_id>/vote/', views.vote, name='vote'),

    path('react', views.reactindex, name = 'reactindex'),

    ]