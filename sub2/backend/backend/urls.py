"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
# from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
# from .views import validate_jwt_token
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.permissions import AllowAny

schema_view = get_schema_view(
    openapi.Info(
        title="Bigdata Project", # 타이틀
        default_version='v1', # 버전
        description="프로젝트 API 문서", # 설명
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="이메일"),
        license=openapi.License(name=""),
    ),
    # validators=['flex'],
    public=True,
    permission_classes=(AllowAny,)
)

urlpatterns = [
    path("admin/", admin.site.urls),    
    url(r'swagger(?P<format>\.json|\.yaml)', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'swagger', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(r'redoc', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc-v1'),
    # django 앱 
    path('user/', include('user.urls')),
    path('fishing/', include('fishing.urls')),
]
urlpatterns += \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)