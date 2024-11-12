import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import {AddProductModal} from '../../components/dialogs/AddProductModal';
import {EditProductModal} from '../../components/dialogs/EditProductModal'; 

export const ProductManager = ({ products, flavors, companies, onUpdate }) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true); 
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductCard 
                        key={product.beverage_id} 
                        product={product} 
                        onEdit={() => handleEditClick(product)} 
                    />
                ))}
            </div>

            {/* Modal para agregar producto */}
            {isAddModalOpen && (
                <AddProductModal 
                    flavors={flavors}
                    companies={companies}
                    onClose={() => setIsAddModalOpen(false)} 
                />
            )}

            {/* Modal para editar producto */}
            {isEditModalOpen && (
                <EditProductModal 
                    onClose={() => setIsEditModalOpen(false)} 
                    product={selectedProduct} 
                    flavors={flavors} 
                    companies={companies} 
                    onUpdate={onUpdate}
                />
            )}
        </div>
    );
};

const ProductCard = ({ product, onEdit }) => {
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
                {/* Aquí puedes agregar un botón para eliminar el producto si es necesario */}
            </div>
        </div>
    );
};