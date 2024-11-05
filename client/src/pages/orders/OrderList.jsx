// src/components/OrderList.js
import React, { useState } from 'react';

export const OrderList = ({ orders }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow rounded-lg">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-black">Órdenes del Cliente</h2>
                </div>
                <div className="divide-y">
                    {orders.map(order => (
                        <OrderItem key={order.order_id} order={order} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const OrderItem = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="py-6 cursor-pointer" onClick={toggleDetails}> 
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                    <span className="text-blue-600 font-semibold p-4">Orden ID: #{order.order_id}</span>
                    <span className="ml-2 text-sm text-gray-500">Estado: {order.state === 1 ? 'Enviado' : 'Recibido'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 ${order.state === 0 ? 'text-green-500' : 'text-red-500'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 1a9 9 0 100-18 9 9 0 000 18zm-.86-6.44a.75.75 0 01-1.2-.46A4.75 4.75 0 0110.8 10a.75.75 0 01-1.66.14z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="font-bold text-gray-800 p-4">${order.total_price}</span>
            </div>
            {isOpen && (
                <div className="flex-col mt-2 pl-4">
                    <p className="text-sm text-gray-600 pl-2">Fecha de Envío: {new Date(order.shipping_date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600 pl-2">Fecha de Entrega: {new Date(order.delivery_date).toLocaleDateString()}</p>
                    <ul className="mt-2">
                        {order.order_items.map(item => (
                            <li key={item.order_item_id} className="border-b p-2 text-black">
                                {item.beverage.beverage_name} | Cantidad: {item.amount} | Precio: ${parseFloat(item.beverage.beverage_price) * item.amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};