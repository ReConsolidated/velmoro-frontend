// Funkcja do generowania losowego userId
import instance from "../axios.js";

const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9);
};

const getUserId = () => {
    let userId = localStorage.getItem('userId');

    if (!userId) {
        userId = generateUserId();
        localStorage.setItem('userId', userId);
    }

    return userId;
};

export const logEvent = async (eventType, details) => {
    const userId = getUserId();
    try {
        const response = await instance.post('/events/log', {
            userId,
            eventType,
            details
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('Event logged successfully', response.data);
    } catch (error) {
        console.error('Error logging event', error);
    }
};
