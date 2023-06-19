# Generated by Django 4.0.3 on 2023-06-19 03:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0003_alter_chapterlikes_unique_together'),
    ]

    operations = [
        migrations.AddField(
            model_name='chapter',
            name='next_chapter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_next_chapter', to='journal.chapter'),
        ),
        migrations.AddField(
            model_name='chapter',
            name='previous_chapter',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_previous_chapter', to='journal.chapter'),
        ),
    ]
