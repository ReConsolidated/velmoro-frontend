// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import MenuPage from "./components/user/MenuPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import CartPage from "./components/user/CartPage.jsx";
import CheckoutPage from "./components/user/CheckoutPage.jsx";
import OrderConfirmationPage from "./components/user/OrderConfirmationPage.jsx";
import MenuItemDetails from "./components/menuItem/MenuItemDetails.jsx";
import { HotelProvider, useHotel } from './context/HotelContext.jsx';
import UserDashboard from "./pages/UserDashboard.jsx";
import Spinner from "./components/Spinner.jsx";
import './i18n';
import i18n from "./i18n.js";

const updateHtmlLang = (lng) => {
    document.documentElement.lang = lng;
};

i18n.on('languageChanged', (lng) => {
    updateHtmlLang(lng);
});

const App = () => {
    useEffect(() => {
        updateHtmlLang(i18n.language);
    }, []);

    return (
        <div className="w-full bg-white text-black">
            <Router>
                <CartProvider>
                    <HotelProvider>
                        <Routes>
                            <Route path="/admin/*" element={<AdminDashboard />} />
                            <Route path="/:hotelName/*" element={<HotelRoutes />} />
                        </Routes>
                    </HotelProvider>
                </CartProvider>
            </Router>
        </div>
    );
};

const HotelRoutes = () => {
    const { hotel, loading, loadHotel } = useHotel();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        const pathSegments = pathname.split('/');
        const hotelName = pathSegments[1];
        if (hotelName && hotelName !== 'admin') {
            loadHotel(hotelName);
        }
    }, [pathname, loadHotel]);

    if (loading) {
        return <Spinner/>; // Show loading spinner or message while data is being fetched
    }

    if (!hotel && pathname !== '/admin') {
        return <div>Nie znaleziono hotelu. Czy to poprawny link?</div>; // Handle cases where the hotel is not found
    }

    return (
        <Routes>
            <Route path="/" element={<UserDashboard/>}>
                <Route index element={<MenuPage />} />
                <Route path="menu" element={<MenuPage />} />
                <Route path="menu-item/:id" element={<MenuItemDetails />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            </Route>
        </Routes>
    );
};

export default App;
