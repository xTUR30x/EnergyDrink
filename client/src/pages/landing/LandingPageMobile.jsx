// src/components/LandingPageMobile.js
import React from 'react';
import { HeroSectionMobile } from '../../components/landingPage/mobile/HeroSectionMobile';
import { ProductGridMobile } from '../../components/landingPage/mobile/ProductGridMobile';
import { Header } from '../../components/header/Header';

export const LandingPageMobile = () => {
    return (
        <> 
            <div className="bg-white">
                <Header />
                <HeroSectionMobile />
                <ProductGridMobile />
            </div>
        </>
    );
};