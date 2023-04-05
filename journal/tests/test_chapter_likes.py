from rest_framework.test import APITestCase

from common.tests.factory import UserFactory
from journal.tests.factory import JournalFactory, ChapterFactory, \
    ChapterLikesFactory


class ChapterLikesTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.journal = JournalFactory(created_by=self.user)
        self.chap1 = ChapterFactory(created_by=self.user, updated_by=self.user,
                       journal=self.journal)
        self.chap2 = ChapterFactory(created_by=self.user, updated_by=self.user,
                       journal=self.journal)
        self.client.force_authenticate(user=self.user)

    def test_get_chapter_likes_list(self):
        # Create 2 chapter likes for the user
        ChapterLikesFactory(chapter=self.chap1, liked_by=self.user)
        ChapterLikesFactory(chapter=self.chap2, liked_by=self.user)
        response = self.client.get(
            f'/api/v1/journal/{self.journal.pk}/chapter/{self.chap1.pk}/'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['likes']), 1)

        response = self.client.get(
            f'/api/v1/journal/{self.journal.pk}/chapter/{self.chap2.pk}/'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['likes']), 1)

    def test_create_chapter_like_for_chapter_creator(self):
        response = self.client.post(
            f'/api/v1/journal/{self.journal.pk}/chapter/{self.chap1.pk}/like/'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['chapter'], self.chap1.pk)
        self.assertEqual(response.data['liked_by'], self.user.pk)

    def test_create_chapter_like_for_non_public_journal_but_same_user(self):
        journal = JournalFactory(is_public=False, created_by=self.user)
        chap = ChapterFactory(created_by=self.user, updated_by=self.user)
        response = self.client.post(
                f'/api/v1/journal/{journal.pk}/chapter/{chap.pk}/like/'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['chapter'], chap.pk)
        self.assertEqual(response.data['liked_by'], self.user.pk)

    def test_create_chapter_like_for_non_public_journal_but_different_user(self):
        journal = JournalFactory(is_public=False, created_by=self.user)
        chap = ChapterFactory(created_by=self.user, updated_by=self.user)
        user = UserFactory()
        self.client.force_authenticate(user=user)
        response = self.client.post(
                f'/api/v1/journal/{journal.pk}/chapter/{chap.pk}/like/'
        )
        self.assertEqual(response.status_code, 400)
