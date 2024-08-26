import instance from "../axios.js";

const BASE_URL = '/categories'; // URL do Twojego backendu

// Funkcja do pobierania wszystkich kategorii
export const getAllCategories = async () => {
    try {
        const response = await instance.get(BASE_URL, {
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

export const getHotelCategories = async (hotelUrlName) => {
    try {
        const response = await instance.get(BASE_URL, {
            params: { urlName: hotelUrlName }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Funkcja do pobierania kategorii według ID
export const getCategoryById = async (id) => {
    try {
        const response = await instance.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category by id:", error);
        throw error;
    }
};

// Funkcja do tworzenia nowej kategorii
export const createCategory = async (category) => {
    try {
        const response = await instance.post(BASE_URL, category);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// Funkcja do aktualizacji kategorii
export const updateCategory = async (id, categoryDetails) => {
    try {
        const response = await instance.put(`${BASE_URL}/${id}`, categoryDetails);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
};

// Funkcja do usuwania kategorii
export const deleteCategory = async (id) => {
    try {
        await instance.delete(`${BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
};
