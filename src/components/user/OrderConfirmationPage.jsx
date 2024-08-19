import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHotel } from "../../context/HotelContext.jsx";
import { useTranslation } from 'react-i18next';

const OrderConfirmationPage = () => {
    const location = useLocation();
    const { hotel } = useHotel();
    const { order } = location.state || {};
    const navigate = useNavigate();
    const { t } = useTranslation(); // Hook do tłumaczeń

    useEffect(() => {
        const element = document.getElementById(`scroll-tag`);
        if (element) {
            element.scrollIntoView({ block: 'center' });
        }
    }, []);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="max-w-3xl w-full mb-16">
                <h1 id="scroll-tag" className="text-4xl font-bold mb-6 text-center">{
                    t('thankYouForOrder')
                        .replace("<name>", order.name)
                        .replace("<roomNumber>", order.roomNumber)
                }</h1>
                <p className="text-lg mb-4 text-center">{t('orderSuccess')}</p>
                {order && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">{t('orderSummary')}</h2>
                        <div className="space-y-4">
                            {order.orderEntries.map((entry, index) => (
                                <div key={index} className="flex items-start border-b pb-4">
                                    {/* Image Section */}
                                    <div className="w-20 h-20 flex-shrink-0 mr-4">
                                        <img
                                            src={entry.item.imageUrl || '/default-image.png'} // Placeholder if no image
                                            alt={`Item ${entry.item.displayName}`}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    {/* Item Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">{entry.item.displayName}</h3>
                                        <p className="text-base text-gray-700 mb-1">
                                            {entry.totalPrice.toLocaleString('pl-PL', {
                                                style: 'currency',
                                                currency: 'PLN'
                                            })}
                                        </p>
                                        <p className="text-base text-gray-600">
                                            {t('quantity')}: {entry.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                <p className="text-lg text-gray-600 mt-6 text-center">{t('orderCompletionTime')}</p>
            </div>
            <div className="flex bg-green-500 text-white fixed inset-x-0 bottom-0 z-10">
                <button
                    onClick={() => navigate(`/` + hotel.urlName + '/menu')}
                    className="w-full border-t border-r border-gray-300 bg-gray-800 text-white text-lg p-4 font-bold hover:bg-gray-900"
                >
                    {t('backToMenu')}
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
