from django.db.models import Q
from rest_framework import viewsets

# Create your views here.
from journal.models import Journal, Chapter
from journal.serializers import JournalSerializer, ChapterSerializer, \
    ChapterViewsSerializer


class JournalModelViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and creating Journal entries.
    """
    model = Journal
    serializer_class = JournalSerializer

    def get_queryset(self):
        queryset = Journal.objects.filter(
            Q(created_by=self.request.user) | Q(is_public=True)
        )
        return queryset


class ChapterModelViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and creating Journal entries.
    """
    model = Chapter
    serializer_class = ChapterSerializer

    def get_queryset(self):
        queryset = Chapter.objects.filter(
            Q(
                journal__created_by=self.request.user,
                journal=self.kwargs.get('journal_id')
            ) | Q(
                journal__is_public=True)
        ).order_by('number')
        return queryset


class ChapterViewsViewSet(viewsets.ModelViewSet):
    serializer_class = ChapterViewsSerializer

    def get_queryset(self):
        queryset = Chapter.objects.filter(
            chapter=self.kwargs.get('chapter_id')
        )
        return queryset

