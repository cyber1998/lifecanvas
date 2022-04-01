from rest_framework.test import APITestCase
from common.tests.factory import UserFactory
from journal.models import Journal
from journal.tests.factory import JournalFactory


class JournalTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        JournalFactory(created_by=self.user, updated_by=self.user)
        JournalFactory(created_by=self.user, updated_by=self.user)
        JournalFactory(created_by=self.user, updated_by=self.user)
        self.client.force_authenticate(user=self.user)

    def test_journal_list(self):
        response = self.client.get('/api/v1/journal/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 3)

    def test_journal_get(self):
        response = self.client.get('/api/v1/journal/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], 1)

    def test_journal_create(self):
        data = {
            'title': 'Test Journal',
            'description': 'Test Description',
            'is_public': True
        }
        response = self.client.post('/api/v1/journal/', data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], 'Test Journal')

    def test_journal_update(self):
        journal = Journal.objects.get(id=1)
        journal_title = journal.title
        data = {
            'title': 'Test Journal'
        }
        response = self.client.put('/api/v1/journal/1/', data)
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(response.data['title'], journal_title)
        self.assertEqual(response.data['title'], 'Test Journal')

    def test_journal_delete(self):
        response = self.client.delete('/api/v1/journal/1/')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Journal.objects.count(), 2)

    def test_journal_list_with_public_journals(self):
        JournalFactory(is_public=True)
        JournalFactory(is_public=True)
        response = self.client.get('/api/v1/journal/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 5)


