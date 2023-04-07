from rest_framework import routers
from userprofile import views
router = routers.SimpleRouter(trailing_slash=True)

router.register('', views.UserViewSet, basename='user')
router.register(r'^(?P<user_id>[0-9]+)/profile',
                views.UserProfileViewSet, basename='profile')

urlpatterns = router.urls