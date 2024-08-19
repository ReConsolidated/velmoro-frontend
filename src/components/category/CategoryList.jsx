import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../services/categoryService';
import Spinner from "../Spinner.jsx";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (error) {
                setError('Failed to fetch categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <Spinner/>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Category List</h2>
            <ul>
                {categories.map(category => (
                    <li key={category.id}>
                        ID: {category.id}, Name: {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
