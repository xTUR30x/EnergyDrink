import React, { useEffect, useState } from 'react';
import { CartItem } from '../../components/cart/CartItem';
import { CartTotal } from '../../components/cart/CartTotal';
import { getUserCart } from '../../api/orders/getUserCart';
import { addProductToCart } from '../../api/orders/addProductToCart';
import { discountProduct } from '../../api/orders/discountProduct'; 
import { useUserStore } from '../../stores/userStore';
import { removeFromCart } from '../../api/orders/removeFromCart'

export const Cart = () => {
    const { userId } = useUserStore();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        const { data } = await getUserCart(userId);
        if (data && data.order_items) {
            setItems(data.order_items.map(item => ({
                id: item.beverage.beverage_id,
                name: item.beverage.beverage_name,
                price: parseFloat(item.beverage.beverage_price),
                quantity: item.amount,
                img: 'http://localhost:8000/' + item.beverage.beverage_image,
            })));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const handleIncrement = async (id) => {
        const itemToUpdate = items.find(item => item.id === id);
        if (itemToUpdate) {
            // Incrementar localmente
            const updatedItems = items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            setItems(updatedItems);
            // Actualizar en el backend
            await addProductToCart(userId, itemToUpdate.id); // Usa beverage_id para agregar al carrito
        }
    };

    const handleDecrement = async (id) => {
        const itemToUpdate = items.find(item => item.id === id);
        if (itemToUpdate) {
            if (itemToUpdate.quantity > 1) {
                // Decrementar localmente
                const updatedItems = items.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
                setItems(updatedItems);
                // Actualizar en el backend
                await discountProduct(userId, itemToUpdate.id); // Usa beverage_id para decrementar
            } else {
                // Si la cantidad es 1 y se intenta decrementar, no hacemos nada o podemos mostrar un mensaje.
                console.log("No se puede disminuir más la cantidad.");
            }
        }
    };

    const handleRemove = async (id) => {
        const itemToRemove = items.find(item => item.id === id);
        if (itemToRemove) {
            await removeFromCart(userId, itemToRemove.id);
            setItems(items.filter(item => item.id !== id));
        }
    };

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Carrito de Compras</h1>
            <div className="space-y-4">
                {items.map(item => (
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        onIncrement={handleIncrement} 
                        onDecrement={handleDecrement} 
                        onRemove={handleRemove} 
                    />
                ))}
            </div>
            <CartTotal total={total} hasItems={items.length > 0} onCartUpdated={fetchCart} />
        </div>
    );
};