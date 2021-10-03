from rest_framework import serializers
from .models import Fishing, Review, Fish
from django.db import models
# from django.db.models import fields

# 낚시터 상세 목록

class FishingSerializer(serializers.ModelSerializer):
    reviewCnt = serializers.IntegerField()
    rating = serializers.DecimalField(max_digits=2, decimal_places=1)

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
