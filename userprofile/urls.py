from django.urls import path
from rest_framework import routers
from userprofile import views
router = routers.SimpleRouter(trailing_slash=True)

router.register('', views.UserViewSet, basename='user')
router.register('', views.UserProfileViewSet, basename='user_profile')

urlpatterns = router.urls
