import { useState } from 'react';
import { addProduct } from '../../api/staff/addProduct';

const useAddProduct = (flavors, companies) => {
    const [productData, setProductData] = useState({
        beverage_name: '',
        beverage_stock: '',
        beverage_price: '',
        beverage_description: '',
        milliliters: '',
        beverage_image: null,
        flavor: '',
        company: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setProductData(prevData => ({
            ...prevData,
            beverage_image: e.target.files[0] // Guardar el archivo de imagen
        }));
    };

    const handleSubmit = async (onClose) => {
        const formData = new FormData();
        
        for (const key in productData) {
            formData.append(key, productData[key]);
        }

        const { status, data, error } = await addProduct(formData); // Envía los datos al backend
        
        if (status === 201) {
            console.log('Producto agregado con éxito:', data);
            onClose(); // Cierra el modal después de agregar el producto
        } else {
            console.error('Error al agregar el producto:', error);
            alert(`Error: ${error.message || 'No se pudo agregar el producto.'}`);
        }
    };

    return { productData, handleChange, handleFileChange, handleSubmit };
};

export default useAddProduct;