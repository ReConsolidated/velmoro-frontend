import React, { useState } from 'react';
import { updateCategory } from '../services/categoryService';

const UpdateCategory = ({ id }) => {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedCategory = {
            name,
        };

        try {
            await updateCategory(id, updatedCategory);
            setSuccess('Category updated successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to update category');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Update Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit">Update Category</button>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default UpdateCategory;
