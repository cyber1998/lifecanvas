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
        related_name='associated_userprofile'
    )
    is_private = models.BooleanField(default=False)
