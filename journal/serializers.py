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
            'updated_by': {'default': serializers.CurrentUserDefault()},
            'journal': {'required': False}
        }

    def validate(self, data):
        try:
            journal = Journal.objects.get(
                id=self.context['view'].kwargs['journal_id']
            )
            data['journal'] = journal
        except Journal.DoesNotExist:
            raise serializers.ValidationError(
                'Journal does not exist.')
        if data['created_by'] != journal.created_by:
            raise serializers.ValidationError(
                'You are not allowed to create a chapter in this journal'
            )
        if data['updated_by'] != journal.created_by:
            raise serializers.ValidationError(
                'You are not allowed to update a chapter in this journal'
            )
        return data

    def to_representation(self, instance):
        data = super().to_representation(instance)

        likes = ChapterLikes.objects.select_related('chapter').filter(
            chapter=instance).values_list('liked_by__username', flat=True)
        views = ChapterViews.objects.select_related('chapter').filter(
            chapter=instance).values_list('viewed_by__username', flat=True)

        data['likes'] = list(likes)
        data['views'] = list(views)

        return data


class ChapterViewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChapterViews
        fields = ['chapter', 'viewed_by']
        extra_kwargs = {
            'viewed_by': {'default': serializers.CurrentUserDefault()},
            'chapter': {'required': False}
        }

    def validate(self, attrs):
        journal_id = self.context['view'].kwargs['journal_id']
        journal = Journal.objects.get(pk=journal_id)

        attrs['chapter_id'] = int(self.context['view'].kwargs['chapter_id'])
        viewed_by = attrs['viewed_by']
        if journal.is_public is False\
                and viewed_by != journal.created_by:
            raise serializers.ValidationError(
                'You are not allowed to view this chapter'
            )
        return attrs

