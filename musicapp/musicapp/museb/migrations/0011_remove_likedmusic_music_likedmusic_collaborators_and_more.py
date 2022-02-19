# Generated by Django 4.0.1 on 2022-02-19 08:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('museb', '0010_alter_music_new'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='likedmusic',
            name='music',
        ),
        migrations.AddField(
            model_name='likedmusic',
            name='collaborators',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='likedmusic',
            name='main_artiste',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='museb.artiste'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='likedmusic',
            name='music_file',
            field=models.FileField(default=1, upload_to=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='likedmusic',
            name='title',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
