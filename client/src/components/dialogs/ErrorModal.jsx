// src/components/ErrorModal.js
import React from 'react';

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-red-600">Error</h2>
                <p className='text-black'>{ message }</p>
                <button 
                    onClick={ onClose } 
                    className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ErrorModal;