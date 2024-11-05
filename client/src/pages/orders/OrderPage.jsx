// src/components/OrderPage.js
import React, { useEffect, useState } from 'react';
import { OrderList } from './OrderList';
import { Header } from '../../components/header/Header';
import { getUserOrders } from '../../api/orders/getUserOrders';
import { useUserStore } from '../../stores/userStore'; 

export const OrderPage = () => {
    const { userId } = useUserStore();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        const { status, data } = await getUserOrders(userId);
        if (status === 200) {
            setOrders(data);
        } else {
            setError('Error al cargar las órdenes');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />
            <OrderList orders={orders} />
        </>
    );
};