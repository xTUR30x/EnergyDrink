import React, { useState, useEffect } from 'react';
import { FaFilter } from "react-icons/fa6";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { getFlavors } from '../../api/bevarages/getFlavors';
import { useUserStore } from '../../stores/userStore';
import { Link } from 'react-router-dom';

export const MobileHeader = ({ onSearch }) => { 
    const [flavors, setFlavors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedFlavor, setSelectedFlavor] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { isStaff } = useUserStore();

    useEffect(() => {
        const fetchFlavors = async () => {
            const response = await getFlavors();
            if (response.status === 200) {
                setFlavors(response.data);
            }
        };

        fetchFlavors();
    }, []);

    const handleSearch = async () => {
        await onSearch(searchQuery, selectedFlavor); 
        setShowModal(false); 
    };

    const handleClearFilters = async () => {
        setSearchQuery(''); 
        setSelectedFlavor(''); 
        await onSearch('', ''); 

    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <nav className="flex items-center justify-between p-4" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="text-xl font-bold text-gray-800 flex items-center">
                        <FaHome />
                    </a>
                </div>
                <div className="flex items-center">
                    <input 
                        type="text" 
                        className="border border-gray-300 rounded-md px-2 py-1 text-black" 
                        placeholder="Buscar productos..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch(); 
                            }
                        }}
                    />
                    <Link to="/" className="text-gray-800 hover:bg-gray-200 rounded-md p-2"
                    onClick={() => setShowModal(true)}
                    >
                        <FaFilter />
                    </Link>
                    <Link to="/profile" className="text-gray-800 hover:bg-gray-200 rounded-md p-2">
                        <FaUserAlt />
                    </Link>
                    <Link to="/cart" className="text-gray-800 hover:bg-gray-200 rounded-md p-2">
                        <FaShoppingCart />
                    </Link>

                    {isStaff &&
                        <Link to="/staff" className="text-gray-800 hover:bg-gray-200 rounded-md p-2">
                            <MdOutlineBusinessCenter />
                        </Link>
                    }
                </div>
            </nav>

            {/* Modal para seleccionar sabores */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-black">Selecciona un Sabor</h2>
                        <div className="max-h-60 overflow-y-scroll mb-4">
                            {flavors.map(flavor => (
                                <div key={flavor.flavor_id} className="flex items-center mb-2 text-black">
                                    <input 
                                        type="radio" 
                                        id={`flavor-${flavor.flavor_id}`} 
                                        name="flavor" 
                                        value={flavor.flavor_id}
                                        onChange={(e) => setSelectedFlavor(e.target.value)} // Actualiza el sabor seleccionado
                                    />
                                    <label htmlFor={`flavor-${flavor.flavor_id}`} className="ml-2">{flavor.flavor_name}</label>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={handleSearch} 
                            className="bg-blue-500 text-white rounded-md px-4 py-2"
                        >
                            Buscar
                        </button>
                        {/* Botón "Quitar Filtros" dentro del modal */}
                        <button 
                            onClick={handleClearFilters} 
                            className="ml-2 bg-red-500 text-white rounded-md px-4 py-2"
                        >
                            Quitar Filtros
                        </button>
                        <button 
                            onClick={() => setShowModal(false)} 
                            className="ml-2 bg-gray-300 rounded-md px-4 py-2"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};