from rest_framework import serializers
from . import models
from beverage.serializers import BeverageSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    beverage = BeverageSerializer(read_only=True)
    
    class Meta:
        model = models.OrderItem
        fields = ['order_item_id', 'beverage', 'amount']

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()  # Campo para el precio total

    class Meta:
        model = models.Order
        fields = ['order_id', 'customer', 'state', 'shipping_date', 'delivery_date', 'order_items', 'total_price']

    def get_total_price(self, obj):
        total = sum(item.beverage.beverage_price * item.amount for item in obj.order_items.all())
        return total