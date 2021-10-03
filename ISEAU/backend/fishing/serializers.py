from rest_framework import serializers
from .models import Fishing, Review, Fish
from user.models import User
from django.db import models
# from django.db.models import fields

# 낚시터 상세 목록

class FishingSerializer(serializers.ModelSerializer):
    reviewCnt = serializers.IntegerField(default=0)
    rating = serializers.FloatField(default=0)

    class Meta:
        model = Fishing
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source="user.nickname")
    profileimg = serializers.CharField(source="user.profileimg")
    username = serializers.CharField(source="user.username")
    class Meta:
        model = Review
        fields = (
            "reviewContent",
            "rating",
            "createdAt",
            "nickname",
            "profileimg",
            "username",
        )
