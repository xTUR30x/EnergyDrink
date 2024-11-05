// src/App.js o en otro componente donde necesites gestionar los productos
import React from 'react';
import { ProductManager } from './ProductManager';
import { Header } from '../../components/header/Header';

const productsData = [
    {
        beverage_id: 1,
        beverage_name: "Coca-Cola",
        beverage_price: "1.50",
        beverage_stock: 100,
        flavor: { flavor_name: "Cola" },
        company: { company_name: "Coca-Cola Company" },
        milliliters: 355,
        beverage_image: "http://localhost:8000/media/beverage_images/strawberry_redbull.jpg",
    },
    {
        beverage_id: 2,
        beverage_name: "Pepsi",
        beverage_price: "1.50",
        beverage_stock: 80,
        flavor: { flavor_name: "Cola" },
        company: { company_name: "PepsiCo" },
        milliliters: 355,
        beverage_image: "http://localhost:8000/media/beverage_images/strawberry_redbull.jpg",
    },
    // Agrega más productos aquí...
];

export const StaffPage = () => {
    const handleEdit = (product) => {
        console.log("Editar producto:", product);
        // Aquí puedes implementar la lógica para editar el producto
    };

    const handleDelete = (productId) => {
        console.log("Eliminar producto con ID:", productId);
        // Aquí puedes implementar la lógica para eliminar el producto
    };

    return (
        <>
            <Header/>
            <ProductManager products={productsData} onEdit={handleEdit} onDelete={handleDelete} />
        </>
    );
};