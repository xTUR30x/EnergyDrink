import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ beverages }) => {
    return (
        <section className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Nuestras Bebidas Energéticas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {beverages.length > 0 ? (
                    beverages.map((beverage) => (
                        <ProductCard key={beverage.beverage_id} beverage={beverage} />
                    ))
                ) : (
                    <p className="text-center col-span-full">No se encontraron bebidas.</p> 
                )}
            </div>
        </section>
    );
};