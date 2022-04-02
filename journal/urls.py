from rest_framework import routers
from journal import views
router = routers.SimpleRouter(trailing_slash=True)

router.register('', views.JournalModelViewSet, basename='journal')
router.register(r'^(?P<journal_id>[0-9]+)/chapter', views.ChapterModelViewSet, basename='chapter')

urlpatterns = router.urls