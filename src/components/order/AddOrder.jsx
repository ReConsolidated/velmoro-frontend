import React, { useState } from 'react';
import { addOrder } from '../../services/orderService.js';

const AddOrder = () => {
    const [itemId, setItemId] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newOrder = {
            orderEntries: [
                {
                    itemId: parseInt(itemId, 10),
                    totalPrice: parseFloat(totalPrice),
                    quantity: parseInt(quantity, 10)
                }
            ]
        };

        try {
            await addOrder(newOrder);
            setSuccess('Order added successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to add order');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Add New Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item ID:</label>
                    <input type="number" value={itemId} onChange={(e) => setItemId(e.target.value)} required />
                </div>
                <div>
                    <label>Total Price:</label>
                    <input type="number" step="0.01" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>
                <button type="submit">Add Order</button>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddOrder;
