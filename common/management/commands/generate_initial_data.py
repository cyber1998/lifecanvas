from django.core.management.base import BaseCommand

from common.fixtures import FixtureGenerator


class Command(BaseCommand):
    """
    This will generate data to play with.
    python manage.py generate_initial_data

    """

    def add_arguments(self, parser):
        parser.add_argument('--create_su',
                            default=True,
                            help="Automatically generate a super user")
        parser.add_argument('--number_of_users',
                            type=int,
                            nargs='?',
                            default=5,
                            help="Number of users to create by default")

    def handle(self, *args, **options):
        FixtureGenerator(
            base_users=options['number_of_users'],
            create_superuser=options['create_su'],
        )
