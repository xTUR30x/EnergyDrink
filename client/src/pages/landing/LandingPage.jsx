import React, { useState, useEffect } from 'react';
import { LandingPageMobile } from './LandingPageMobile';
import { LandingPageDesktop } from './LandingPageDesktop';

// Componente principal para alternar entre las páginas
export const LandingPage = () => {
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
      {isMobile ? <LandingPageMobile /> : <LandingPageDesktop />}
    </>
  );
};
