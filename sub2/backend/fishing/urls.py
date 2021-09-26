from django.urls import path
from .views import ScrapList, fishingScrap, fishingDetail, reviewCreate, reviewCRUD, reviewList


urlpatterns = [
    path("scrap/list/<int:userId>/", ScrapList.as_view()),
    path("scrap/<int:fishingId>/", fishingScrap.as_view()),
    path("<int:fishingId>/", fishingDetail.as_view()),
    path("<int:fishingId>/review/list", reviewList.as_view()),
    path("<int:fishingId>/review/create", reviewCreate.as_view()),
    path("<int:fishingId>/review/<int:reviewId>", reviewCRUD.as_view()),
    path("<int:fishingId>/review/<int:reviewId>/update", reviewCRUD.as_view()),
    path("<int:fishingId>/review/<int:reviewId>/delete", reviewCRUD.as_view()),
]
