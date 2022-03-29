from django.contrib.auth.models import User
from django.db import models
from common.abstracts import (
    AbstractCreator,
    AbstractUpdator,
    AbstractTimestamp
)


class UserProfile(AbstractCreator, AbstractUpdator, AbstractTimestamp):
    user = models.ForeignKey(
        User,
        null=False,
        blank=False,
        help_text="The associated user",
        on_delete=models.CASCADE,
        related_name='%(app_label)s_%(class)s_associated_userprofile'
    )
    is_private = models.BooleanField(default=False)

    class Meta:
        db_table = 'user_profile'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return self.user
