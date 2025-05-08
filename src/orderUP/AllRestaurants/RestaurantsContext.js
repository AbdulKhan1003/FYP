import React, { createContext, useEffect, useState } from 'react';

const MenuContext = createContext();

const RestaurantsContext = (props) => {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('Cart Items')) || []
    );
    const [rest, setRest] = useState(null)
    const [cartQuantity, setCartQuantity] = useState(0)
    const [page, setPage] = useState(null)
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('User')) || {}
    );
    const [order, setOrder] = useState(false)
    const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
    const [riderLocation, setRiderLocation] = useState({ lat: null, lng: null });
    const API_URL = "http://192.168.1.11:8080/api"


    useEffect(() => {
        localStorage.setItem('Cart Items', JSON.stringify(cartItems));

        const allItems = cartItems.flatMap(rest => rest.order);
        const totalQuantity = allItems.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setCartQuantity(totalQuantity);

    }, [cartItems]);


    useEffect(() => {
        localStorage.setItem('User', JSON.stringify(user));
    }, [user]);



    return (
        <MenuContext.Provider value={{
            cartItems, setCartItems, rest, setRest, userLocation, setUserLocation, riderLocation, setRiderLocation,
            cartQuantity, setCartQuantity, user, setUser, page, setPage, order, setOrder, API_URL
        }}>
            {props.children}
        </MenuContext.Provider>
    );
};

export { MenuContext, RestaurantsContext };
