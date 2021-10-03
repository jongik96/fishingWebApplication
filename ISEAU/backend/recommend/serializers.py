from rest_framework import serializers
# from django.contrib.auth import get_user_model
from fishing.models import Fishing

# class RecommendSerializer(serializers.ModelSerializer):
#     reviewCnt = serializers.IntegerField(default=0)
#     rating = serializers.FloatField(default=0)

#     class Meta:
#         model = Fishing
#         fields = "__all__"


class RecommendSerializer(serializers.ModelSerializer):
    reviewCnt = serializers.IntegerField(default=0)
    rating = serializers.FloatField(default=0)
    class Meta:
        model = Fishing
        fields = "__all__"
