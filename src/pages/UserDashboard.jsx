import React from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className="flex flex-col h-screen relative scroll-pb-16">
            <div className="flex-1 overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    );
};

export default UserDashboard;
