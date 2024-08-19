import React, { useState } from 'react';
import { deleteMenuItem } from '../../services/menuItemService.js';

const DeleteMenuItem = ({ id }) => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await deleteMenuItem(id);
            setSuccess('Menu item deleted successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to delete menu item');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Delete Menu Item</h2>
            <button onClick={handleDelete}>Delete Menu Item</button>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DeleteMenuItem;
