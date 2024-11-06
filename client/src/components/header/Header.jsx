import React, { useState, useEffect } from 'react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

export const Header = ({ onSearch }) => { // Recibe onSearch como prop
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
            {isMobile ? <MobileHeader onSearch={onSearch} /> : <DesktopHeader onSearch={onSearch} />} {/* Pasa onSearch directamente */}
        </>
    );
};