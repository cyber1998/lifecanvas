from django.urls import path
from rest_framework import routers
from userprofile import views
router = routers.SimpleRouter(trailing_slash=True)

router.register('list', views.UserViewSet, basename='user')
router.register(r'^(?P<user_id>[0-9]+)/profile',
                views.UserProfileViewSet, basename='profile')

urlpatterns = router.urls

# Django templates
urlpatterns += [
    path("user_list/", views.user_list, name="user_list"),
]