import React, { useEffect, useState } from 'react';
import { getAllMenuItems } from '../../services/menuItemService.js';
import Spinner from "../Spinner.jsx";

const MenuItemList = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const data = await getAllMenuItems();
                setMenuItems(data);
            } catch (error) {
                setError('Failed to fetch menu items');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) return <Spinner/>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Menu Item List</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>
                        ID: {item.id}, Name: {item.name}, Price: {item.price}, ImageUrl: {item.imageUrl}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuItemList;
