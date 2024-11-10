import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { completeOrder } from '../../api/orders/completeOrder';
import { useUserStore } from '../../stores/userStore';
import ErrorModal from '../dialogs/ErrorModal'; // Asegúrate de que la ruta sea correcta

export const CartTotal = ({ total, hasItems, onCartUpdated }) => {
    const navigate = useNavigate();
    const { userId } = useUserStore();
    const [errorMessage, setErrorMessage] = useState(null); // Estado para manejar mensajes de error

    const handleCheckout = async () => {
        if (hasItems) {
            const { status, data, error } = await completeOrder(userId); // Completar la compra

            if (status === 200) {
                console.log('Compra realizada con éxito:', data);
                onCartUpdated();
            } else if (error) {
                // Asegúrate de que el mensaje de error sea una cadena
                setErrorMessage(error.response.data.error || 'Ocurrió un error al completar la compra.');
            } else {
                console.error('Error al completar la compra:', data);
            }
        } else {
            navigate('/');
        }
    };

    const handleCloseModal = () => {
        setErrorMessage(null); // Cierra el modal al hacer clic en cerrar
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

            {/* Mostrar modal si hay un mensaje de error */}
            {errorMessage && (
                <ErrorModal message={errorMessage} onClose={handleCloseModal} />
            )}
        </div>
    );
};