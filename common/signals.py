from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from userprofile.models import UserProfile


@receiver(post_save, sender=User, dispatch_uid="create_user_profile")
def create_user_profile(sender, instance, *args, **kwargs):
    """
    Create a UserProfile object when a new User object is created.
    """
    UserProfile.objects.create(user=instance)


post_save.connect(
    create_user_profile,
    sender=User,
    dispatch_uid='create_user_profile'
)