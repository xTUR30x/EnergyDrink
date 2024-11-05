// src/components/ProductManager.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar los iconos
import { useUserStore } from '../../stores/userStore'; // Asegúrate de que la ruta sea correcta

export const ProductManager = ({ products, onEdit, onDelete }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">Gestor de Productos</h2>
                <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700" onClick={onEdit}>
                    Agregar Producto
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductCard key={product.beverage_id} product={product} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product, onEdit, onDelete }) => {
    return (
        <div className="flex items-center border rounded-lg shadow-md overflow-hidden p-4 bg-white">
            <img src={product.beverage_image} alt={product.beverage_name} className="w-24 h-24 object-cover mr-4" />
            <div className="flex-grow">
                <h3 className="text-lg font-bold">{product.beverage_name}</h3>
                <p className="text-sm text-gray-600">Precio: ${product.beverage_price}</p>
                <p className="text-sm text-gray-600">Stock: {product.beverage_stock}</p>
                <p className="text-sm text-gray-600">Sabor: {product.flavor.flavor_name}</p>
                <p className="text-sm text-gray-600">Compañía: {product.company.company_name}</p>
                <p className="text-sm text-gray-600">Cantidad: {product.milliliters} ml</p>
            </div>
            <div className="flex flex-col items-center ml-4">
                <button 
                    onClick={() => onEdit(product)} 
                    className="text-yellow-500 hover:text-yellow-700 mb-2"
                    title="Editar producto"
                >
                    <FaEdit size={20} />
                </button>
                <button 
                    onClick={() => onDelete(product.beverage_id)} 
                    className="text-red-500 hover:text-red-700"
                    title="Eliminar producto"
                >
                    <FaTrash size={20} />
                </button>
            </div>
        </div>
    );
};
