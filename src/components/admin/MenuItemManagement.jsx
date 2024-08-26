import React, { useEffect, useState } from 'react';
import { getAllItems, createItem, updateItem, deleteItem } from '../../services/menuItemService.js';
import { getAllCategories } from '../../services/categoryService';
import { getAllHotels } from '../../services/hotelService';

const MenuItemManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [newItem, setNewItem] = useState({
        hotel: null,
        categoryId: '',
        displayName: '',
        displayNameEN: '',
        displayNameDE: '',
        imageUrl: '',
        price: 0,
        description: '',
        descriptionEN: '',
        descriptionDE: '',
        priority: 100, // Default value for priority
        active: true
    });
    const [updateItemId, setUpdateItemId] = useState(null);
    const [updateItemDetails, setUpdateItemDetails] = useState({
        hotel: null,
        categoryId: '',
        displayName: '',
        displayNameEN: '',
        displayNameDE: '',
        imageUrl: '',
        price: 0,
        description: '',
        descriptionEN: '',
        descriptionDE: '',
        priority: 100, // Default value for priority
        active: true
    });

    useEffect(() => {
        const fetchItems = async () => {
            const data = await getAllItems();
            setMenuItems(data);
        };
        fetchItems();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllCategories();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchHotels = async () => {
            const data = await getAllHotels();
            setHotels(data);
        };
        fetchHotels();
    }, []);

    const handleAddItem = async () => {
        await createItem(newItem);
        setNewItem({
            hotel: null,
            categoryId: '',
            displayName: '',
            displayNameEN: '',
            displayNameDE: '',
            imageUrl: '',
            price: 0,
            description: '',
            descriptionEN: '',
            descriptionDE: '',
            priority: 100, // Default value for priority
            active: true
        });
        const data = await getAllItems();
        setMenuItems(data);
    };

    const handleUpdateItem = async () => {
        if (updateItemId) {
            await updateItem(updateItemId, updateItemDetails);
            setUpdateItemId(null);
            setUpdateItemDetails({
                hotel: null,
                categoryId: '',
                displayName: '',
                displayNameEN: '',
                displayNameDE: '',
                imageUrl: '',
                price: 0,
                description: '',
                descriptionEN: '',
                descriptionDE: '',
                priority: 100, // Default value for priority
                active: true
            });
            const data = await getAllItems();
            setMenuItems(data);
        }
    };

    const handleDeleteItem = async (id) => {
        await deleteItem(id);
        const data = await getAllItems();
        setMenuItems(data);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Menu Item Management</h2>

            {/* Formularz dodawania nowego elementu menu */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Add New Menu Item</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={newItem.displayName}
                        onChange={(e) => setNewItem({ ...newItem, displayName: e.target.value })}
                        placeholder="Display Name (Default)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        value={newItem.displayNameEN}
                        onChange={(e) => setNewItem({ ...newItem, displayNameEN: e.target.value })}
                        placeholder="Display Name (EN)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        value={newItem.displayNameDE}
                        onChange={(e) => setNewItem({ ...newItem, displayNameDE: e.target.value })}
                        placeholder="Display Name (DE)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        value={newItem.imageUrl}
                        onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                        placeholder="Image URL"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                        placeholder="Price"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        placeholder="Description (Default)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        value={newItem.descriptionEN}
                        onChange={(e) => setNewItem({ ...newItem, descriptionEN: e.target.value })}
                        placeholder="Description (EN)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        value={newItem.descriptionDE}
                        onChange={(e) => setNewItem({ ...newItem, descriptionDE: e.target.value })}
                        placeholder="Description (DE)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="number"
                        value={newItem.priority}
                        onChange={(e) => setNewItem({ ...newItem, priority: parseInt(e.target.value) })}
                        placeholder="Priority"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <select
                        value={newItem.categoryId}
                        onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {/* Select dla hotelu */}
                    <select
                        value={newItem.hotel ? newItem.hotel.id : ''}
                        onChange={(e) => {
                            const selectedHotel = hotels.find(hotel => hotel.id === parseInt(e.target.value));
                            setNewItem({ ...newItem, hotel: selectedHotel });
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Hotel</option>
                        {hotels.map(hotel => (
                            <option key={hotel.id} value={hotel.id}>
                                {hotel.displayName}
                            </option>
                        ))}
                    </select>

                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={newItem.active}
                            onChange={(e) => setNewItem({ ...newItem, active: e.target.checked })}
                            className="form-checkbox"
                        />
                        <span>Active</span>
                    </label>
                    <button
                        onClick={handleAddItem}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Item
                    </button>
                </div>
            </div>

            {/* Formularz edycji istniejącego elementu menu */}
            {updateItemId && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-4">Update Menu Item</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={updateItemDetails.displayName}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, displayName: e.target.value })}
                            placeholder="Update Display Name (Default)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={updateItemDetails.displayNameEN}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, displayNameEN: e.target.value })}
                            placeholder="Update Display Name (EN)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={updateItemDetails.displayNameDE}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, displayNameDE: e.target.value })}
                            placeholder="Update Display Name (DE)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={updateItemDetails.imageUrl}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, imageUrl: e.target.value })}
                            placeholder="Update Image URL"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            value={updateItemDetails.price}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, price: parseFloat(e.target.value) })}
                            placeholder="Update Price"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            value={updateItemDetails.description}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, description: e.target.value })}
                            placeholder="Update Description (Default)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            value={updateItemDetails.descriptionEN}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, descriptionEN: e.target.value })}
                            placeholder="Update Description (EN)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <textarea
                            value={updateItemDetails.descriptionDE}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, descriptionDE: e.target.value })}
                            placeholder="Update Description (DE)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="number"
                            value={updateItemDetails.priority}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, priority: parseInt(e.target.value) })}
                            placeholder="Update Priority"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <select
                            value={updateItemDetails.categoryId}
                            onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, categoryId: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {/* Select dla hotelu */}
                        <select
                            value={updateItemDetails.hotel ? updateItemDetails.hotel.id : ''}
                            onChange={(e) => {
                                const selectedHotel = hotels.find(hotel => hotel.id === parseInt(e.target.value));
                                setUpdateItemDetails({ ...updateItemDetails, hotel: selectedHotel });
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Hotel</option>
                            {hotels.map(hotel => (
                                <option key={hotel.id} value={hotel.id}>
                                    {hotel.displayName}
                                </option>
                            ))}
                        </select>

                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={updateItemDetails.active}
                                onChange={(e) => setUpdateItemDetails({ ...updateItemDetails, active: e.target.checked })}
                                className="form-checkbox"
                            />
                            <span>Active</span>
                        </label>
                        <button
                            onClick={handleUpdateItem}
                            className="bg-fourth text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Update Item
                        </button>
                    </div>
                </div>
            )}

            {/* Lista elementów menu */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
                <ul className="space-y-4">
                    {menuItems.map(item => (
                        <li key={item.id} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">{item.displayName}</h4>
                                <p className="text-sm text-gray-500">Hotel: {item.hotel?.displayName}</p>
                                <p className="text-sm text-gray-500">Category ID: {item.categoryId}</p>
                                <p className="text-sm text-gray-500">Price: {item.price.toFixed(2)} zł</p>
                                <p className="text-sm text-gray-500">Description: {item.description}</p>
                                <p className="text-sm text-gray-500">Image URL: <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">{item.imageUrl}</a></p>
                                <p className="text-sm text-gray-500">Active: {item.active ? 'Yes' : 'No'}</p>
                                <p className="text-sm text-gray-500">Priority: {item.priority}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setUpdateItemId(item.id);
                                        setUpdateItemDetails({
                                            hotel: item.hotel,
                                            categoryId: item.categoryId,
                                            displayName: item.displayName,
                                            displayNameEN: item.displayNameEN,
                                            displayNameDE: item.displayNameDE,
                                            imageUrl: item.imageUrl,
                                            price: item.price,
                                            description: item.description,
                                            descriptionEN: item.descriptionEN,
                                            descriptionDE: item.descriptionDE,
                                            priority: item.priority,
                                            active: item.active
                                        });
                                    }}
                                    className="bg-fifth text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuItemManagement;
