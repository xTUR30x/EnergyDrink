from django.db import models
from beverage.models import Beverage
from user.models import UserAccount

class Order(models.Model):
    PENDING = 0
    SHIPPED = 1
    DELIVERED = 2

    ORDER_STATES = [
        (PENDING, 'Pendiente'),
        (SHIPPED, 'Enviado'),
        (DELIVERED, 'Recibido'),
    ]

    order_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    state = models.IntegerField(choices=ORDER_STATES, default=PENDING)
    shipping_date = models.DateField(null=True, blank=True)
    delivery_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Order {self.order_id}"

class OrderItem(models.Model):
    order_item_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE) 
    beverage = models.ForeignKey(Beverage, on_delete=models.CASCADE)
    amount = models.IntegerField(null=False, default=1)

    def __str__(self):
        return f"Order Item {self.order_item_id} for Order {self.order.order_id}"
