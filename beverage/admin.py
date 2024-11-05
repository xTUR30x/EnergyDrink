from django.contrib import admin
from .models import Beverage, Company, Flavor, Country

admin.site.register(Beverage)
admin.site.register(Flavor)
admin.site.register(Country)
admin.site.register(Company)
