from django.db import models

from common.abstracts import AbstractUpdator, AbstractTimestamp, AbstractCreator


class Journal(AbstractCreator, AbstractTimestamp, AbstractUpdator):
    """
    A journal is a collection of chapters in a specific order.
    """
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    is_public = models.BooleanField(default=False)

    class Meta:
        db_table = 'journal'
        verbose_name = 'Journal'
        verbose_name_plural = 'Journals'

    def __str__(self):
        return self.title


class Chapter(AbstractCreator, AbstractTimestamp, AbstractUpdator):
    """
    A chapter is a single story in the journal that has a specific purpose
    and order.
    """
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    body = models.TextField()
    number = models.IntegerField()
    previous_chapter = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_previous_chapter')
    next_chapter = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='%(app_label)s_%(class)s_next_chapter')
    journal = models.ForeignKey(Journal, on_delete=models.CASCADE,
                                related_name='%(app_label)s_%(class)s_chapters')

    class Meta:
        db_table = 'chapter'
        verbose_name = 'Chapter'
        verbose_name_plural = 'Chapters'

    def __str__(self):
        return self.title


class ChapterViews(models.Model):
    viewed_by = models.ForeignKey('auth.User', on_delete=models.CASCADE,
                                  related_name='%(app_label)s_%(class)s_viewed_by')
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE,
                                related_name='%(app_label)s_%(class)s_views')

    class Meta:
        db_table = 'chapter_view'
        verbose_name = 'Chapter View'
        verbose_name_plural = 'Chapter Views'


class ChapterLikes(models.Model):
    liked_by = models.ForeignKey('auth.User', on_delete=models.CASCADE,
                                 related_name='%(app_label)s_%(class)s_liked_by')
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE,
                                related_name='%(app_label)s_%(class)s_likes')

    class Meta:
        db_table = 'chapter_like'
        verbose_name = 'Chapter Like'
        verbose_name_plural = 'Chapter Likes'
        unique_together = ('liked_by', 'chapter')
