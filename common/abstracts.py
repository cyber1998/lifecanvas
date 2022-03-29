from django.contrib.auth.models import User
from django.db import models


class AbstractModel(models.Model):
    """
    Common abstract model for each entity
    """
    is_active = models.BooleanField(default=True)
    
    class Meta:
        abstract = True


class AbstractTimestamp(AbstractModel):
    """
    Model to store created and updated timestamp information
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class AbstractCreator(AbstractModel):
    """
    Model to store information about who created an entity.
    """
    created_by = models.ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        help_text="Creator of this entity",
        related_name='%(app_label)s_%(class)s_created_by_user'
    )
    
    class Meta:
        abstract = True


class AbstractUpdator(AbstractModel):
    """
    Model to store information about who updated an entity.
    """
    updated_by = models.ForeignKey(
        User,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        help_text="Updator of this entity",
        related_name='%(app_label)s_%(class)s_updated_by_user'
    )
    
    class Meta:
        abstract = True
    