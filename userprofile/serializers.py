from rest_framework import serializers
from django.contrib.auth.models import User
from userprofile.models import Interest, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

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

class UpdateUserSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    last_name = serializers.CharField(required=False, allow_blank=True, max_length=100)
    email = serializers.EmailField(required=False, allow_blank=True, max_length=100)
    password = serializers.CharField(required=False, allow_blank=True, max_length=100)
    username = serializers.CharField(required=False, allow_blank=True, max_length=100)
    interests = serializers.ListField(child=serializers.IntegerField(), required=False)

    def validate(self, attrs):
        return super().validate(attrs)

    def update(self, instance, validated_data):
        user_data = validated_data
        if user_data:
            user = instance.user
            if user_data.get('password', None):
                user.set_password(user_data.get('password'))
            user.first_name = user_data.get('first_name', user.first_name)
            user.last_name = user_data.get('last_name', user.last_name)
            user.email = user_data.get('email', user.email)
            user.username = user_data.get('username', user.username)
            user.save()
        interests_data = Interest.objects.filter(id__in=validated_data.pop('interests', None))
        if interests_data:
            instance.interests.clear()
            instance.interests.add(*interests_data)
        instance.save()
        return instance