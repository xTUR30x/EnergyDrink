// src/components/UserProfile.js
import React from 'react';
import { UserInfo } from '../../components/userProfile/UserInfo';
import { UserActions } from '../../components/userProfile/UserActions';
import { Header } from '../../components/header/Header';

export const UserProfile = () => {
    return (
        <>  
            <Header />
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                    <UserInfo />
                    <UserActions />
                </div>
            </div>
        </>
    );
};
