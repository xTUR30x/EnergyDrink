import React from 'react';
import { useNavigate } from 'react-router-dom';
import { completeOrder } from '../../api/orders/completeOrder';
import { useUserStore } from '../../stores/userStore';

export const CartTotal = ({ total, hasItems, onCartUpdated }) => {
    const navigate = useNavigate();
    const { userId } = useUserStore();

    const handleCheckout = async () => {
        if (hasItems) {
            const { status, data } = await completeOrder(userId); // Completar la compra

            if (status === 200) {
                console.log('Compra realizada con éxito:', data);
                
                onCartUpdated();
            } else {
                console.error('Error al completar la compra:', data);
            }
        } else {
            navigate('/');
        }
    };

    return (
        <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold text-gray-800">Total: ${total.toFixed(2)}</h2>
            <button 
                onClick={handleCheckout} 
                className={`py-2 px-4 rounded ${hasItems ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-red-500 hover:bg-red-700 text-white'}`}
            >
                {hasItems ? 'Realizar Compra' : 'Agregar Productos'}
            </button>
        </div>
    );
};