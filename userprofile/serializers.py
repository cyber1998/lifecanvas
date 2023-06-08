from rest_framework import serializers
from django.contrib.auth.models import User
from userprofile.models import Interest, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    interests = InterestSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
