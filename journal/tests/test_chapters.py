from rest_framework.test import APITestCase
from common.tests.factory import UserFactory
from journal.models import Chapter
from journal.tests.factory import ChapterFactory, JournalFactory


class JournalTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.journal = JournalFactory(created_by=self.user)
        ChapterFactory(created_by=self.user, updated_by=self.user, journal=self.journal)
        ChapterFactory(created_by=self.user, updated_by=self.user, journal=self.journal)
        ChapterFactory(created_by=self.user, updated_by=self.user, journal=self.journal)
        self.client.force_authenticate(user=self.user)

    def test_chapter_list(self):
        response = self.client.get(f'/api/v1/journal/{self.journal.pk}/chapter/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 3)

    def test_chapter_get(self):
        response = self.client.get(f'/api/v1/journal/{self.journal.pk}/chapter/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], 1)

    def test_chapter_create(self):
        data = {
            'title': 'Test Chapter',
            'description': 'Test Description',
            'is_public': True,
            'number': 3,
            'body': 'Test Body'
        }
        response = self.client.post(f'/api/v1/journal/{self.journal.pk}/chapter/', data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], 'Test Chapter')

    def test_chapter_created_by_another_user(self):
        user = UserFactory()
        self.client.force_authenticate(user=user)
        data = {
            'title': 'Test Chapter',
            'description': 'Test Description',
            'is_public': True,
            'number': 3,
            'body': 'Test Body'
        }
        response = self.client.post(
            f'/api/v1/journal/{self.journal.pk}/chapter/', data)
        self.assertEqual(response.status_code, 400)

    def test_chapter_update(self):
        chapter = Chapter.objects.get(id=1)
        chapter_title = chapter.title
        data = {
            'title': 'Test Chapter',
            'number': 3,
            'body': 'Test Body'
        }
        response = self.client.put(f'/api/v1/journal/{self.journal.pk}/chapter/1/', data)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data['title'], chapter_title)
        self.assertEqual(response.data['title'], 'Test Chapter')

    def test_chapter_updated_by_another_user(self):
        user = UserFactory()
        self.client.force_authenticate(user=user)
        data = {
            'title': 'Test Chapter',
            'number': 3,
            'body': 'Test Body'
        }
        response = self.client.put(
            f'/api/v1/journal/{self.journal.pk}/chapter/1/', data
        )
        self.assertEqual(response.status_code, 404)

    def test_chapter_delete(self):
        response = self.client.delete(f'/api/v1/journal/{self.journal.pk}/chapter/1/')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Chapter.objects.count(), 2)
