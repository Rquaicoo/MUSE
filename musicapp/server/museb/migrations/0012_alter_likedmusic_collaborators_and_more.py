# Generated by Django 4.0.1 on 2022-02-19 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('museb', '0011_remove_likedmusic_music_likedmusic_collaborators_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedmusic',
            name='collaborators',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='likedmusic',
            name='music_file',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='likedmusic',
            name='title',
            field=models.CharField(max_length=100, null=True),
        ),
    ]