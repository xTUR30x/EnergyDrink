// src/components/CartItem.js
import React from 'react';
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

export const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
    return (
        <div className="flex justify-between items-center border-b pb-4">
            <img src={ item.img } alt={ item.name } className="w-16 h-16 rounded-lg" />
            <div className="flex-1 mx-4">
                <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center">
                <button onClick={() => onDecrement(item.id)} className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-400">
                    <FaMinus />
                </button>
                <input type="number" min="1" value={item.quantity} className="w-12 text-center mx-2 border text-black border-gray-300 rounded-lg" readOnly />
                <button onClick={() => onIncrement(item.id)} className="h-8 w-8 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-400">
                    <FaPlus />
                </button>
                <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};