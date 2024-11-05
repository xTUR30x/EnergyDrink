// src/components/DesktopHeader.js
import React from 'react';
import { FaFilter } from "react-icons/fa6";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const DesktopHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="text-xl font-bold text-gray-800">EnergyDrinks</Link> {/* Enlace a la página principal */}
        </div>
        <div className="hidden lg:flex lg:gap-x-4">
          <input type="text" className="border border-gray-300 rounded-md px-2 py-1" placeholder="Buscar productos..." />
          <button className="text-gray-800 hover:bg-gray-200 rounded-md p-2">
            <FaFilter />
          </button>
          <Link to="/profile" className="text-gray-800 hover:bg-gray-200 rounded-md p-2"> {/* Enlace al perfil */}
            <FaUserAlt />
          </Link>
          <Link to="/cart" className="text-gray-800 hover:bg-gray-200 rounded-md p-2"> {/* Enlace al carrito */}
            <FaShoppingCart />
          </Link>
        </div>
      </nav>
    </header>
  );
};