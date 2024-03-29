# Generated by Django 4.0.3 on 2023-04-06 03:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=128)),
            ],
            options={
                'verbose_name': 'Interest',
                'verbose_name_plural': 'Interests',
                'db_table': 'interest',
            },
        ),
        migrations.AddField(
            model_name='userprofile',
            name='interests',
            field=models.ManyToManyField(related_name='interests', to='userprofile.interest'),
        ),
    ]
