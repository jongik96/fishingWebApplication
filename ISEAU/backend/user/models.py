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

# class Scrap(models.Model):
#     user = models.ForeignKey(User, related_name='userScrap', on_delete=models.CASCADE)
#     fishing = models.ForeignKey(Fishing, related_name='fishingScrap', on_delete=models.CASCADE)
#     scrap_user = models.ManyToManyField(
#         settings.AUTH_USER_MODEL, # this is preferred than just 'User'
#         blank=True, # blank is allowed
#         related_name='scrap_user'
#     ) # scrap_user field

#     def count_scrap_user(self): # total scrap_user
#         return self.scrap_user.count()

#     def __str__(self):
#         return self.title


# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance, user_pk=instance.id)


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()