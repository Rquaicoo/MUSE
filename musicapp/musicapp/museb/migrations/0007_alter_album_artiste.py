# Generated by Django 4.0.1 on 2022-02-13 21:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('museb', '0006_coverartiste'),
    ]

    operations = [
        migrations.AlterField(
            model_name='album',
            name='artiste',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='museb.artiste'),
        ),
    ]
