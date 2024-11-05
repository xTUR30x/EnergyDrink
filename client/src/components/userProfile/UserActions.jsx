// src/components/UserActions.js
import React from 'react';
import { BsCartCheckFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom'; // Importa Link

export const UserActions = () => {
    return (
        <div className="mt-6 flex space-x-4">
            <a href="#" className="flex items-center text-blue-500 hover:text-blue-700">
                <IoLogOut />
                <span>Logout</span>
            </a>
            <Link to="/orders" className="flex items-center text-blue-500 hover:text-blue-700">
                <BsCartCheckFill />
                <span>View Orders</span>
            </Link>
        </div>
    );
};