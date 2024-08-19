import React, { useState } from 'react';
import { createMenuItem } from '../../services/menuItemService.js';

const AddMenuItem = () => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [categoryId, setCategoryId] = useState('dania');
    const [price, setPrice] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            name,
            price: parseFloat(price),
            imageUrl: imageUrl,
            active: true,
            categoryId: categoryId
        };

        try {
            await createMenuItem(newItem);
            setSuccess('Menu item added successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to add menu item');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Add New Menu Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label>Image url:</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required/>
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required/>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                </div>
                <button type="submit">Add Menu Item</button>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddMenuItem;
