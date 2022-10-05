# Generated by Django 4.0.1 on 2022-02-21 00:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0003_tokenproxy'),
        ('museb', '0016_alter_listenlater_user_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='followedartistes',
            name='user_token',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='authtoken.token'),
        ),
        migrations.AlterField(
            model_name='likedmusic',
            name='user_token',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='authtoken.token'),
        ),
    ]