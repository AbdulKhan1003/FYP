import React, { useContext, useEffect } from 'react'
import DeliveryMap from './DeliveryMap'
import { MenuContext } from '../../AllRestaurants/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const LiveTracker = (props) => {
    const { userLocation, riderLocation } = useContext(MenuContext)
    const nav = useNavigate()

    useEffect(() => {
        if (userLocation.lat === null || riderLocation.lat === null) {
            Swal.fire({
                title: "Error",
                text: 'Issue fetching location. Please try again',
                icon: 'warning'
            });
            nav("/profile");
        }
    }, [userLocation.lat, riderLocation.lat]);


    if (userLocation.lat === null || riderLocation.lat === null) {
        return null;
    }

    return (
        <>
            <DeliveryMap
                userPos={[userLocation.lat, userLocation.lng]}
                riderPos={[riderLocation.lat, riderLocation.lng]}
            />
            <Toaster />
        </>
    );
}

export default LiveTracker
