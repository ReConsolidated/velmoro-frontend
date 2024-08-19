import instance from "../axios.js";

const API_URL = '/orders';

// Funkcja do pobierania wszystkich zamówień
export const getAllOrders = async () => {
    try {
        const response = await instance.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Funkcja do tworzenia nowego zamówienia
export const createOrder = async (order) => {
    try {
        const response = await instance.post(API_URL, order);
        return response.data;
    } catch (error) {
        // Sprawdzamy, czy błąd ma odpowiedź od serwera, i czy status to 500
        if (error.response && error.response.status === 500) {
            console.error('Server error (500): Internal Server Error.');

            throw new Error('Server error: Unable to process the order. Please try again later.');
        } else {
            // Inne błędy
            console.error('Error creating order:', error);
            throw error; // Rzucamy błąd dalej, aby był obsłużony wyżej w kodzie
        }
    }
};


// Funkcja do aktualizacji istniejącego zamówienia
export const updateOrder = async (id, order) => {
    try {
        const response = await instance.put(`${API_URL}/${id}`, order);
        return response.data;
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
};

// Funkcja do usuwania zamówienia
export const deleteOrder = async (id) => {
    try {
        await instance.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting order:', error);
        throw error;
    }
};
