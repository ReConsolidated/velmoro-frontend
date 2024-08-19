import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMenuItemById } from '../../services/menuItemService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';
import { useHotel } from "../../context/HotelContext.jsx";
import Spinner from "../Spinner.jsx";
import { useTranslation } from 'react-i18next'; // Importuj useTranslation

const MenuItemDetails = () => {
    const { hotel } = useHotel();
    const { id } = useParams();
    const [menuItem, setMenuItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [cartTotal, setCartTotal] = useState(0); // Nowy stan dla wartości koszyka
    const { addToCart, cartItems } = useCart();
    const navigate = useNavigate();
    const modalRef = useRef(null); // Ref do kontenera modala

    const { t } = useTranslation(); // Użyj hooka useTranslation

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const data = await getMenuItemById(id);
                setMenuItem(data);
            } catch (error) {
                console.error('Failed to fetch menu item:', error);
            }
        };

        fetchMenuItem();
    }, [id]);

    useEffect(() => {
        // Obliczanie wartości koszyka po dodaniu przedmiotu
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setCartTotal(total);
    }, [cartItems]);

    const handleAddToCart = () => {
        addToCart(menuItem, quantity);
        setModalOpen(true);
    };

    const incrementQuantity = () => {
        if (quantity < 9) {
            setQuantity(prev => prev + 1);
        }
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleNavigateToMenu = () => {
        navigate(`/` + hotel.urlName + '/menu');
        handleCloseModal();
    };

    const handleProceedToCart = () => {
        navigate(`/` + hotel.urlName + '/cart');
        handleCloseModal();
    };

    // Zamknij modal po kliknięciu na zewnątrz
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef]);

    if (!menuItem) {
        return <Spinner />;
    }

    return (
        <div className="">
            <div className="">
                {menuItem.imageUrl ? (
                    <img
                        src={menuItem.imageUrl}
                        alt={menuItem.displayName}
                        className="w-full h-60 object-cover"
                    />
                ) : (
                    <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                        <span className="text-gray-500">{t('noImage')}</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-1">{menuItem.displayName}</h1>
                <p className="text-lg font-medium text-gray-800 mb-4">
                    {menuItem.price.toLocaleString('pl-PL', {minimumFractionDigits: 2})} zł
                </p>
                <p className="text-gray-700 mb-6">{menuItem.description}</p>

                {/* Pole do wyboru ilości */}
                <div className="flex items-center mb-6 space-x-6">
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={decrementQuantity}
                            className="bg-transparent text-gray-700 hover:text-gray-900 p-1 rounded-full border-none"
                            disabled={quantity <= 1}
                        >
                            <FontAwesomeIcon icon={faMinusCircle} size="2x"/>
                        </button>
                        <span className="text-2xl border-2 rounded-xl p-1 text-center w-10">{quantity}</span>
                        <button
                            onClick={incrementQuantity}
                            className="bg-transparent text-gray-700 hover:text-gray-900 p-1 rounded-full border-none"
                        >
                            <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
                        </button>
                    </div>


                </div>
            </div>
            <div className="flex bg-green-500 text-white fixed inset-x-0 bottom-0 z-10">
                <button
                    onClick={() => navigate(`/` + hotel.urlName + '/menu')}
                    className="w-1/3 border-t border-r border-gray-300 bg-gray-800 text-white text-lg p-4 font-bold hover:bg-gray-900"
                >
                    {t('backToMenu')}
                </button>
                <button
                    onClick={handleAddToCart}
                    className="w-2/3 border-t border-gray-300 bg-yellow-500 text-white text-lg p-4 font-bold hover:bg-yellow-600"
                >
                    {t('addToCart')}
                </button>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div ref={modalRef}
                         className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-4 sm:mx-8 lg:mx-12 flex flex-col">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-4">{t('success')}</h2>
                            <p className="text-xl mb-4">
                                {t('itemAddedToCart')}
                            </p>
                        </div>
                        <div className="flex flex-col space-y-2 mt-auto">
                            <button
                                onClick={handleNavigateToMenu}
                                className="w-full h-14 bg-gray-700 hover:bg-gray-400 text-white font-bold rounded-md text-lg flex items-center justify-center"
                            >
                                {t('backToMenu')}
                            </button>
                            <button
                                onClick={handleProceedToCart}
                                className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg rounded-md flex items-center justify-center"
                            >
                                {t('viewCart')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuItemDetails;
