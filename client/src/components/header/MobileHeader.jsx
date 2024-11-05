import React from 'react';
import { FaFilter } from "react-icons/fa6";
import { FaHome, FaShoppingCart, FaUserAlt } from "react-icons/fa";

export const MobileHeader = () => {
    return (
        <header className="sticky top-0 z-50 bg-white shadow">
            <nav className="flex items-center justify-between p-4" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="text-xl font-bold text-gray-800 flex items-center">
                        <FaHome />
                    </a>
                </div>
                <div className="flex items-center">
                    <input type="text" className="border border-gray-300 rounded-md px-2 py-1" placeholder="Buscar productos..." />
                    <button className="ml-2 text-gray-800 hover:bg-gray-200 rounded-md p-2">
                        <FaFilter />
                    </button>
                    <button className="ml-2 text-gray-800 hover:bg-gray-200 rounded-md p-2">
                        <FaUserAlt />
                    </button>
                    <button className="ml-2 text-gray-800 hover:bg-gray-200 rounded-md p-2">
                        <FaShoppingCart />
                    </button>
                </div>
            </nav>
        </header>
    );
};