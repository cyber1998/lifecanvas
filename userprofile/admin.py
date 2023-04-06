from django.contrib import admin
from userprofile import models


@admin.register(models.UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'is_private', 'created_at')

@admin.register(models.Interest)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_active', 'name')