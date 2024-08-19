import React, { useState } from 'react';
import { createCategory } from '../services/categoryService';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCategory = {
            name,
        };

        try {
            await createCategory(newCategory);
            setSuccess('Category added successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to add category');
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Add New Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit">Add Category</button>
            </form>
            {success && <p>{success}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddCategory;
