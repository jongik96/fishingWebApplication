from django.db import models
from django.conf import settings
# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from imagekit.models import ProcessedImageField

class User(AbstractUser):
    username = models.CharField(blank=True)
    nickname = models.CharField(max_length=20, blank=True)
    address = models.CharField(max_length=100, blank=True)
    phonenumber = models.CharField(max_length=100, blank=True)
    profileimg = ProcessedImageField(
        upload_to="images/profile/",
        options={"quality": 60},
        default="default_profile.png",
    )
    introduce = models.CharField(max_length=500, blank=True)
    isadmin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

