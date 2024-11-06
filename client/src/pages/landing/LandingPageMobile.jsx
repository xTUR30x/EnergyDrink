import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header/Header';
import { HeroSectionMobile } from '../../components/landingPage/mobile/HeroSectionMobile';
import { ProductGridMobile } from '../../components/landingPage/mobile/ProductGridMobile';
import { getAvailableBeverages } from '../../api/bevarages/getAvailableBeverages';
import { filterBevarage } from '../../api/bevarages/filterBevarage'; 

export const LandingPageMobile = () => {
    const [products, setProducts] = useState([]); // Estado para almacenar los productos

    // Cargar todos los productos al montar el componente
    useEffect(() => {
        const fetchAllBeverages = async () => {
            const response = await getAvailableBeverages(); // Llama a la API para obtener todos los productos
            if (response.status === 200) {
                setProducts(response.data); // Almacena todos los productos
            }
        };

        fetchAllBeverages();
    }, []);

    const handleSearch = async (query, flavor_id) => {
        // Filtra los productos según la búsqueda
        const filtered = await filterBevarage(query, flavor_id);
        if (filtered.status === 200) {
            setProducts(filtered.data); // Actualiza el estado con los productos filtrados
        }
    };

    return (
        <> 
            <div className="bg-white">
                <Header onSearch={handleSearch} /> {/* Pasa la función de búsqueda al Header */}
                <HeroSectionMobile />
                <ProductGridMobile beverages={products} /> {/* Pasa los productos al ProductGridMobile */}
            </div>
        </>
    );
};