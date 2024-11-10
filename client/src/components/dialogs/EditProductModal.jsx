import React, { useEffect, useState } from 'react';
import { modifyProduct } from '../../api/staff/modifyProduct'; // Cambia esto si tienes una función específica para editar

export const EditProductModal = ({ onClose, product, flavors, companies, onUpdate }) => {
    const [productData, setProductData] = useState({
        beverage_id: '',
        beverage_name: '',
        beverage_stock: '',
        beverage_price: '',
        beverage_description: '',
        milliliters: '',
        beverage_image: '', // Cambia a string para almacenar la cadena base64
        flavor: {},
        company: {}
    });

    useEffect(() => {
        // Cargar datos del producto en el estado al abrir el modal
        if (product) {
            setProductData({
                beverage_id: product.beverage_id,
                beverage_name: product.beverage_name,
                beverage_stock: product.beverage_stock,
                beverage_price: product.beverage_price,
                beverage_description: product.beverage_description,
                milliliters: product.milliliters,
                beverage_image: product.beverage_image || '', // Inicializa con la imagen existente
                flavor: product.flavor,
                company: product.company
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFlavorChange = (e) => {
        const selectedFlavor = flavors.find(flavor => flavor.flavor_id === parseInt(e.target.value));
        setProductData(prevData => ({ ...prevData, flavor: selectedFlavor }));
    };

    const handleCompanyChange = (e) => {
        const selectedCompany = companies.find(company => company.company_id === parseInt(e.target.value));
        setProductData(prevData => ({ ...prevData, company: selectedCompany }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con los datos del producto en el formato correcto
        const payload = {
            beverage_name: productData.beverage_name,
            beverage_stock: productData.beverage_stock,
            beverage_price: productData.beverage_price,
            beverage_description: productData.beverage_description,
            milliliters: productData.milliliters,
            // No se incluye bebida_image aquí para mantener la imagen existente
            flavor: {
                flavor_id: productData.flavor.flavor_id, // Asegúrate de que esto esté presente
                flavor_name: productData.flavor.flavor_name // Asegúrate de que esto esté presente
            },
            company: {
                company_id: productData.company.company_id, // Asegúrate de que esto esté presente
                company_name: productData.company.company_name // Asegúrate de que esto esté presente
            }
        };

        // Enviar los datos al backend para actualizar el producto
        const { status, data, error } = await modifyProduct(payload, productData.beverage_id); // Cambia esto si tienes una función específica para editar
        
        if (status === 200) { // Cambia a 200 o el código que tu API retorne al actualizar
            onUpdate(); // Llama a la función para recargar la lista de productos
            onClose(); // Cierra el modal después de actualizar el producto
        } else {
            console.error('Error al actualizar el producto:', error);
            alert(`Error: ${error.message || 'No se pudo actualizar el producto.'}`);
        }
    };

    return (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
           <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg mt-14">
               <h2 className="text-lg font-bold mb-4 text-black">Editar Producto</h2>
               <form onSubmit={handleSubmit}>
                   <div className="mb-3">
                       <label className="block text-sm font-medium text-black mb-1">Nombre:</label>
                       <input
                           type="text"
                           name="beverage_name"
                           value={productData.beverage_name}
                           onChange={handleChange}
                           required
                           className="border rounded w-full p-2 text-black"
                       />
                   </div>
                   <div className="mb-3 flex space-x-2">
                       <div className="flex-grow">
                           <label className="block text-sm font-medium text-black mb-1">Stock:</label>
                           <input
                               type="number"
                               name="beverage_stock"
                               value={productData.beverage_stock}
                               onChange={handleChange}
                               required
                               className="border rounded w-full p-2 text-black"
                           />
                       </div>
                       <div className="flex-grow">
                           <label className="block text-sm font-medium text-black mb-1">Mililitros:</label>
                           <input
                               type="number"
                               name="milliliters"
                               value={productData.milliliters}
                               onChange={handleChange}
                               required
                               className="border rounded w-full p-2 text-black"
                           />
                       </div>
                   </div>
                   <div className="mb-3 flex items-center space-x-2">
                       <div className="flex-grow">
                           <label className="block text-sm font-medium text-black mb-1">Precio:</label>
                           <input
                               type="number"
                               name="beverage_price"
                               value={productData.beverage_price}
                               onChange={handleChange}
                               required
                               className="border rounded w-full p-2 text-black"
                           />
                       </div>
                       {/* Mostrar la imagen actual */}
                       {product && (
                           <img 
                               src={product.beverage_image} 
                               alt={product.beverage_name} 
                               className="w-24 h-24 object-cover mb-2" 
                           />
                       )}
                   </div>
                   <div className="mb-3">
                       <label className="block text-sm font-medium text-black mb-1">Descripción:</label>
                       <textarea
                           name="beverage_description"
                           value={productData.beverage_description}
                           onChange={handleChange}
                           required
                           className="border rounded w-full p-2 text-black"
                       ></textarea>
                   </div>
                   <div className="mb-3 flex space-x-2">
                       <div className="flex-grow">
                           <label className="block text-sm font-medium text-black mb-1">Sabor:</label>
                           <select 
                               name="flavor" 
                               value={productData.flavor.flavor_id || ''} 
                               onChange={handleFlavorChange} 
                               required 
                               className="border rounded w-full p-2 text-black"
                           >
                               <option value="">Selecciona un sabor</option>
                               {flavors.map(flavor => (
                                   <option key={flavor.flavor_id} value={flavor.flavor_id}>
                                       {flavor.flavor_name}
                                   </option>
                               ))}
                           </select>
                       </div>
                       <div className="flex-grow">
                           <label className="block text-sm font-medium text-black mb-1">Compañía:</label>
                           <select 
                               name="company" 
                               value={productData.company.company_id || ''} 
                               onChange={handleCompanyChange} 
                               required 
                               className="border rounded w-full p-2 text-black"
                           >
                               <option value="">Selecciona una compañía</option>
                               {companies.map(company => (
                                   <option key={company.company_id} value={company.company_id}>
                                       {company.company_name}
                                   </option>
                               ))}
                           </select>
                       </div>
                   </div>
                   <div className="flex justify-between mt-4">
                       <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
                           Actualizar Producto
                       </button>
                       <button type='button' onClick={onClose} className="bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400">
                           Cerrar
                       </button>
                   </div>
               </form>
           </div>
       </div>
   );
};

export default EditProductModal;