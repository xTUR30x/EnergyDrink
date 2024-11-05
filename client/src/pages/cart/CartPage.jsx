import React, { useState, useEffect } from 'react';
import { Cart } from './Cart';
import { Header } from '../../components/header/Header';

// Componente principal para alternar entre las páginas
export const CartPage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Header/>
      <Cart/>
    </>
  );
};
