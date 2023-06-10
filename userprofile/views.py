from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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


@api_view(['GET'])
def get_user_profile(request, user_id=None):
    """
    Get a User Profile entry by user id
    """
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)