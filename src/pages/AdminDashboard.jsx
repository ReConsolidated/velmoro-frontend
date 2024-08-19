import React, {useEffect} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CategoryManagement from '../components/admin/CategoryManagement';
import ItemManagement from '../components/admin/MenuItemManagement.jsx';
import OrderManagement from '../components/admin/OrderManagement';
import HotelManagement from "../components/admin/HotelManagement.jsx";

const AdminDashboard = () => {
    useEffect(() => {
        console.log('API Base URL:', import.meta.env.VITE_BASE_URL);
    }, []);
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li><Link to="/admin/hotels">Manage Hotels</Link></li>
                    <li><Link to="/admin/categories">Manage Categories</Link></li>
                    <li><Link to="/admin/items">Manage Items</Link></li>
                    <li><Link to="/admin/orders">Manage Orders</Link></li>
                </ul>
            </nav>
            <Routes>
            <Route path="categories" element={<CategoryManagement/>}/>
                <Route path="items" element={<ItemManagement/>}/>
                <Route path="orders" element={<OrderManagement/>}/>
                <Route path="hotels" element={<HotelManagement/>}/>
            </Routes>
        </div>
    );
};

export default AdminDashboard;
