from django.urls import path

from . import views

urlpatterns = [
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_pair'),
    path('profile/<int:user_id>/', views.UserProfileView.as_view(), name='user_profile'),
]