from rest_framework import viewsets, permissions
from django_filters import rest_framework as filters
from . import models, serializers

class FlavorViewSet(viewsets.ModelViewSet):
    queryset = models.Flavor.objects.all()
    serializer_class = serializers.FlavorSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = models.Company.objects.all()
    serializer_class = serializers.CompanySerializer

class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer

class BeverageViewSet(viewsets.ModelViewSet):

    queryset = models.Beverage.objects.all()
    serializer_class = serializers.BeverageSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_fields = {
        'beverage_name': ['contains'],
        'flavor': ['exact'],
        'beverage_price': ['gte', 'lte'],
    }

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            # Permitir solo acceso de lectura a todos los usuarios
            return [permissions.AllowAny()]
        else:
            # Permitir acceso a usuarios staff para modificaciones
            return [permissions.IsAdminUser()]

    def get_queryset(self):
        return models.Beverage.objects.filter(beverage_stock__gt=0)  


class StaffViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAdminUser]
    queryset = models.Beverage.objects.all()
    serializer_class = serializers.BeverageSerializer