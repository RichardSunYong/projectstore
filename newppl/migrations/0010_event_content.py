# Generated by Django 4.1.4 on 2023-02-06 10:50

from django.db import migrations
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ("newppl", "0009_event_eventphoto"),
    ]

    operations = [
        migrations.AddField(
            model_name="event",
            name="content",
            field=tinymce.models.HTMLField(default=""),
        ),
    ]
