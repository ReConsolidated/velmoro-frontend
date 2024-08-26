import React from 'react';
import { Outlet } from 'react-router-dom';
import {useHotel} from "../context/HotelContext.jsx";

const UserDashboard = () => {
    const { hotel } = useHotel();
    return (
        <div className="flex flex-col h-screen relative scroll-pb-16">
            <div
                className="flex justify-start items-center text-white text-2xl bg-secondary z-30 w-full fixed">
                <div className="p-3 pr-2 text-center">
                    <img src="/logo-white.svg" alt="Velmoro Logo" className="h-10 w-10"/>
                </div>
                <div className="flex justify-between w-full pr-2">
                    <div className="p-3 pl-0 text-center logo-font">
                        Velmoro
                    </div>
                    <div className="p-3 pl-0 text-center">
                        {hotel.displayName}
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default UserDashboard;
