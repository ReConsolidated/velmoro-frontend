import React, { useEffect, useState } from 'react';
import { getAllOrders, createOrder, updateOrder, deleteOrder } from '../../services/orderService';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({ /* example order structure */ });
    const [updateOrderId, setUpdateOrderId] = useState(null);
    const [updateOrderDetails, setUpdateOrderDetails] = useState({ /* example order structure */ });

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getAllOrders();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const handleAddOrder = async () => {
        await createOrder(newOrder);
        setNewOrder({ /* reset state */ });
        // Refresh the list
        const data = await getAllOrders();
        setOrders(data);
    };

    const handleUpdateOrder = async () => {
        if (updateOrderId) {
            await updateOrder(updateOrderId, updateOrderDetails);
            setUpdateOrderId(null);
            setUpdateOrderDetails({ /* reset state */ });
            // Refresh the list
            const data = await getAllOrders();
            setOrders(data);
        }
    };

    const handleDeleteOrder = async (id) => {
        await deleteOrder(id);
        // Refresh the list
        const data = await getAllOrders();
        setOrders(data);
    };

    return (
        <div>
            <h2>Order Management</h2>
            <input
                type="text"
                value={newOrder.details}
                onChange={(e) => setNewOrder({ ...newOrder, details: e.target.value })}
                placeholder="Order details"
            />
            <button onClick={handleAddOrder}>Add Order</button>
            {updateOrderId && (
                <div>
                    <input
                        type="text"
                        value={updateOrderDetails.details}
                        onChange={(e) => setUpdateOrderDetails({ ...updateOrderDetails, details: e.target.value })}
                        placeholder="Update order details"
                    />
                    <button onClick={handleUpdateOrder}>Update Order</button>
                </div>
            )}
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order ID: {order.id} - Details: {order.details}
                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                        <button onClick={() => { setUpdateOrderId(order.id); setUpdateOrderDetails({ details: order.details }); }}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderManagement;
