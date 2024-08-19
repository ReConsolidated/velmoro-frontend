// Spinner.jsx
import React from 'react';

const Spinner = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
        </div>
    );
};

export default Spinner;
