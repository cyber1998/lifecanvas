from django.urls import path, include
from userprofile import views as userprofile_views

urlpatterns = [
    path('journal/', include('journal.urls')),
    path('user/', include('userprofile.urls')),
    path('user/<int:user_id>/profile/', userprofile_views.get_user_profile, name='get_user_profile'),
    path('user/<int:user_id>/update-profile/', userprofile_views.update_user_profile, name='update_user_profile'),
    path('interests/', userprofile_views.get_interests, name='get_interests'),
]