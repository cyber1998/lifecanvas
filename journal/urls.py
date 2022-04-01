from rest_framework import routers
from journal import views
router = routers.DefaultRouter(trailing_slash=True)

router.register('', views.JournalModelViewSet, basename='journal')
router.register('chapter', views.ChapterModelViewSet, basename='chapter')

urlpatterns = router.urls