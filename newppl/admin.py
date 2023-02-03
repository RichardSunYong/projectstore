from django.contrib import admin


from .models import Event

# create a class for the admin-model integration

# we will need to register the
# model class and the Admin model class
# using the register() method
# of admin.site class
admin.site.register(Event)