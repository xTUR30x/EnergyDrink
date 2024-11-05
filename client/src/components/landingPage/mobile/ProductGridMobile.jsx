import React, { useEffect, useState } from 'react';
import { getAvailableBeverages } from '../../../api/bevarages/getAvailableBeverages';
import { ProductCardMobile } from './ProductCardMobile';

export const ProductGridMobile = () => {
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
        <section className="p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Nuestras Bebidas Energéticas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {beverages.map((beverage) => (
                    <ProductCardMobile key={beverage.beverage_id} beverage={beverage} />
                ))}
            </div>
        </section>
    );
};