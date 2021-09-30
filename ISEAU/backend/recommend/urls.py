from django.urls import path
from .views import recommendList


urlpatterns = [
    path("recommend/<int:userId>", recommendList.as_view()),
]