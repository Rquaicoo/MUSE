# Generated by Django 4.0.1 on 2022-03-07 15:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authtoken', '0003_tokenproxy'),
        ('museb', '0020_listenlater_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='listenlater',
            name='image',
        ),
        migrations.CreateModel(
            name='UserImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(default='memoji.png', upload_to='')),
                ('token', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='authtoken.token')),
            ],
        ),
    ]