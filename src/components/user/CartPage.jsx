import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHotel } from "../../context/HotelContext.jsx";
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {logEvent} from "../../services/logEvents.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const CartPage = () => {
    const { hotel } = useHotel();
    const { cartItems, removeFromCart, updateItemQuantity } = useCart();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);

    useEffect(() => {
        logEvent('CART_OPEN', `User opened the cart page at ${new Date().toISOString()}`);
    }, []);

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity >= 1 && quantity < 10) {
            updateItemQuantity(itemId, quantity);
        }
    };

    const handleRemoveFromCart = (item) => {
        removeFromCart(item.id);
        logEvent('REMOVE_FROM_CART', `Removed item ${item.displayName} from cart`);
    }

    const isInWorkingHours = () => {
        const now = dayjs().tz('Europe/Warsaw');
        const workStart = dayjs().tz('Europe/Warsaw').hour(hotel.workStartHour).minute(0);
        const workEnd = dayjs().tz('Europe/Warsaw').hour(hotel.workEndHour).minute(0);

        if (workStart.isBefore(workEnd)) {
            return now.isAfter(workStart) && now.isBefore(workEnd);
        } else {
            return now.isAfter(workStart) || now.isBefore(workEnd);
        }
    };

    const handleProceedToCheckout = () => {
        if (isInWorkingHours()) {
            navigate(`/` + hotel.urlName + '/checkout');
        } else {
            setIsClosedModalOpen(true);
        }
    };

    return (
        <div className="p-4 sm:p-6 relative mt-16 mb-32">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">{t('cartTitle')}</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p className="text-lg">{t('emptyCartMessage')}</p>
                    <div className="flex bg-fourth text-white fixed inset-x-0 bottom-0 z-10">
                        <button
                            onClick={() => navigate(`/` + hotel.urlName + '/menu')}
                            className="w-full border-t border-r border-gray-300 bg-secondary text-white text-lg p-4 py-8 font-bold hover:bg-gray-900"
                        >
                            {t('backToMenu')}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 mb-16">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start border-b pb-4"
                        >
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.displayName}</h2>
                                    <p className="text-base color-secondary mb-2">
                                        {(item.price * item.quantity).toLocaleString('pl-PL', {
                                            style: 'currency',
                                            currency: 'PLN'
                                        })}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center space-x-2 mt-2">
                                    <div className="flex items-center space-x-1">
                                        <button
                                            onClick={() => handleRemoveFromCart(item)}
                                            className="mr-12 bg-transparent color-secondary hover:text-red-700 p-1 rounded-full border-none"
                                        >
                                            <FontAwesomeIcon icon={faTrash} size="xl"/>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item.id, item.quantity - 1)
                                            }
                                            className="bg-transparent color-secondary hover:text-gray-900 p-1 rounded-full border-none"
                                            disabled={item.quantity <= 1}
                                        >
                                            <FontAwesomeIcon icon={faMinusCircle} size="2x"/>
                                        </button>
                                        <span
                                            className="text-xl border-2 rounded-xl p-1 text-center w-10">{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                handleQuantityChange(item.id, item.quantity + 1)
                                            }
                                            className="bg-transparent color-secondary hover:text-gray-900 p-1 rounded-full border-none"
                                        >
                                            <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {item.imageUrl ? (
                                <div className="w-20 h-20 flex-shrink-0 mr-4">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.displayName}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                            ) : (<div></div>) }
                        </div>
                    ))}
                    <div className="h-12 text-transparent">
                        {t('endOfCart')}
                    </div>
                    <div className="flex bg-fourth text-white fixed inset-x-0 bottom-0 z-10">
                        <button
                            onClick={() => navigate(`/` + hotel.urlName + '/menu')}
                            className="w-1/3 border-t border-r border-gray-300 bg-secondary text-white text-lg p-4 py-8 font-bold hover:bg-gray-900"
                        >
                            {t('backToMenu')}
                        </button>
                        <button
                            onClick={handleProceedToCheckout}
                            className="w-2/3 border-t border-gray-300 bg-fifth text-white text-lg p-4 font-bold hover:bg-yellow-600"
                        >
                            {t('proceedToCheckout')}
                        </button>
                    </div>
                </div>
            )}

            {/* Custom Modal */}
            {isClosedModalOpen && (
                <div className="fixed inset-0 bg-third bg-opacity-75 z-40 flex items-center justify-center">
                    <div className="bg-white m-4 p-6 rounded-lg shadow-lg max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">{t('closedModalTitle')}</h2>
                        <p>{t('closedModalMessage', { openTime: hotel.workStartHour, closeTime: hotel.workEndHour })}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsClosedModalOpen(false)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                {t('okButton')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
