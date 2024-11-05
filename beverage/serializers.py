from rest_framework import serializers
from . import models

class FlavorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Flavor
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Country
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Company
        fields = '__all__'

class BeverageSerializer(serializers.ModelSerializer):
    flavor = FlavorSerializer()
    company = CompanySerializer()

    class Meta:
        model = models.Beverage
        fields = [
            'beverage_id', 
            'beverage_name',
            'beverage_stock', 
            'beverage_price', 
            'beverage_description', 
            'milliliters',
            'beverage_image',
            'flavor', 
            'company'
            ]