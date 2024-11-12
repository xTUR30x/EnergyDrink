// src/pages/StaffPage.js
import React, { useEffect, useState } from 'react';
import { ProductManager } from './ProductManager';
import { Header } from '../../components/header/Header';
import { getProducts } from '../../api/staff/getProducts'; 
import { getFlavors } from '../../api/bevarages/getFlavors'; 
import { getCompanies } from '../../api/bevarages/getCompanies'; 
import { useUserStore } from '../../stores/userStore';
import { AddProductModal } from '../../components/dialogs/AddProductModal'; 
import { Link, Navigate } from 'react-router-dom'; 
import { isAuthenticated } from '../../utils/isAuthenticated'; 

export const StaffPage = () => {
    const [products, setProducts] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [flavors, setFlavors] = useState([]); 
    const [companies, setCompanies] = useState([]); 
    const { accessToken } = useUserStore.getState(); 

    // Verifica si el usuario está autenticado
    const authenticated = isAuthenticated();

    useEffect(() => {
        const fetchProducts = async () => {
            const { status, data, error } = await getProducts(accessToken); // Obtiene los productos

            if (status === 200) {
                setProducts(data);
            } else {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProducts();
    }, [accessToken]); // Dependencia del access token

    useEffect(() => {
        const fetchFlavorsAndCompanies = async () => {
            const flavorsResponse = await getFlavors();
            if (flavorsResponse.status === 200) {
                setFlavors(flavorsResponse.data); // Almacena los sabores en el estado
            } else {
                console.error('Error al obtener sabores:', flavorsResponse.error);
            }

            const companiesResponse = await getCompanies();
            if (companiesResponse.status === 200) {
                setCompanies(companiesResponse.data); // Almacena las compañías en el estado
            } else {
                console.error('Error al obtener compañías:', companiesResponse.error);
            }
        };

        fetchFlavorsAndCompanies();
    }, []); // Solo se ejecuta una vez al montar el componente

    const fetchProducts = async () => {
        const { status, data, error } = await getProducts(accessToken);

        if (status === 200) {
            setProducts(data);
        } else {
            console.error('Error al obtener productos:', error);
        }
    };

    // Redirige a la página de login si no está autenticado
    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black p-4">Gestor de Productos</h2>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 m-4"
                >
                    Agregar Producto
                </button>
                <button 
                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 m-4"
                >
                    <Link to="/reports" className="text-xl text-white">Reportes</Link>
                </button>
            </div>
            <ProductManager  
                flavors={flavors} 
                companies={companies}
                products={products} 
                onUpdate={() => fetchProducts()}
            />
            
            {/* Modal para agregar producto */}
            {isModalOpen && (
                <AddProductModal 
                    flavors={flavors}
                    companies={companies}
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </>
    );
};