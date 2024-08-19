import React, {useEffect, useState} from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import {useCart} from "../context/CartContext.jsx";

const CartIcon = () => {

    const { cartItems } = useCart();
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(cartItems.length);
    }, [cartItems]);

    return (
        <div className="relative flex items-center">
            <FaShoppingCart size={24} />
            {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5">
                    {cartItemCount}
                </span>
            )}
        </div>
    );
};

export default CartIcon;
