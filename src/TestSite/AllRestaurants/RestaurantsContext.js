import React, { createContext, useEffect, useState } from 'react';

const restaurants = [
    {
        rID: 1,
        restaurantImage: "Anaya-Chinese.webp",
        restaurantName: "Anaya Chinese",
        location: '79-A Farid Town Rd، near Sui Gas Office, Canal Colony',
        city: 'Sahiwal',
        isAvailableRestaurant: false,
        deliveryTime: '10-15 min',
        type: ['Desi', 'Pakistani', 'Continental'],
        products: [{
            pID: 1,
            pName: 'Chicken Karahi',
            desc: 'Description of Chicken Karahi.',
            isAvailable: true,
            image: '/foods/chicken-karahi.jpg',
            price: 1200,
            priceFull: 2100,
            size: ['Half', 'Full'],
            quantity: 1,
            stock: 6
        },
        {
            pID: 2,
            pName: 'Chowmain',
            desc: 'Description of Chowmain.',
            isAvailable: false,
            image: "/foods/chowmain.jpg",
            price: 850,
            priceFull: 1600,
            size: ['Half', 'Full'],
            quantity: 1,
            stock: 15
        },
        {
            pID: 3,
            pName: 'Pulao',
            desc: 'Description of Pulao.',
            isAvailable: true,
            image: "/foods/pulao.jpg",
            price: 999,
            priceFull: 1750,
            size: ['Half', 'Full'],
            quantity: 1,
            stock: 10
        },
        {
            pID: 4,
            pName: 'Beef Biryani',
            desc: 'Description of Beef Biryani.',
            isAvailable: true,
            image: "/foods/beef-biryani.jpg",
            price: 600,
            priceFull: 1300,
            size: ['Half', 'Full'],
            quantity: 1,
            stock: 25
        }]
    },
    {
        rID: 2,
        restaurantImage: "FrysGuys.jpg",
        restaurantName: "Frys & Guys",
        location: 'near Faisal Sons, Gujar Ahata',
        city: 'Sahiwal',
        deliveryTime: '20-30 min',
        isAvailableRestaurant: true,
        type: ['Desi', 'Fried', 'Fast Food'],
        products: [{
            pID: 1,
            pName: 'Zinger Burger',
            desc: 'Description of Zinger Burger.',
            isAvailable: true,
            image: '/foods/Zinger-Burger.avif',
            price: 380,
            quantity: 1,
            stock: 6
        },
        {
            pID: 2,
            pName: 'Atomic Burger',
            desc: 'Description of Atomic Burger.',
            isAvailable: false,
            image: "/foods/Atomic-Burger.jpg",
            price: 430,
            quantity: 1,
            stock: 15
        },
        {
            pID: 3,
            pName: 'Loaded Fries',
            desc: 'Description of Loaded Fries.',
            isAvailable: true,
            image: "/foods/loaded-fries.webp",
            price: 550,
            quantity: 1,
            stock: 10
        },
        {
            pID: 4,
            pName: 'Buffalo Wings',
            desc: 'Description of Buffalo Wings.',
            isAvailable: true,
            image: "/foods/wings.jpg",
            price: 410,
            size: ['Half', 'Full'],
            quantity: 1,
            stock: 25
        }]
    },
    {
        rID: 3,
        restaurantImage: "Dominos.jpg",
        restaurantName: "Dominos",
        location: 'Opposite city mart, 5 Girls College Rd',
        city: 'Sahiwal',
        isAvailableRestaurant: true,
        deliveryTime: '20-25 min',
        type: ['International', 'Pakistani', 'Fast Food'],
        products: [{
            pID: 1,
            pName: 'Peri Peri Pizza',
            desc: 'Description of Peri Peri.',
            isAvailable: true,
            image: '/foods/peri-peri.webp',
            price: 400,
            size: ['Small', 'Medium' , 'Large' , 'X-Large'],
            quantity: 1,
            stock: 6
        },
        {
            pID: 2,
            pName: 'Wings',
            desc: 'Description of Wings.',
            isAvailable: true,
            image: "/foods/dominos-wings.avif",
            price: 350,
            size: ['Half', 'Full'],
            quantity: 1,
            stock: 25
        },
        {
            pID: 3,
            pName: 'Meltzz',
            desc: 'Description of Meltzz.',
            isAvailable: false,
            image: "/foods/meltzz.avif",
            price: 350,
            quantity: 1,
            stock: 15
        },
        {
            pID: 4,
            pName: 'Choco Lava Cake',
            desc: 'Description of Choco Lava Cake.',
            isAvailable: true,
            image: "/foods/choco-lava.avif",
            price: 650,
            quantity: 1,
            stock: 10
        },

    ]
    }
]
const MenuContext = createContext();

const RestaurantsContext = (props) => {
    const [restaurant, setRestaurant] = useState(restaurants);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('Cart Items')));

    useEffect(() => {
        localStorage.setItem('Cart Items', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <MenuContext.Provider value={{ restaurant, setRestaurant,cartItems, setCartItems }}>
            {props.children}
        </MenuContext.Provider>
    );
};

export { MenuContext, RestaurantsContext };
