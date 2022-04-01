from django.urls import path, include

urlpatterns = [
    path('v1/journal/', include('journal.urls')),
]