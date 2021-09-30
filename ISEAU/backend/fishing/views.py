from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
# import json
from django.http import Http404
from rest_framework import status
from json.decoder import JSONDecodeError
from rest_framework import permissions
from django.http.response import JsonResponse
from rest_framework.response import Response
from .models import Fishing, Scrap, Review
from user.models import User
from .serializers import FishingSerializer, ReviewSerializer
from django.db.models import Avg, Q, Sum

# Create your views here.
class fishingScrap(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, fishingId):
        try :
            user = request.user
            fishing_id = fishingId

            if not fishing_id:
                return JsonResponse({'message':'KEY_ERROR'}, status=400)

            if not Fishing.objects.filter(id=fishing_id).exists():
                return JsonResponse({'message':"FISHING_DOES_NOT_EXIST"}, status=404)
            
            fishing = Fishing.objects.get(id=fishing_id)

            if Scrap.objects.filter(user=user, fishing=fishing).exists():
                Scrap.objects.filter(user=user, fishing=fishing).delete()
                scrap_count = Scrap.objects.filter(fishing=fishing).count()
                return JsonResponse({'message': 'SUCCESS', 'scrap_count':scrap_count}, status=200)

            Scrap.objects.create(
                user    = user,
                fishing = fishing
            )
            scrap_count = Scrap.objects.filter(fishing=fishing).count()
            return JsonResponse({'message': 'SUCCESS', 'scrap_count': scrap_count}, status=200)

        except JSONDecodeError:
            return JsonResponse({'message':'JSON_DECODE_ERROR'}, status=400)


class ScrapList(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, userId, format=None):
        scrapQuery = Scrap.objects.filter(user=userId)

        serializered_data = FishingSerializer(scrapQuery, many=True).data
        for index, data in enumerate(serializered_data):
            reviewSum = Review.objects.filter(
                fishing_id=data['id']).aggregate(Sum('rating'))
            reviewCnt = Review.objects.filter(fishing_id=data['id']).count()
            rating = round(reviewSum['rating__sum']/reviewCnt, 1)
            data['reviewCnt'] = reviewCnt
            data['rating'] = rating

        return Response(serializered_data)
        
class fishingDetail(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, fishingId):
        reviewSum = Review.objects.filter(fishing_id=fishingId).aggregate(Sum('rating'))
        reviewCnt = Review.objects.filter(fishing_id=fishingId).count()
        rating = round(reviewSum['rating__sum']/reviewCnt, 1)

        fishing = Fishing.objects.filter(id=fishingId)

        serializer = FishingSerializer(fishing, many=True)
        serializer.data[0].update({'reviewCnt': reviewCnt})
        serializer.data[0].update({'rating': rating})

        return Response(serializer.data)


class reviewCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, fishingId):
        # request.data["fishing"] = fishingId
        # print(request.user)
        # request.data["user"] = request.user
        fishing = get_object_or_404(Fishing, id=fishingId)
        serializer = ReviewSerializer(data=request.data)
        print(request.user)
        if serializer.is_valid(raise_exception=True):  # 유효성 검사
            serializer.save(fishing=fishing, user=request.user)  # 저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class reviewCRUD(APIView):
    permission_classes = (permissions.AllowAny,)
    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    def put(self, request, reviewId, format=None):
        review = self.get_object(reviewId)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, reviewId, format=None):
        review = self.get_object(reviewId)
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class reviewFishingIdList(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, fishingId, format=None):
        reviews = Review.objects.filter(fishing_id=fishingId)
      
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class searchLoc(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, location):
        searchQuery = Fishing.objects.filter(address=location)

        serializered_data = FishingSerializer(searchQuery, many=True).data
        for index, data in enumerate(serializered_data):
            reviewSum = Review.objects.filter(fishing_id=data['id']).aggregate(Sum('rating'))
            reviewCnt = Review.objects.filter(fishing_id=data['id']).count()
            rating = round(reviewSum['rating__sum']/reviewCnt, 1)
            data['reviewCnt'] = reviewCnt
            data['rating'] = rating

  
        return Response(serializered_data)


