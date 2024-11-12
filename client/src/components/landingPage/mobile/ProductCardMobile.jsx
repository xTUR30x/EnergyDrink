import React, { useState } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { addProductToCart } from '../../../api/orders/addProductToCart';
import { isAuthenticated } from '../../../utils/isAuthenticated'; 
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

export const ProductCardMobile = ({ beverage }) => {
    const { userId } = useUserStore(); 
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAdded, setIsAdded] = useState(false); 

    const handleAddToCart = async () => {
        if (!isAuthenticated()) { 
            navigate('/login'); 
            return;
        }

        if (!userId) {
            console.error('User ID is not defined');
            return;
        }

        setIsAnimating(true); 
        setIsAdded(true); 

        const { status, data } = await addProductToCart(userId, beverage.beverage_id); 

        if (status === 200) {
            console.log('Producto agregado al carrito:', data);
        } else {
            console.error('Error al agregar el producto al carrito:', data);
        }

        setTimeout(() => {
            setIsAnimating(false); 
            setIsAdded(false); 
        }, 1000); 
    };

    return (
        <div className={`relative border rounded-lg shadow-md overflow-hidden transition-transform duration-300 ${isAnimating ? 'transform -translate-y-2 scale-105' : ''}`}>
            <img src={beverage.beverage_image} alt={beverage.beverage_name} className="w-full h-32 object-cover" />
            <div className="p-2">
                <h3 className="text-lg font-bold">{beverage.beverage_name}</h3>
                <p className="text-sm text-gray-600">Sabor: {beverage.flavor.flavor_name}</p>
                <p className="text-lg font-bold text-gray-800">${beverage.beverage_price}</p>
                <button 
                    onClick={handleAddToCart} 
                    className={`absolute bottom-2 right-2 rounded-full p-2 transition-all duration-300 ${isAdded ? 'bg-green-500' : 'bg-blue-600'} text-white hover:bg-blue-700`}
                >
                    {isAdded ? (
                        <FaCheck className="text-white" /> 
                    ) : (
                        <FaShoppingCart /> 
                    )}
                </button>
            </div>
        </div>
    );
};