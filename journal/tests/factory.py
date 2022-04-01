from django.apps import apps
import factory


class JournalFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = apps.get_model('journal', 'Journal')

    title = factory.Faker('sentence')
    description = factory.Faker('text')
    is_public = False
    created_by = factory.SubFactory('common.tests.factory.UserFactory')
    updated_by = factory.SubFactory('common.tests.factory.UserFactory')


class ChapterFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = apps.get_model('journal', 'Chapter')

    title = factory.Faker('sentence')
    description = factory.Faker('text')
    is_public = False
    created_by = factory.SubFactory('common.tests.factory.UserFactory')
    updated_by = factory.SubFactory('common.tests.factory.UserFactory')
    journal = factory.SubFactory('common.tests.factory.UserFactory')


class ChapterLikesFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = apps.get_model('journal', 'ChapterLikes')

    liked_by = factory.SubFactory('tests.factory.UserFactory')
    chapter = factory.SubFactory('tests.factory.ChapterFactory')


class ChapterViewsFactory(factory.django.DjangoModelFactory):

    class Meta:
        model = apps.get_model('journal', 'ChapterViews')

    viewed_by = factory.SubFactory('tests.factory.UserFactory')
    chapter = factory.SubFactory('tests.factory.ChapterFactory')