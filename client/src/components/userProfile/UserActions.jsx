import React from 'react';
import { BsCartCheckFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'; 
import { useUserStore } from '../../stores/userStore'; 

export const UserActions = () => {
    const navigate = useNavigate(); // Inicializa el hook para la navegación
    const clearUserData = useUserStore((state) => {
        return {
            setAccessToken: state.setAccessToken,
            setRefreshToken: state.setRefreshToken,
            setUserId: state.setUserId,
            setIsStaff: state.setIsStaff
        };
    });

    const handleLogout = () => {
        // Limpia los valores del store
        clearUserData.setAccessToken('');
        clearUserData.setRefreshToken('');
        clearUserData.setUserId('');
        clearUserData.setIsStaff(false);
        
        // Redirige a la página de login
        navigate('/login');
    };

    return (
        <div className="mt-6 flex space-x-4">
            <button onClick={handleLogout} className="flex items-center text-blue-500 hover:text-blue-700">
                <IoLogOut />
                <span>Logout</span>
            </button>
            <Link to="/orders" className="flex items-center text-blue-500 hover:text-blue-700">
                <BsCartCheckFill />
                <span>View Orders</span>
            </Link>
        </div>
    );
};