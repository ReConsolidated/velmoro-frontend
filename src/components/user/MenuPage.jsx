import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getAllMenuItems, getHotelMenuItems} from '../../services/menuItemService';
import {getAllCategories, getHotelCategories} from "../../services/categoryService.js";
import { useHotel } from "../../context/HotelContext.jsx";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import MenuPageFooter from "./MenuPageFooter.jsx";
import {logEvent} from "../../services/logEvents.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const MenuPage = () => {
    const { urlName, hotel } = useHotel();
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);
    const navigate = useNavigate();
    const headerRef = useRef(null);

    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() => {
        if (isClosedModalOpen) {
            logEvent('CLOSED_HOURS', `User opened menu ${urlName}, but the hotel is currently closed!`);
        } else {
            logEvent('MENU_OPEN', `User opened menu ${urlName}`);
        }
    }, [urlName, isClosedModalOpen]);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const data = await getHotelMenuItems(urlName);
                setMenuItems(data);

                const categories = await getHotelCategories(urlName);
                setCategories(categories);
            } catch (error) {
                console.error('Failed to fetch menu items:', error);
            }
        };

        fetchMenuItems();
    }, [urlName]);

    useEffect(() => {
        const checkWorkingHours = () => {
            const now = dayjs().tz('Europe/Warsaw');
            const workStart = dayjs().tz('Europe/Warsaw').hour(hotel.workStartHour).minute(0);
            const workEnd = dayjs().tz('Europe/Warsaw').hour(hotel.workEndHour).minute(0);

            let isOpen = false;

            if (workStart.isBefore(workEnd)) {
                isOpen = now.isAfter(workStart) && now.isBefore(workEnd);
            } else {
                isOpen = now.isAfter(workStart) || now.isBefore(workEnd);
            }

            if (!isOpen) {
                setIsClosedModalOpen(true);
            }
        };

        checkWorkingHours();
    }, [hotel]);

    const handleScrollToCategory = (categoryId) => {
        const headerElement = headerRef.current;
        if (headerElement) {
            const buttonElement = headerElement.querySelector(`button[data-id='${categoryId}']`);
            if (buttonElement) {
                buttonElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }
        }
        setTimeout(() => {
            const element = document.getElementById(`category-${categoryId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 250);
    };

    return (
        <div className="w-full">
            {/* Category Bar */}
            <div ref={headerRef} className="mt-[3.25rem] h-14 w-full fixed bg-white border-b border-gray-300">
                <div className="flex overflow-x-auto no-scrollbar py-3">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => handleScrollToCategory(category.id)}
                            className="whitespace-nowrap text-lg py-2 px-3"
                            data-id={category.id}
                        >
                            {{
                                en: category.nameEN,
                                de: category.nameDE,
                                pl: category.name
                            }[currentLanguage] || category.name}
                        </button>
                    ))}
                </div>
            </div>
            {/* Menu Items by Category */}
            <div className="mt-28 px-6 pt-2">
                {categories.map(category => (
                    <div
                        key={category.id}
                        id={`category-${category.id}`}
                        className="mb-6 pt-2 scroll-mt-32"
                    >
                        <div className="flex ">
                            {/*{ category.svgUrl ? (*/}
                            {/*    <img src={category.svgUrl} alt="Drink Icon"*/}
                            {/*         className="inline-block max-h-12 max-w-12 mt-[-6px] mr-2"/>*/}
                            {/*) : (<></>)}*/}
                            <h2 className="text-2xl font-semibold">{{
                                en: category.nameEN,
                                de: category.nameDE,
                                pl: category.name
                            }[currentLanguage] || category.name}</h2>
                        </div>
                        <div className="divide-y divide-gray-300">
                            {menuItems
                                .filter(item => item.categoryId === category.id)
                                .map(item => (
                                    <div
                                        key={item.id}
                                        className="flex items-center py-4 cursor-pointer"
                                        onClick={() => navigate(`/${hotel.urlName}/menu-item/${item.id}`)}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-xl">{{
                                                en: item.displayNameEN,
                                                de: item.displayNameDE,
                                                pl: item.displayName
                                            }[currentLanguage] || item.displayName}</h3>
                                            <p className="text-lg font-medium color-secondary mt-1">
                                                {item.price.toLocaleString('pl-PL', {minimumFractionDigits: 2})} zł
                                            </p>
                                        </div>
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.displayName}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="">
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
                <div>
                    <h2 className="text-2xl h-12 text-transparent bg-transparent font-semibold">
                        {i18n.t('categoryName')}
                    </h2>
                </div>
            </div>

            {/* Custom Modal */}
            {isClosedModalOpen && (
                <div className="fixed inset-0 bg-third bg-opacity-75 z-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm m-4">
                        <h2 className="text-lg font-semibold mb-4">{i18n.t('closedModalTitle')}</h2>
                        <p>{i18n.t('closedModalMessage', { openTime: hotel.workStartHour, closeTime: hotel.workEndHour })}</p>
                    </div>
                </div>
            )}

            <MenuPageFooter/>
        </div>
    );
};

export default MenuPage;
