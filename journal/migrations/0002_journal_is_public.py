# Generated by Django 4.0.3 on 2022-03-31 02:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='journal',
            name='is_public',
            field=models.BooleanField(default=False),
        ),
    ]
