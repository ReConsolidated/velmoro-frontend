import React, { useState } from 'react';
import { updateMenuItem } from '../../services/menuItemService.js';

const UpdateMenuItem = ({ id }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedItem = {
            name,
            price: parseFloat(price),
        };

        try {
            await updateMenuItem(id, updatedItem);
            setSuccess('Menu item updated successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to update menu item');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Update Menu Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit">Update Menu Item</button>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default UpdateMenuItem;
