from django.contrib import admin
from journal import models


@admin.register(models.Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'created_at')


@admin.register(models.Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'number', 'journal')