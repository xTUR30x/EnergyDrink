from rest_framework import serializers
from django.core.files.base import ContentFile
import base64
import uuid
import imghdr
from . import models

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.
    """

    def to_internal_value(self, data):
        if isinstance(data, str) and 'data:' in data and ';base64,' in data:
            # Split the header from the base64 content
            header, data = data.split(';base64,')
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate a file name
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = f"{file_name}.{file_extension}"

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        extension = imghdr.what(file_name, decoded_file)
        return extension if extension else 'jpg'  # Default to jpg if unknown


class FlavorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Flavor
        fields = ['flavor_id', 'flavor_name']

class CountrySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Country
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.Company
        fields = ['company_id', 'company_name']

class BeverageSerializer(serializers.ModelSerializer):
    flavor = FlavorSerializer()
    company = CompanySerializer()
    beverage_image = Base64ImageField(required=False)  # Make the image optional

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
        
    def create(self, validated_data):
        flavor_data = validated_data.pop('flavor')
        company_data = validated_data.pop('company')

        flavor, created = models.Flavor.objects.get_or_create(**flavor_data)
        company, created = models.Company.objects.get_or_create(**company_data)

        beverage = models.Beverage.objects.create(flavor=flavor, company=company, **validated_data)
        
        return beverage

    def update(self, instance, validated_data):
        flavor_data = validated_data.pop('flavor', None)
        company_data = validated_data.pop('company', None)

        instance.beverage_name = validated_data.get('beverage_name', instance.beverage_name)
        instance.beverage_stock = validated_data.get('beverage_stock', instance.beverage_stock)
        instance.beverage_price = validated_data.get('beverage_price', instance.beverage_price)
        instance.beverage_description = validated_data.get('beverage_description', instance.beverage_description)
        instance.milliliters = validated_data.get('milliliters', instance.milliliters)

        # Update the image if a new one is provided
        if 'beverage_image' in validated_data:
            instance.beverage_image = validated_data['beverage_image']

        instance.save()

        # Update or create the flavor object if provided
        if flavor_data:
            flavor_id = flavor_data.get('flavor_id')  # Use get to avoid KeyError
            if flavor_id:  # Only update if flavor_id is present
                flavor_instance, created = models.Flavor.objects.update_or_create(
                    flavor_id=flavor_id,
                    defaults={'flavor_name': flavor_data['flavor_name']}
                )

        # Update or create the company object if provided
        if company_data:
            company_id = company_data.get('company_id')  # Use get to avoid KeyError
            if company_id:  # Only update if company_id is present
                company_instance, created = models.Company.objects.update_or_create(
                    company_id=company_id,
                    defaults={'company_name': company_data['company_name']}
                )

        return instance
