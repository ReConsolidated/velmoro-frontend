import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/orderService.js';
import Spinner from "../Spinner.jsx";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <Spinner/>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Order List</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order ID: {order.id}, Date: {new Date(order.creationDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
