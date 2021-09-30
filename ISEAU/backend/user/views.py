# from backend.backend.text import message
# from sub2.backend.fishing.serializers import ReviewSerializer
from django.core.exceptions import ValidationError
from django.http.response import JsonResponse
from django.shortcuts import redirect, render, get_object_or_404

# Create your views here.
from django.http import HttpResponseRedirect
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, UserUpdateSerializer, EmailUniqueCheckSerializer, NicknameUniqueCheckSerializer
from .models import User
from rest_framework import status
from fishing.models import Review
from fishing.serializers import ReviewSerializer
# from my_settings import EMAIL
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text


@api_view(['GET'])
def current_user(request):
    permission_classes = (permissions.AllowAny,)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class Signup(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileUpdateAPI(generics.UpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    lookup_field = "id"
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer



class Delete(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(request, user_pk):
        user = get_object_or_404(User, pk=user_pk)
        user.delete()
        return Response(user, {'id': user_pk})


class EmailUniqueCheck(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = EmailUniqueCheckSerializer
    def post(self, request, format=None):
        print(request.data)
        serializer = self.get_serializer(data=request.data) #, context={'request': request})
        if serializer.is_valid():
            return Response(data={'detail':['You can use this Email']}, status=status.HTTP_200_OK)
        else:
            detail = dict()
            detail['detail'] = serializer.errors['email']
            return Response(data=detail, status=status.HTTP_400_BAD_REQUEST)


class NicknameUniqueCheck(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = NicknameUniqueCheckSerializer

    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            return Response(data={'detail':['You can use this nickname']}, status=status.HTTP_200_OK)
        else:
            detail = dict()
            detail['detail'] = serializer.errors['nickname']
            return Response(data=detail, status=status.HTTP_400_BAD_REQUEST)


class Scrap(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, user_pk, fishing_pk):
        scrap = get_object_or_404(Scrap, pk=fishing_pk)
        user = request.user

        if scrap.scrap_user.filter(id=user_pk).exists():
            scrap.scrap_user.remove(user)
            message = '스크랩 취소'
        else:
            scrap.scrap_user.add(user)
            message = '스크랩'

        context = {'likes_count':scrap.count_likes_user(), 'message': message}

        return JsonResponse({"FishingScrapCnt": context}, status=200)


class reviewUserIdList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, userId, format=None):
        reviews = Review.objects.filter(user_id=userId)

        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

# @api_view(['GET'])
# def validate_jwt_token(request):

#     try:
#         token = request.META['HTTP_AUTHORIZATION']
#         data = {'token': token.split()[1]}
#         valid_data = VerifyJSONWebTokenSerializer().validate(data)
#     except Exception as e:
#         return Response(e)

#     return Response(status=status.HTTP_200_OK)