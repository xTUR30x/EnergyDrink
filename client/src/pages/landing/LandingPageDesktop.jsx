import React from 'react';
import { Header } from '../../components/header/Header';
import { HeroSection } from '../../components/landingPage/desktop/HeroSection';
import { ProductGrid } from '../../components/landingPage/desktop/ProductGrid';

export const LandingPageDesktop = () => {
  return (
    <> 
      <div className="bg-white">
        <Header />
        <HeroSection />
        <ProductGrid />
      </div>
    </>
  );
};