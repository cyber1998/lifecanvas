from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class AbstractTimestamp(models.Model):
    """
    Model to store created and updated timestamp information
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class AbstractCreator(models.Model):
    """
    Model to store information about who created an entity.
    """
    created_by = models.ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        help_text="Creator of this entity"
    )


class AbstractUpdator(models.Model):
    """
    Model to store information about who updated an entity.
    """
    updated_by = models.ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        help_text="Updator of this entity"
    )
