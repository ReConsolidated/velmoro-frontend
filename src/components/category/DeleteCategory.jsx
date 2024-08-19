import React from 'react';
import { deleteCategory } from '../services/categoryService';

const DeleteCategory = ({ id }) => {
    const handleDelete = async () => {
        try {
            await deleteCategory(id);
            alert('Category deleted successfully!');
        } catch (error) {
            alert('Failed to delete category');
        }
    };

    return (
        <button onClick={handleDelete}>Delete Category</button>
    );
};

export default DeleteCategory;
