from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

from . import serializers, models

User = get_user_model()

class LogoutView(APIView):
    #permission_classes = [AllowAny,]

    def post(self, request):
        serializer = serializers.LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token = RefreshToken(serializer.validated_data['refresh'])
        token.blacklist()

        return Response(status=status.HTTP_204_NO_CONTENT)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.CustomTokenObtainPairSerializer

class UserProfileView(generics.GenericAPIView):
    #permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        try:
            user = models.UserAccount.objects.get(id=user_id)  # Cambiar a UserAccount
        except models.UserAccount.DoesNotExist:
            raise NotFound("User not found.")

        serializer = serializers.UserCreateSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class NonAdminUserListView(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        # Filtrar usuarios que no son administradores
        non_admin_users = models.UserAccount.objects.exclude(is_superuser=True).values('id', 'first_name', 'last_name')

        return Response(non_admin_users, status=status.HTTP_200_OK)