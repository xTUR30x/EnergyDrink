// src/components/UserInfo.js
import React from 'react';
import { useUserStore } from '../../stores/userStore';

export const UserInfo = () => {
    const { firstName, lastName, email } = useUserStore();

    return (
        <div className="flex items-center space-x-4">
            <img className="h-24 w-24 rounded-full" src="https://via.placeholder.com/150" alt="Profile Picture" />
            <div>
                <h2 className="text-xl font-bold text-black">{`${firstName} ${lastName}`}</h2>
                <p className="text-gray-600">{email}</p>
            </div>
        </div>
    );
};