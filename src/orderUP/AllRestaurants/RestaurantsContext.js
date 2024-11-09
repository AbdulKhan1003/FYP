import React, { createContext, useEffect, useState } from 'react';

const MenuContext = createContext();

const RestaurantsContext = (props) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('Cart Items')));
    const [restName, setRestName] = useState(null)
    const [restId, setRestId] =useState(null)
    const [cartQuantity, setCartQuantity] = useState(0)
    const [user, setUser] = useState({});

    useEffect(() => {
        localStorage.setItem('Cart Items', JSON.stringify(cartItems));
        setCartQuantity(cartItems.length)
    }, [cartItems]);


    return (
        <MenuContext.Provider value={{cartItems, setCartItems,restName, setRestName, restId,setRestId, cartQuantity,setCartQuantity, user,setUser}}>
            {props.children}
        </MenuContext.Provider>
    );
};

export { MenuContext, RestaurantsContext };
