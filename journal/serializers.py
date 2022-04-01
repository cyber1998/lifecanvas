from rest_framework import serializers
from journal.models import Journal, Chapter, ChapterLikes, ChapterViews


class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'default': serializers.CurrentUserDefault()},
            'updated_by': {'default': serializers.CurrentUserDefault()}
        }


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'
        extra_kwargs = {
            'created_by': {'default': serializers.CurrentUserDefault()},
            'updated_by': {'default': serializers.CurrentUserDefault()}
        }

    def to_representation(self, instance):
        data = super().to_representation(instance)

        likes = ChapterLikes.objects.select_related('chapter').filter(
            chapter=instance).values_list('liked_by__username', flat=True)
        views = ChapterViews.objects.select_related('chapter').filter(
            chapter=instance).values_list('viewed_by__username', flat=True)

        data['likes'] = list(likes)
        data['views'] = list(views)

        return data

