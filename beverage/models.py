from django.db import models

class Country(models.Model):
    acronym = models.CharField(max_length=3, primary_key=True)

    def __str__(self):
        return self.acronym
    
    class Meta:
        verbose_name_plural = "Countries"


class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=255)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.company_name
    
    class Meta:
        verbose_name_plural = "Companies"
    


class Flavor(models.Model):
    flavor_id = models.AutoField(primary_key=True)
    flavor_name = models.CharField(max_length=255)
    flavor_description = models.TextField()

    def __str__(self):
        return self.flavor_name


class Beverage(models.Model):
    beverage_id = models.AutoField(primary_key=True)
    beverage_name = models.CharField(max_length=255)
    beverage_description = models.TextField()
    beverage_image = models.ImageField(upload_to='beverage_images/')
    beverage_stock = models.IntegerField()
    beverage_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    flavor = models.ForeignKey(Flavor, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    milliliters = models.FloatField()

    def __str__(self):
        return self.beverage_name