from django.contrib.auth.models import User
from django.db import models
from common.abstracts import (
    AbstractTimestamp,
    AbstractModel
)

class Interest(AbstractModel):
    name = models.CharField(max_length=128)

    class Meta:
        db_table = 'interest'
        verbose_name = 'Interest'
        verbose_name_plural = 'Interests'

    def __str__(self):
        return self.name


class UserProfile(AbstractTimestamp):
    user = models.ForeignKey(
        User,
        null=False,
        blank=False,
        help_text="The associated user",
        on_delete=models.CASCADE,
        related_name='%(app_label)s_%(class)s_associated_userprofile'
    )
    is_private = models.BooleanField(default=False)
    interests = models.ManyToManyField(Interest, related_name='interests')

    class Meta:
        db_table = 'user_profile'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return self.user.first_name
