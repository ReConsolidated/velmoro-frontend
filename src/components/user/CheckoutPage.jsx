import React, { useEffect, useState, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';
import { useHotel } from "../../context/HotelContext.jsx";
import { useTranslation } from 'react-i18next';
import {logEvent} from "../../services/logEvents.js";

const CheckoutPage = () => {
    const { hotel } = useHotel();
    const { cartItems, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [roomNumber, setRoomNumber] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({});
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation(); // Hook do tłumaczeń

    // Dodajemy referencje do pól formularza
    const roomNumberRef = useRef(null);
    const nameRef = useRef(null);

    useEffect(() => {
        if (hotel.urlName && cartItems.length) {
            logEvent('CHECKOUT', `User in ${hotel.urlName} got to checkout with ${cartItems.length} items.`);
        }
    }, [hotel, cartItems]);

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate(`/${hotel.urlName}/menu`);
        }
    }, [hotel.urlName, navigate, cartItems]);

    const validate = () => {
        const newErrors = {};
        let firstInvalidFieldRef = null;

        if (!roomNumber) {
            newErrors.roomNumber = t('roomNumberRequired');
            firstInvalidFieldRef = roomNumberRef;
        } else if (roomNumber < 1 || roomNumber > 50) {
            newErrors.roomNumber = t('roomNumberRange');
            firstInvalidFieldRef = roomNumberRef;
        }

        if (!name) {
            newErrors.name = t('nameRequired');
            if (!firstInvalidFieldRef) firstInvalidFieldRef = nameRef;
        }

        setErrors(newErrors);

        // Scrollowanie do pierwszego pola z błędem
        if (firstInvalidFieldRef) {
            firstInvalidFieldRef.current.scrollIntoView({ behavior: 'smooth' });
        }

        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        // Walidacja formularza
        if (!validate()) {
            logEvent('FAILED_VALIDATION', `User in ${hotel.urlName} failed validation, name: ${name}, roomNumber: ${roomNumber}.`);
            return;
        }

        setIsLoading(true);

        // Przygotowanie zamówienia
        const order = {
            orderEntries: cartItems.map(item => ({
                item: item,
                totalPrice: item.price * item.quantity,
                quantity: item.quantity,
            })),
            hotel: hotel,
            dateCreated: new Date(), // Zmieniono z dateAdded na dateCreated
            emailSentDate: null,
            emailReadDate: null,
            roomNumber,
            name,
        };

        try {
            // Tworzenie zamówienia
            const newOrder = await createOrder(order);

            // Czyszczenie koszyka po złożeniu zamówienia
            clearCart();
            localStorage.removeItem('cartItems'); // Usuwanie koszyka z localStorage
            logEvent('ORDER_PLACED', `User in ${hotel.urlName} placed order: ${name}, roomNumber: ${roomNumber}, items: ${cartItems.length}.`);
            // Nawigacja do strony z potwierdzeniem zamówienia
            navigate(`/` + hotel.urlName + '/order-confirmation', { state: { order: newOrder } });
        } catch (error) {
            console.error('Błąd podczas składania zamówienia:', error);
            logEvent('ORDER_ERROR', `User in ${hotel.urlName} got error when placing order placed order: 
            ${name}, roomNumber: ${roomNumber}, items: ${cartItems.length}.
            Error: ${error}`);
            // Ustawienie wiadomości błędu i otwarcie modalu
            setErrorMessage(t('orderError'));
            setErrorModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 mb-8 mt-14">
            <h1 className="text-3xl font-bold mb-6">{t('checkoutTitle')}</h1>
            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between border-b pb-4">
                        <div>
                            <h2 className="text-xl font-semibold">{item.displayName}</h2>
                            <p className="text-lg color-secondary">
                                {item.price.toLocaleString('pl-PL', {
                                    style: 'currency',
                                    currency: 'PLN'
                                })} x {item.quantity}
                            </p>
                        </div>
                        <p className="text-lg font-bold">
                            {(item.price * item.quantity).toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})}
                        </p>
                    </div>
                ))}
            </div>
            <div className="mt-2 mb-36 space-y-4">
                <h2 className="text-2xl text-right font-bold mb-2">
                    {t('total')}:&nbsp;
                    {cartItems
                        .reduce((acc, item) => acc + item.price * item.quantity, 0)
                        .toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})}
                </h2>
                <div className="mb-4">
                    <label className="block text-xl bg-white text-black font-medium mb-2" htmlFor="name">
                        {t('name')}
                    </label>
                    <input
                        ref={nameRef} // Dodajemy referencję do inputa
                        type="text"
                        id="first-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full p-2 border bg-white text-black rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('namePlaceholder')}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-xl font-medium mb-2" htmlFor="room">
                        {t('roomNumber')}
                    </label>
                    <input
                        ref={roomNumberRef} // Dodajemy referencję do inputa
                        type="number"
                        pattern="\d*"
                        inputMode="numeric"
                        id="room"
                        value={roomNumber}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                                setRoomNumber(value);
                            }
                        }}
                        step="1"
                        className={`w-full p-2 bg-white text-black border rounded-md ${errors.roomNumber ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={t('roomNumberPlaceholder')}
                    />
                    {errors.roomNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.roomNumber}</p>
                    )}
                </div>
                <p className="text-sm text-gray-600">
                    {t('orderTerms')}
                </p>
            </div>
            <div className="flex bg-fourth text-white fixed inset-x-0 bottom-0 z-10">
                <button
                    onClick={() => navigate(`/` + hotel.urlName + '/menu')}
                    className="w-1/3 border-t border-r border-gray-300 bg-secondary text-white text-lg p-4 py-8 font-bold hover:bg-gray-900"
                >
                    {t('backToMenu')}
                </button>
                <button
                    onClick={handlePlaceOrder}
                    className="w-2/3 border-t border-gray-300 bg-fourth text-white text-xl font-bold hover:bg-green-600 py-2"
                    disabled={isLoading}
                >
                    {isLoading ? t('placingOrder') : t('placeOrder')}
                </button>
            </div>

            {errorModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-6 rounded-md shadow-lg z-10">
                        <h2 className="text-xl font-bold mb-4">{t('error')}</h2>
                        <p className="mb-4">{errorMessage}</p>
                        <button
                            onClick={() => setErrorModalOpen(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            {t('close')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
