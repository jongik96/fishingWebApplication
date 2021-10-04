from rest_framework import serializers
from .models import Fishing, Review, Fish
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
    profileimg = serializers.ImageField(source="user.profileimg", required=False)
    nickname = serializers.CharField(source="user.nickname", required=False)
    username = serializers.CharField(source="user.username")

    class Meta:
        model = Review
        fields = (
            "id",
            "reviewContent",
            "rating",
            "createdAt",
            "nickname",
            "profileimg",
            "username",
        )

class ReviewUpdateSerializer(serializers.ModelSerializer):
    profileimg = serializers.ImageField(required=False)
    nickname = serializers.CharField(required=False)
    username = serializers.CharField()

    class Meta:
        model = Review
        fields = (
            "id",
            "reviewContent",
            "rating",
            "createdAt",
            "nickname",
            "profileimg",
            "username",
        )


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = (
            "reviewContent",
            "rating",
        )



class CategorySerializer(serializers.ModelSerializer):
    reviewCnt = serializers.IntegerField()
    rating = serializers.DecimalField(max_digits=2, decimal_places=1)

    class Meta:
        model = Fishing
        fields = "__all__"
