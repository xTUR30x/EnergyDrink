// src/components/ProductCard.js
import React from 'react';
import { useUserStore } from '../../../stores/userStore';
import { addProductToCart } from '../../../api/orders/addProductToCart';

export const ProductCard = ({ beverage }) => {
    const { userId } = useUserStore(); // Obtén el userId del store

    const handleAddToCart = async () => {
        if (!userId) {
            console.error('User ID is not defined');
            return;
        }

        const { status, data } = await addProductToCart(userId, beverage.beverage_id); // Usa beverage.beverage_id

        if (status === 200) {
            // Aquí puedes manejar una respuesta exitosa, como mostrar un mensaje de éxito
            console.log('Producto agregado al carrito:', data);
        } else {
            // Manejo de errores
            console.error('Error al agregar el producto al carrito:', data);
        }
    };

    return (
        <div className="relative border rounded-lg shadow-md overflow-hidden">
            <img src={beverage.beverage_image} alt={beverage.beverage_name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{beverage.beverage_name}</h3>
                <p className="text-sm text-gray-600">Sabor: {beverage.flavor.flavor_name}</p>
                <p className="text-sm text-gray-600">Cantidad: {beverage.milliliters} ml</p>
                <p className="text-lg font-bold text-gray-800">${beverage.beverage_price}</p>
                <p className="text-sm text-gray-600">Compañía: {beverage.company.company_name}</p>
                <button 
                    onClick={handleAddToCart} 
                    className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700"
                >
                    <img src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart.png" alt="Agregar al carrito" />
                </button>
            </div>
        </div>
    );
};