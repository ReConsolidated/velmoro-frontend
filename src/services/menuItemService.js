import instance from "../axios.js";

const API_URL = '/menu-items';

export const getAllItems = async () => {
    const response = await instance.get(API_URL);
    return response.data;
};

export const getMenuItemById = async (id) => {
    const response = await instance.get(`${API_URL}/${id}`);
    return response.data;
};

export const createItem = async (item) => {
    const response = await instance.post(API_URL, item);
    return response.data;
};

export const updateItem = async (id, item) => {
    const response = await instance.put(`${API_URL}/${id}`, item);
    return response.data;
};

export const deleteItem = async (id) => {
    await instance.delete(`${API_URL}/${id}`);
};

export const getAllMenuItems = async () => {
    try {
        const response = await instance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching menu items:', error);
        throw error;
    }
};
