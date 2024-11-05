from .models import OrderItem

class OrderItemManager:
    @staticmethod
    def decrease_order_item_quantity(order_item):
        """Disminuye la cantidad de un OrderItem en uno."""
        if order_item.amount > 1:
            order_item.amount -= 1
            order_item.save()
        elif order_item.amount == 1:
            order_item.delete()  # Elimina el OrderItem si la cantidad llega a 0
        else:
            raise ValueError("No se puede disminuir la cantidad, ya es cero.")
