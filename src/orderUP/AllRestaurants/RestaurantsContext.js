import React, { createContext, useEffect, useState } from 'react';

const MenuContext = createContext();

const RestaurantsContext = (props) => {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('Cart Items')) || []
      );
      
    const [restName, setRestName] = useState(null)
    const [restId, setRestId] =useState(null)
    const [cartQuantity, setCartQuantity] = useState(0)
    const [page, setPage] =  useState(null)
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('User')) || {}
      );
    const [order, setOrder] = useState(false)
      

    useEffect(() => {
        localStorage.setItem('Cart Items', JSON.stringify(cartItems));
        setCartQuantity(cartItems.length)
    }, [cartItems]);


    useEffect(() => {
        localStorage.setItem('User', JSON.stringify(user));
    }, [user]);


    return (
        <MenuContext.Provider value={{cartItems, setCartItems,restName, setRestName, restId,setRestId, 
        cartQuantity,setCartQuantity, user,setUser, page,setPage, order,setOrder}}>
            {props.children}
        </MenuContext.Provider>
    );
};

export { MenuContext, RestaurantsContext };
