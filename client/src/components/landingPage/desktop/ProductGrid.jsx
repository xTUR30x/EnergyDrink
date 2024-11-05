import React, { useEffect, useState } from 'react';
import { getAvailableBeverages } from '../../../api/bevarages/getAvailableBeverages';
import { ProductCard } from './ProductCard'

export const ProductGrid = () => {
    const [beverages, setBeverages] = useState([]);
    
    useEffect(() => {
        const fetchBeverages = async () => {
            const { data } = await getAvailableBeverages();
            if (data) {
                setBeverages(data);
            }
        };
        
        fetchBeverages();
    }, []);

    return (
        <section className="p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Nuestras Bebidas Energéticas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {beverages.map((beverage) => (
                    <ProductCard key={beverage.beverage_id} beverage={beverage} />
                ))}
            </div>
        </section>
    );
};
