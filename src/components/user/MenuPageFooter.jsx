import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUtensils, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import {useHotel} from "../../context/HotelContext.jsx";
import CartIcon from "../CartIcon.jsx";

const MenuPageFooter = () => {
    const location = useLocation();
    const { hotel } = useHotel();
    const { i18n, t } = useTranslation(); // Hook do tłumaczeń
    const [languageMenuOpen, setLanguageMenuOpen] = useState(localStorage.getItem('language-chosen') === null);

    const toggleLanguageMenu = () => {
        setLanguageMenuOpen(!languageMenuOpen);
    };

    const closeLanguageMenu = () => {
        setLanguageMenuOpen(false);
        localStorage.setItem('language-chosen', i18n.language);
    };

    const changeLanguage = (lng) => {
        localStorage.setItem('language-chosen', lng);
        i18n.changeLanguage(lng);
        closeLanguageMenu();
    };

    return (
        <div className="">
            <nav className="bg-gray-800 text-white fixed inset-x-0 bottom-0 z-10 pt-1">
                <ul className="flex justify-around items-center py-4">
                    <li className="flex-1 h-full">
                        <Link
                            to={`/${hotel.urlName}/menu`}
                            className={`flex flex-col items-center justify-center h-full ${location.pathname.includes('/menu') ? 'text-yellow-400' : ''}`}
                        >
                            <FaUtensils size={24}/>
                            <span className="mt-1 text-sm">{t('menu')}</span>
                        </Link>
                    </li>
                    <li className="flex-1 h-full">
                        <Link
                            to={`/${hotel.urlName}/cart`}
                            className={`flex flex-col items-center justify-center h-full ${!location.pathname.includes('/menu') ? 'text-yellow-400' : ''}`}
                        >
                            <CartIcon/>
                            <span className="mt-1 text-sm">{t('cart')}</span>
                        </Link>
                    </li>
                    <li className="flex-1 h-full">
                        <button
                            onClick={toggleLanguageMenu}
                            className="flex flex-col items-center justify-center h-full w-full"
                        >
                            <FaGlobe size={24}/>
                            <span className="mt-1 text-sm">{t('language')}</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="bg-transparent text-transparent inset-x-0 bottom-0 z-9 pt-1 h-16">
                {t('panel')}
            </div>
            {languageMenuOpen && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>
                    <div className="fixed inset-0 flex items-center justify-center z-30">
                        <div className="bg-white rounded-lg p-6 w-80 max-w-xs shadow-lg relative">
                            <button onClick={closeLanguageMenu}
                                    className="absolute top-2 right-2 text-gray-700 hover:text-gray-900">
                                <FiX size={20}/>
                            </button>
                            <ul>
                                <li className="cursor-pointer hover:bg-gray-200 py-3 px-4 flex items-center border-b border-gray-300"
                                    onClick={() => changeLanguage('en')}>
                                    <img
                                        src="https://flagcdn.com/h120/gb.png"
                                        alt="English"
                                        className="w-8 h-5 mr-3 border border-gray-300 rounded-sm"
                                    />
                                    <span className="text-xl">{t('english')}</span>
                                </li>
                                <li className="text-lg cursor-pointer hover:bg-gray-200 py-3 px-4 flex items-center border-b border-gray-300"
                                    onClick={() => changeLanguage('pl')}>
                                    <img
                                        src="https://flagcdn.com/h120/pl.png"
                                        alt="Polski"
                                        className="w-8 h-5 mr-3 border border-gray-300 rounded-sm"
                                    />
                                    <span className="text-xl">{t('polish')}</span>
                                </li>
                                <li className="text-lg cursor-pointer hover:bg-gray-200 py-3 px-4 flex items-center"
                                    onClick={() => changeLanguage('de')}>
                                    <img
                                        src="https://flagcdn.com/h120/de.png"
                                        alt="Deutsch"
                                        className="w-8 h-5 mr-3 border border-gray-300 rounded-sm"
                                    />
                                    <span className="text-xl">{t('german')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MenuPageFooter;
