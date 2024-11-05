import React from 'react';

export const HeroSectionMobile = () => {
    return (
        <section className="bg-cover bg-center h-48" style={{ backgroundImage: "url('https://via.placeholder.com/800x200')" }}>
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                <h1 className="text-3xl text-white font-bold">¡Recarga tu energía!</h1>
            </div>
        </section>
    );
};