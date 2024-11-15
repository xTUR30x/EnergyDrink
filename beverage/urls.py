from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('flavors', views.FlavorViewSet)
router.register('countries', views.CountryViewSet)
router.register('companies', views.CompanyViewSet)
router.register('products', views.BeverageViewSet, basename='products')
router.register('staff', views.StaffViewSet, basename='staff')

urlpatterns = [
    path('', include(router.urls)),
]