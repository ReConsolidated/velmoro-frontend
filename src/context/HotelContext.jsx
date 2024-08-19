// HotelContext.jsx
import React, { createContext, useState, useContext, useCallback } from 'react';
import { getHotelByName } from '../services/hotelService'; // Adjust import path

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadedHotelName, setLoadedHotelName] = useState(null);

    const loadHotel = useCallback(async (hotelName) => {
        if (hotelName === loadedHotelName) return; // Skip fetching if hotel data is already loaded

        setLoading(true);
        try {
            const fetchedHotel = await getHotelByName(hotelName);
            setHotel(fetchedHotel);
            setLoadedHotelName(hotelName); // Cache the loaded hotel name
        } catch (error) {
            console.error('Error fetching hotel:', error);
        } finally {
            setLoading(false);
        }
    }, [loadedHotelName]);

    return (
        <HotelContext.Provider value={{ hotel, loading, loadHotel }}>
            {children}
        </HotelContext.Provider>
    );
};

export const useHotel = () => useContext(HotelContext);
