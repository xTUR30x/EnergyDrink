// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { UserInfo } from '../../components/userProfile/UserInfo';
import { UserActions } from '../../components/userProfile/UserActions';
import { Header } from '../../components/header/Header';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { Navigate } from 'react-router-dom';
import { getUserProfile } from '../../api/accounts/getUserProfile'; // Asegúrate de que esta ruta sea correcta
import { useUserStore } from '../../stores/userStore'; // Importa tu store

export const UserProfile = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [userData, setUserData] = useState(null); // Estado para almacenar los datos del usuario
    const { accessToken, userId } = useUserStore();

    useEffect(() => {
        const isAuth = isAuthenticated();
        setAuthenticated(isAuth);
        setLoading(false); 
    }, []); 

    const fetchUserProfile = async () => {
        
        if (authenticated && accessToken) {
            try {
                const response = await getUserProfile(accessToken, userId);
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    console.error('Error al cargar los datos del perfil');
                }
            } catch (error) {
                console.error('Error en la llamada a la API:', error);
            }
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [authenticated, accessToken]); 

    // Si aún está cargando, puedes mostrar un loader o un mensaje
    if (loading) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga
    }

    // Redirige a la página de login si no está autenticado
    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>  
            <Header />
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                    <UserInfo userData={userData} /> {/* Pasa los datos del usuario a UserInfo */}
                    <UserActions />
                </div>
            </div>
        </>
    );
};