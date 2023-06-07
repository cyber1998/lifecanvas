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

    def get_queryset(self, request):
        return UserProfile.objects.filter(
            is_active=True,
            is_private=True,
        )
    

# Django template views that use DRF serializers
def user_list(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return render(request, 'userprofile/user_list.html', {'users': serializer.data})
