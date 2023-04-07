from django.urls import path, include

urlpatterns = [
    path('v1/journal/', include('journal.urls')),
    path('v1/user/', include('userprofile.urls')),
]