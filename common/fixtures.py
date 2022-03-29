import faker
from django.apps import apps
from django.contrib.auth.models import User

from journal.models import Journal, Chapter
from lifecanvas.settings import PROJECT_APPS


class FixtureGenerator:
    def __init__(self, create_superuser=False, base_users=1, create_journal=True):
        self.create_superuser = create_superuser
        self.base_users = base_users
        self.create_journal = create_journal

        self.initiate_generator()

    def initiate_generator(self):
        """
        Initiate the generator and create the fixtures. This will delete all
        existing data.
        """
        self.delete_all()
        self.create_su()
        self.create_users()
        self.create_journals()

    def create_su(self):
        """
        Create a superuser.
        """
        if self.create_superuser:
            su = User.objects.create(
                username='admin',
                is_superuser=True,
                is_staff=True
            )
            su.set_password('admin')
            su.save()
            self.admin = su

    def create_users(self):
        """
        Creates a number of users.
        """
        for i in range(self.base_users):
            username = faker.Faker().user_name() + "_" + str(i)
            user = User(
                username=username,
                first_name=faker.Faker().first_name(),
                last_name=faker.Faker().last_name(),
                email=f'{username}@example.com',
                is_staff=False,
                is_superuser=False
            )
            user.save()

    def create_journals(self):
        """
        Create a journal and its chapters.
        """
        if self.create_journal:
            for user in User.objects.filter(is_staff=False):
                title = faker.Faker().text(max_nb_chars=50)
                journal = Journal.objects.create(
                    title=title,
                    created_by=self.admin,
                    updated_by=self.admin
                )
                for i in range(2):
                    chapter = Chapter.objects.create(
                        title=f'Chapter {i}',
                        body=faker.Faker().text(),
                        number=i,
                        journal=journal,
                        created_by=self.admin,
                        updated_by=self.admin
                    )

    def delete_all(self):
        """
        This will delete all objects created using fixture
        :return:
        """

        for app in PROJECT_APPS + ['auth']:
            app_models = apps.get_app_config(app).get_models()
            for Model in app_models:
                try:
                    Model.objects.all().delete()
                except Exception as e:
                    raise e