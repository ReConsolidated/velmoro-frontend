import instance from "../axios.js";

const API_URL = '/hotels';

// Funkcja do pobierania wszystkich hoteli
export const getAllHotels = async () => {
    try {
        const response = await instance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
};

// Funkcja do tworzenia nowego hotelu
export const createHotel = async (hotel) => {
    try {
        const response = await instance.post(API_URL, hotel);
        return response.data;
    } catch (error) {
        console.error('Error creating hotel:', error);
        throw error;
    }
};

// Funkcja do aktualizacji istniejącego hotelu
export const updateHotel = async (id, hotel) => {
    try {
        const response = await instance.put(`${API_URL}/${id}`, hotel);
        return response.data;
    } catch (error) {
        console.error('Error updating hotel:', error);
        throw error;
    }
};

// Funkcja do usuwania hotelu
export const deleteHotel = async (id) => {
    try {
        await instance.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting hotel:', error);
        throw error;
    }
};

// Funkcja do pobierania hotelu na podstawie nazwy
export const getHotelByName = async (hotelName) => {
    try {
        const response = await instance.get(`${API_URL}/${hotelName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching hotel by name:', error);
        throw error;
    }
};
