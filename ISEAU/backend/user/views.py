# from backend.backend.text import message
# from sub2.backend.fishing.serializers import ReviewSerializer
import re
from django.contrib import auth
from django.core.exceptions import ValidationError
from django.http.response import JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
# Create your views here.
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework import permissions, status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken, EmailUniqueCheckSerializer, NicknameUniqueCheckSerializer, SignupSerializer
from .models import User
from rest_framework import status
from fishing.models import Review
from fishing.serializers import ReviewSerializer
# from my_settings import EMAIL
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth.hashers import make_password
from drf_yasg.utils import swagger_auto_schema

@api_view(['GET'])
def current_user(request):
    permission_classes = (permissions.AllowAny,)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class Signup(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=SignupSerializer)
    def post(self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileUpdateAPI(generics.UpdateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def retrieve(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer = self.serializer_class(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class Delete(APIView):
    permission_classes = (permissions.AllowAny,)
    def delete(request, user_pk):
        user = get_object_or_404(User, id=user_pk)
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

class reviewUserIdList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, userId, format=None):
        reviews = Review.objects.filter(user_id=userId)

        if reviews:
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
        else:
            return HttpResponse(status=204)

class checkPassword(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, userId, format=None):
        user = User.objects.get(id=userId)
        if user.check_password(request.data['password']):
            return Response({"message": "SUCCESS"},status=200)
        else:
            return Response({"message": "ERROR"},status=400)
