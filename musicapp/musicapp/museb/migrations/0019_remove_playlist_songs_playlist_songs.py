# Generated by Django 4.0.1 on 2022-02-21 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('museb', '0018_alter_listenlater_music_alter_listenlater_user_token'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='playlist',
            name='songs',
        ),
        migrations.AddField(
            model_name='playlist',
            name='songs',
            field=models.ManyToManyField(to='museb.Music'),
        ),
    ]