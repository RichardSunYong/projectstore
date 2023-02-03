from django.db import models


class Event(models.Model):
    owner = models.ForeignKey('auth.User', related_name='events', on_delete=models.CASCADE, default = 1)
    eventphoto = models.ImageField(upload_to='eventphoto/', default = 'blankimage.jpg')
    title = models.CharField("Title", max_length = 240, default = 'default title')
    address = models.CharField("Address", max_length = 240, default = 'default address')
    startdatetime = models.DateTimeField()
    enddatetime = models.DateTimeField()
    timedescription = models.CharField("Time Description", max_length = 240, default = 'default time desc')
    estimateprice = models.CharField("Estimate Price", max_length = 240, default = 'default est price')
    description = models.TextField(default = 'default description')
    minpax = models.IntegerField(default = 2)
    maxpax = models.IntegerField(default = 8)

    def __str__(self):
        return self.title

