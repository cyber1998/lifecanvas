from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from userprofile.models import Interest, UserProfile
from django.contrib.auth.models import User
from userprofile.serializers import InterestSerializer, UpdateUserSerializer, UserProfileSerializer, UserSerializer

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
    
@api_view(['PUT'])
def update_user_profile(request, user_id=None):
    """
    Update a User Profile entry by user id
    """
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)
        serializer = UpdateUserSerializer(user_profile, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserProfileSerializer(user_profile).data)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_interests(request):
    """
    Get all interests
    """
    interests = Interest.objects.all()
    serializer = InterestSerializer(interests, many=True)
    return Response(serializer.data)

