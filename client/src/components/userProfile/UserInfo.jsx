// src/components/userProfile/UserInfo.js
import React from 'react';

export const UserInfo = ({ userData }) => {
    if (!userData) return null; // Asegúrate de que hay datos antes de intentar acceder a ellos

    const { first_name, last_name, email, profile_picture } = userData;

    return (
        <div className="flex items-center space-x-4">
            <img className="h-24 w-24 rounded-full" src={profile_picture || "https://via.placeholder.com/150"} alt="Profile Picture" />
            <div>
                <h2 className="text-xl font-bold text-black">{`${first_name} ${last_name}`}</h2>
                <p className="text-gray-600">{email}</p>
            </div>
        </div>
    );
};