from rest_framework.test import APITestCase
from common.tests.factory import UserFactory
from journal.models import Chapter
from journal.tests.factory import ChapterFactory, JournalFactory


class UserTestCase(APITestCase):

    def setUp(self):
        self.user = UserFactory()
        self.client.force_authenticate(user=self.user)

    def test_user_list(self):
        UserFactory.create_batch(4)
        response = self.client.get(f'/api/v1/user/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 5)

    def test_user_get(self):
        response = self.client.get(f'/api/v1/user/{self.user.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], self.user.id)

    def test_user_create(self):
        data = {
            'username': 'user-1',
            'first_name': 'User',
            'last_name': 'One',
        }
        response = self.client.post(f'/api/v1/user/', data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['username'], 'user-1')


    def test_user_edit(self):
        user = UserFactory(first_name='Ian', last_name='Gastovsky')
        data = {
            'username': user.username,
            'first_name': 'John',
            'last_name': 'Gastovski',
        }
        response = self.client.put(f'/api/v1/user/{user.id}/', data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['first_name'], 'John')
        self.assertEqual(response.data['last_name'], 'Gastovski')

    def test_user_delete(self):
        user = UserFactory(first_name='James', last_name='Gatsby')
        response = self.client.delete(f'/api/v1/user/{user.id}/')
        self.assertEqual(response.status_code, 204)