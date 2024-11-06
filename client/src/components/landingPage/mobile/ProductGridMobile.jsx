import React from 'react';
import { ProductCardMobile } from './ProductCardMobile';

export const ProductGridMobile = ({ beverages }) => { // Acepta 'beverages' como prop
    return (
        <section className="p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Nuestras Bebidas Energéticas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {beverages.length > 0 ? ( // Verifica si hay bebidas para mostrar
                    beverages.map((beverage) => (
                        <ProductCardMobile key={beverage.beverage_id} beverage={beverage} />
                    ))
                ) : (
                    <p className="text-center col-span-full">No se encontraron bebidas.</p> // Mensaje si no hay bebidas
                )}
            </div>
        </section>
    );
};