from rest_framework import routers
from journal import views
router = routers.SimpleRouter(trailing_slash=True)

router.register('', views.JournalModelViewSet, basename='journal')
router.register(r'^(?P<journal_id>[0-9]+)/chapter',
                views.ChapterModelViewSet, basename='chapter')
router.register(r'^(?P<journal_id>[0-9]+)/chapter/(?P<chapter_id>[0-9]+)/view',
                views.ChapterViewsViewSet, basename='chapter_views')

urlpatterns = router.urls