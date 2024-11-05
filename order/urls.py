from django.urls import path
from .views import PendingOrderView, UserOrdersView, AddProductToCartView, CompleteOrderView, RemoveProductFromCartView, DecreaseOrderItemView

urlpatterns = [
    path('<int:user_id>/cart/', PendingOrderView.as_view(), name='pending-order'),
    path('<int:user_id>/orders/', UserOrdersView.as_view(), name='user-orders'),
    path('<int:user_id>/add/<int:beverage_id>/', AddProductToCartView.as_view(), name='add-product-to-cart'),
    path('<int:user_id>/complete-order/', CompleteOrderView.as_view(), name='complete-order'),
    path('remove/<int:user_id>/<int:beverage_id>/', RemoveProductFromCartView.as_view(), name='remove_product_from_cart'),
    path('decrease/<int:user_id>/<int:beverage_id>/', DecreaseOrderItemView.as_view(), name='decrease-order-item'),
]
