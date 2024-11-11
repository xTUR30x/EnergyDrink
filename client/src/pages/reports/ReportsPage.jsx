// src/pages/ReportsPage.js
import React, { useEffect, useState } from 'react';
import { Header } from '../../components/header/Header';
import { getUsers } from '../../api/accounts/getUsers';
import { getUserOrders } from '../../api/orders/getUserOrders';
import { generateProductReportPDF } from '../../utils/generateProductReportPDF';
import { generateUserOrdersReportPDF } from '../../utils/generateUserOrdersReportPDF';
import { useUserStore } from '../../stores/userStore';
import { getAvailableBeverages } from '../../api/bevarages/getAvailableBeverages';
import { Navigate } from 'react-router-dom'; // Importa Navigate para redirección
import { isAuthenticated } from '../../utils/isAuthenticated'; // Asegúrate de importar tu función de autenticación

export const ReportsPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const { accessToken } = useUserStore.getState(); // Obtén el access token desde el store

    // Verifica si el usuario está autenticado
    const authenticated = isAuthenticated();

    useEffect(() => {
        const fetchUsers = async () => {
            const { status, data, error } = await getUsers(accessToken);

            if (status === 200) {
                setUsers(data); 
            } else {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchUsers();
    }, [accessToken]); // Dependencia del access token

    const handleGenerateProductReport = async () => {
        // Obtener los productos disponibles desde el backend
        const { status, data: productsData, error } = await getAvailableBeverages();

        if (status === 200) {
            generateProductReportPDF(productsData); // Llama a la función para generar el PDF
        } else {
            console.error('Error al obtener productos:', error);
        }
    };

    const handleGenerateUserOrdersReport = async () => {
        if (!selectedUser) {
            alert('Por favor selecciona un usuario.');
            return;
        }

        // Obtener las órdenes del usuario seleccionado
        const { status, data, error } = await getUserOrders(selectedUser, accessToken);
        
        if (status === 200) {
            const userOrdersData = data; 
            const userName = users.find(user => user.id === parseInt(selectedUser));
            
            generateUserOrdersReportPDF(userOrdersData, userName.first_name + ' ' + userName.last_name);
        } else {
            console.error('Error al generar el reporte de órdenes:', error);
        }
    };

    // Redirige a la página de login si no está autenticado
    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h2 className="text-lg font-bold text-black mb-4">Generar Reportes</h2>
                <button 
                    onClick={handleGenerateProductReport} 
                    className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 mb-4"
                >
                    Generar Reporte de Todos los Productos
                </button>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-black mb-1">Selecciona un Usuario:</label>
                    <select 
                        value={selectedUser} 
                        onChange={(e) => setSelectedUser(e.target.value)} 
                        className="border rounded w-full p-2 text-black"
                    >
                        <option value="">Selecciona un usuario</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {`${user.first_name} ${user.last_name}`} {/* Concatenar nombre y apellido */}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    onClick={handleGenerateUserOrdersReport} 
                    className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
                >
                    Generar Reporte de Órdenes del Usuario Seleccionado
                </button>
            </div>
        </>
    );
};