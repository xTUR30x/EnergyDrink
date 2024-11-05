// src/components/ProductCardMobile.js
import React from 'react';

export const ProductCardMobile = ({ beverage }) => {
    return (
        <div className="relative border rounded-lg shadow-md overflow-hidden">
            <img src={beverage.beverage_image} alt={beverage.beverage_name} className="w-full h-32 object-cover" />
            <div className="p-2">
                <h3 className="text-lg font-bold">{beverage.beverage_name}</h3>
                <p className="text-sm text-gray-600">Sabor: {beverage.flavor.flavor_name}</p>
                <p className="text-lg font-bold text-gray-800">${beverage.beverage_price}</p>
                <button className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                    <img src="https://img.icons8.com/material-outlined/24/ffffff/shopping-cart.png" alt="Agregar al carrito" />
                </button>
            </div>
        </div>
    );
};