# from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.decorators import api_view
# from ./user/serializers import UserSerializer
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# @api_view(['GET'])
# def validate_jwt_token(request):

#     try:
#         token = request.META['HTTP_AUTHORIZATION']
#         data = {'token': token.split()[1]}
#         valid_data = VerifyJSONWebTokenSerializer().validate(data)
#     except Exception as e:
#         return Response(e)

#     return Response(status=status.HTTP_200_OK)


class Test(APIView):
    
    def get(self, request):
        bstopId = request.GET.get("stationId", None)