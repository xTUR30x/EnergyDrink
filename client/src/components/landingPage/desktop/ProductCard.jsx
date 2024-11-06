import React, { useState } from 'react';
import { useUserStore } from '../../../stores/userStore';
import { addProductToCart } from '../../../api/orders/addProductToCart';
import { isAuthenticated } from '../../../utils/isAuthenticated'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { FaShoppingCart, FaCheck } from 'react-icons/fa'; // Importa los íconos

export const ProductCard = ({ beverage }) => {
    const { userId } = useUserStore(); // Obtén el userId del store
    const navigate = useNavigate(); // Inicializa el hook de navegación
    const [isAnimating, setIsAnimating] = useState(false); // Estado para manejar la animación
    const [isAdded, setIsAdded] = useState(false); // Estado para manejar si el producto ha sido agregado

    const handleAddToCart = async () => {
        if (!isAuthenticated()) { 
            navigate('/login');
            return;
        }

        if (!userId) {
            console.error('User ID is not defined');
            return;
        }

        setIsAnimating(true); // Inicia la animación
        setIsAdded(true); // Cambia el estado a agregado

        const { status, data } = await addProductToCart(userId, beverage.beverage_id); // Usa beverage.beverage_id

        if (status === 200) {
            console.log('Producto agregado al carrito:', data);
        } else {
            console.error('Error al agregar el producto al carrito:', data);
        }

        setTimeout(() => {
            setIsAnimating(false); // Detiene la animación después de un tiempo
            setIsAdded(false); // Resetea el estado de agregado después de un tiempo
        }, 1000); // Duración de la animación (ajusta según sea necesario)
    };

    return (
        <div className={`relative border rounded-lg shadow-md overflow-hidden transition-transform duration-300 ${isAnimating ? 'transform -translate-y-2 scale-105' : ''}`}>
            <img src={beverage.beverage_image} alt={beverage.beverage_name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold">{beverage.beverage_name}</h3>
                <p className="text-sm text-gray-600">Sabor: {beverage.flavor.flavor_name}</p>
                <p className="text-sm text-gray-600">Cantidad: {beverage.milliliters} ml</p>
                <p className="text-lg font-bold text-gray-800">${beverage.beverage_price}</p>
                <p className="text-sm text-gray-600">Compañía: {beverage.company.company_name}</p>
                <button 
                    onClick={handleAddToCart} 
                    className={`absolute bottom-2 right-2 rounded-full p-2 transition-all duration-300 ${isAdded ? 'bg-green-500' : 'bg-blue-600'} text-white hover:bg-blue-700`}
                >
                    {isAdded ? (
                        <FaCheck className="text-white" /> // Ícono de check en blanco
                    ) : (
                        <FaShoppingCart /> // Ícono del carrito
                    )}
                </button>
            </div>
        </div>
    );
};