from django.db import models
from django.conf import settings
from imagekit.models import ProcessedImageField

# Create your models here.


class Fish(models.Model):
    spec = models.CharField(max_length=100)
    mean = models.CharField(max_length=100)
    celMin = models.IntegerField()
    celMax = models.IntegerField()


class Fishing(models.Model):
    name = models.CharField(max_length=100)
    pointName = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    category = models.IntegerField()
    longitude = models.CharField(max_length=100) #longitude
    latitude = models.CharField(max_length=100) #latitude
    tide = models.CharField(max_length=100)
    dpwt = models.CharField(max_length=100)
    material = models.CharField(max_length=100)
    fishingimg = ProcessedImageField(
        upload_to="images/fishing/",
        options={"quality": 60},
        default="fishingdefault.png",
    )
    obsCode = models.CharField(max_length=100)
    obsPostId = models.CharField(max_length=100)

class Scrap(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    fishing = models.ForeignKey(Fishing, on_delete=models.CASCADE)
    class Meta:
        db_table = 'scrap'


class Review(models.Model):
    fishing = models.ForeignKey(Fishing, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reviewContent = models.CharField(max_length=1000, null=True)
    rating = models.IntegerField()
    createdAt = models.DateTimeField(auto_now_add=True)
