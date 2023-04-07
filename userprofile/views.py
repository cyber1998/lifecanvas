from django.shortcuts import render
from rest_framework import viewsets
from userprofile.models import UserProfile
from django.contrib.auth.models import User
from userprofile.serializers import UserProfileSerializer, UserSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and creating Users.
    """
    model = User
    serializer_class = UserSerializer
    queryset = User.objects.all()


class UserProfileViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and creating User Profile entries.
    """
    model = UserProfile
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()