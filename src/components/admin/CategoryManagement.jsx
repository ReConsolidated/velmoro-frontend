import React, { useEffect, useState } from 'react';
import { getAllCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import { getAllHotels } from '../../services/hotelService';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [newCategory, setNewCategory] = useState({
        name: '',
        nameEN: '',
        nameDE: '',
        hotel: null // Przechowuje obiekt hotelu
    });
    const [updateCategoryId, setUpdateCategoryId] = useState(null);
    const [updateCategoryDetails, setUpdateCategoryDetails] = useState({
        name: '',
        nameEN: '',
        nameDE: '',
        hotel: null // Przechowuje obiekt hotelu
    });

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

    const handleAddCategory = async () => {
        await createCategory(newCategory);
        setNewCategory({
            name: '',
            nameEN: '',
            nameDE: '',
            hotel: null // Reset obiektu hotelu
        });
        const data = await getAllCategories();
        setCategories(data);
    };

    const handleUpdateCategory = async () => {
        if (updateCategoryId) {
            await updateCategory(updateCategoryId, updateCategoryDetails);
            setUpdateCategoryId(null);
            setUpdateCategoryDetails({
                name: '',
                nameEN: '',
                nameDE: '',
                hotel: null // Reset obiektu hotelu
            });
            const data = await getAllCategories();
            setCategories(data);
        }
    };

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
        const data = await getAllCategories();
        setCategories(data);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Category Management</h2>

            {/* Formularz dodawania nowej kategorii */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
                <div className="space-y-4">
                    <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        placeholder="Category Name (Default)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        value={newCategory.nameEN}
                        onChange={(e) => setNewCategory({ ...newCategory, nameEN: e.target.value })}
                        placeholder="Category Name (EN)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input
                        type="text"
                        value={newCategory.nameDE}
                        onChange={(e) => setNewCategory({ ...newCategory, nameDE: e.target.value })}
                        placeholder="Category Name (DE)"
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <select
                        value={newCategory.hotel ? newCategory.hotel.id : ''}
                        onChange={(e) => {
                            const selectedHotel = hotels.find(hotel => hotel.id === parseInt(e.target.value, 10));
                            setNewCategory({ ...newCategory, hotel: selectedHotel });
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
                    <button
                        onClick={handleAddCategory}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Add Category
                    </button>
                </div>
            </div>

            {/* Formularz edycji istniejącej kategorii */}
            {updateCategoryId && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <h3 className="text-xl font-semibold mb-4">Update Category</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={updateCategoryDetails.name}
                            onChange={(e) => setUpdateCategoryDetails({ ...updateCategoryDetails, name: e.target.value })}
                            placeholder="Update Category Name (Default)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={updateCategoryDetails.nameEN}
                            onChange={(e) => setUpdateCategoryDetails({ ...updateCategoryDetails, nameEN: e.target.value })}
                            placeholder="Update Category Name (EN)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="text"
                            value={updateCategoryDetails.nameDE}
                            onChange={(e) => setUpdateCategoryDetails({ ...updateCategoryDetails, nameDE: e.target.value })}
                            placeholder="Update Category Name (DE)"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                        <select
                            value={updateCategoryDetails.hotel ? updateCategoryDetails.hotel.id : ''}
                            onChange={(e) => {
                                const selectedHotel = hotels.find(hotel => hotel.id === parseInt(e.target.value, 10));
                                setUpdateCategoryDetails({ ...updateCategoryDetails, hotel: selectedHotel });
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
                        <button
                            onClick={handleUpdateCategory}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Update Category
                        </button>
                    </div>
                </div>
            )}

            {/* Lista kategorii */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Categories</h3>
                <ul className="space-y-4">
                    {categories.map(category => (
                        <li key={category.id} className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
                            <div>
                                <h4 className="text-lg font-semibold">{category.name}</h4>
                                <p className="text-sm text-gray-500">Name (EN): {category.nameEN}</p>
                                <p className="text-sm text-gray-500">Name (DE): {category.nameDE}</p>
                                <p className="text-sm text-gray-500">Hotel: {hotels.find(hotel => hotel.id === category.hotel?.id)?.displayName || 'N/A'}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => {
                                        setUpdateCategoryId(category.id);
                                        setUpdateCategoryDetails({
                                            name: category.name,
                                            nameEN: category.nameEN,
                                            nameDE: category.nameDE,
                                            hotel: category.hotel
                                        });
                                    }}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDeleteCategory(category.id)}
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

export default CategoryManagement;
