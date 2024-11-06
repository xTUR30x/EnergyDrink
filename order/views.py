from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem, Beverage
from .serializers import OrderSerializer, OrderItemSerializer
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db import transaction
from .utils import OrderItemManager

class PendingOrderView(generics.GenericAPIView):

    def get(self, request, user_id):
        order, created = Order.objects.get_or_create(customer_id=user_id, state=Order.PENDING)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

class UserOrdersView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        orders = Order.objects.filter(customer_id=user_id, state__in=[Order.SHIPPED, Order.DELIVERED])
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

class AddProductToCartView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, beverage_id):
        order, created = Order.objects.get_or_create(customer_id=user_id, state=Order.PENDING)
        beverage = get_object_or_404(Beverage, pk=beverage_id)

        order_item, created = OrderItem.objects.get_or_create(order=order, beverage=beverage)
        
        if not created:
            order_item.amount += 1
            order_item.save()

        serializer = OrderItemSerializer(order_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CompleteOrderView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        order = get_object_or_404(Order, customer_id=user_id, state=Order.PENDING)

        with transaction.atomic():
            for item in order.order_items.all():
                if item.beverage.beverage_stock < item.amount:
                    return Response({
                        "error": f"No hay suficiente stock para {item.beverage.beverage_name}. Cantidad disponible: {item.beverage.beverage_stock}"
                    }, status=status.HTTP_400_BAD_REQUEST)

            # Descontar el stock de cada bebida
            for item in order.order_items.all():
                item.beverage.beverage_stock -= item.amount
                item.beverage.save()

            # Cambiar el estado de la orden a enviado
            order.state = Order.SHIPPED
            order.shipping_date = timezone.now().date()
            order.delivery_date = timezone.now().date() + timezone.timedelta(days=2)
            order.save()

        return Response(OrderSerializer(order).data, status=status.HTTP_200_OK)
    
class RemoveProductFromCartView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]
    
    def delete(self, request, user_id, beverage_id):
        order = get_object_or_404(Order, customer_id=user_id, state=Order.PENDING)
        order_item = get_object_or_404(OrderItem, order=order, beverage_id=beverage_id)

        order_item.delete()
        return Response({'message': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)


class DecreaseOrderItemView(generics.GenericAPIView):

    permission_classes = [IsAuthenticated]
    
    def post(self, request, user_id, beverage_id):
        # Obtener la orden pendiente del usuario
        order = get_object_or_404(Order, customer_id=user_id, state=Order.PENDING)

        # Obtener el OrderItem correspondiente
        order_item = get_object_or_404(OrderItem, order=order, beverage_id=beverage_id)

        try:
            # Disminuir la cantidad del OrderItem
            OrderItemManager.decrease_order_item_quantity(order_item)
            return Response({'message': 'Cantidad disminuida exitosamente.'}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)