// src/components/CartPage.js
import React, { useState, useEffect } from 'react';
import { Cart } from './Cart';
import { Header } from '../../components/header/Header';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { Navigate } from 'react-router-dom'; 

// Componente principal para alternar entre las páginas
export const CartPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // Verifica si el usuario está autenticado
    const checkAuthentication = () => {
      const isAuth = isAuthenticated(); // Verifica la autenticación
      setAuthenticated(isAuth);
      setLoading(false); // Cambia el estado de carga una vez que se verifica la autenticación
    };

    checkAuthentication(); // Llama a la función para verificar autenticación
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Si aún está cargando, puedes mostrar un loader o un mensaje
  if (loading) {
    return <div>Cargando...</div>; // O cualquier otro indicador de carga
  }

  return (
    <>
        {authenticated ? (
            <>
                <Header />
                <Cart />
            </>
        ) : (
            <Navigate to="/login" />
        )}
    </>
  );
};