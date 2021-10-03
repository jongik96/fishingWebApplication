from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
# import json
from django.http import Http404, HttpResponse
from rest_framework import status
from json.decoder import JSONDecodeError
from rest_framework import permissions
from django.http.response import JsonResponse
from rest_framework.response import Response
from .models import Fishing, Scrap, Review
from user.models import User
from .serializers import FishingSerializer, ReviewSerializer
from django.db.models import Avg, Q, Sum
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema


#  Create your views here.
# @authentication_classes([JSONWebTokenAuthentication])
class fishingScrap(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = (permissions.AllowAny,)
    def post(self, request, fishingId):
        try :
            user = request.user
            fishing_id = fishingId

            if not fishing_id:
                return JsonResponse({'message':'KEY_ERROR'}, status=400)

            if not Fishing.objects.filter(id=fishing_id).exists():
                return JsonResponse({'message':"FISHING_DOES_NOT_EXIST"}, status=404)
            

            if Scrap.objects.filter(user_id=user.id, fishing_id=fishing_id).exists():
                print('mmmmmmmmmm', user.id)
                Scrap.objects.filter(user_id=user.id, fishing_id=fishing_id).delete()
                scrap_count = Scrap.objects.filter(fishing_id=fishing_id).count()
                return JsonResponse({'message': 'SUCCESS delete', 'scrap_count':scrap_count}, status=200)
            else:
                Scrap.objects.create(user_id=user.id, fishing_id=fishing_id)
                scrap_count = Scrap.objects.filter(fishing_id=fishing_id).count()
                return JsonResponse({'message': 'SUCCESS create', 'scrap_count': scrap_count}, status=200)

        except JSONDecodeError:
            return JsonResponse({'message':'JSON_DECODE_ERROR'}, status=400)


class ScrapList(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, userId, format=None):
        scrapQuery = Scrap.objects.filter(user_id=userId).values()
        fishing_ids = []
        for i in scrapQuery:
            fishing_ids.append(i["fishing_id"])
        
        fishings = Fishing.objects.filter(id__in=fishing_ids)
        print(fishings)
        if fishings:
            serializered_data = FishingSerializer(fishings, many=True).data
            for index, data in enumerate(serializered_data):
                reviewSum = Review.objects.filter(
                    fishing_id=data['id']).aggregate(Sum('rating'))
                reviewCnt = Review.objects.filter(fishing_id=data['id']).count()
                rating = round(reviewSum['rating__sum']/reviewCnt, 1)
                data['reviewCnt'] = reviewCnt
                data['rating'] = rating

            return Response(serializered_data)
        else:
            return Response({'message': '해당 유저의 Scrap이 없습니다.'}, status=204)

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

    @swagger_auto_schema(request_body=ReviewSerializer)
    def post(self, request, fishingId):
        review = Review.objects.filter(
            fishing_id=fishingId, user_id=request.user)
        if review:
            return Response({'message': '이미 생성된 Review가 있습니다!'}, status=400)
        else:
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

    def put(self, request, fishingId, reviewId, format=None):
        review = self.get_object(reviewId)
        request.data["fishing"] = fishingId
        request.data["user"] = request.user.id
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, fishingId, reviewId, format=None):
        review = self.get_object(reviewId)
        review.delete()
        return Response({'deleted reviewId' : reviewId}, status=status.HTTP_204_NO_CONTENT)


class reviewFishingIdList(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, fishingId, format=None):
        reviews = Review.objects.filter(fishing_id=fishingId)
        if reviews:
            serializer = ReviewSerializer(reviews, many=True)

            return Response(serializer.data)
        else:
            return HttpResponse(status=204)

class searchLoc(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, location):
        searchQuery = Fishing.objects.filter(address=location)
        if searchQuery:
            serializered_data = FishingSerializer(searchQuery, many=True).data

            for index, data in enumerate(serializered_data):
                reviewSum = Review.objects.filter(
                    fishing_id=data['id']).aggregate(Sum('rating'))
                if Review.objects.filter(fishing_id=data['id']).count():
                    reviewCnt = Review.objects.filter(
                        fishing_id=data['id']).count()
                    rating = round(reviewSum['rating__sum']/reviewCnt, 1)
                    data['reviewCnt'] = reviewCnt
                    data['rating'] = rating
                else:
                    data['reviewCnt'] = 0
                    data['rating'] = 0

            return Response(serializered_data)
        else:
            return HttpResponse(status=204)

class autoLoc(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, location):
        searchQuery = Fishing.objects.filter(address__icontains=location)
        if searchQuery:
            serializered_data = FishingSerializer(searchQuery, many=True).data

            for index, data in enumerate(serializered_data):
                reviewSum = Review.objects.filter(fishing_id=data['id']).aggregate(Sum('rating'))
                if Review.objects.filter(fishing_id=data['id']).count():
                    reviewCnt = Review.objects.filter(fishing_id=data['id']).count()
                    rating = round(reviewSum['rating__sum']/reviewCnt, 1)
                    data['reviewCnt'] = reviewCnt
                    data['rating'] = rating
                else:
                    data['reviewCnt'] = 0
                    data['rating'] = 0

            return Response(serializered_data)
        else:
            return HttpResponse(status=204)
