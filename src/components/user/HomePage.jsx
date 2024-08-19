import React from 'react';
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h2>Home Page</h2>
            <p className="bg-red-600">Welcome to the user application!</p>
            <Link to="/menu">Go to Menu</Link>
        </div>
    );
};

export default HomePage;
