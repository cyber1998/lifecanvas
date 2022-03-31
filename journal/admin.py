from django.contrib import admin
from journal import models


@admin.register(models.Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'is_public', 'created_by')


@admin.register(models.Chapter)
class ChapterAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'number', 'journal')