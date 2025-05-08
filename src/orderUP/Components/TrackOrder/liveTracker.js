import React, { useContext, useEffect } from 'react'
import DeliveryMap from './DeliveryMap'
import { MenuContext } from '../../AllRestaurants/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LiveTracker = () => {
    const { userLocation, riderLocation } = useContext(MenuContext)
    const nav = useNavigate()

    useEffect(() => {
        if (userLocation.lat === null || riderLocation.lat === null) {
            setTimeout(() => {
            Swal.fire({
                title: "Error",
                text: 'Issue fetching location. Please try again',
                icon: 'warning'
            });
                nav("/profile");
            }, 2000);
        }
    }, [userLocation.lat, riderLocation.lat]);


    if (userLocation.lat === null || riderLocation.lat === null) {
        return (<h3 className='text-center mt-3'>Fetching Location...</h3>)
    }

    return (
        <>
            <DeliveryMap
                userPos={[userLocation.lat, userLocation.lng]}
                riderPos={[riderLocation.lat, riderLocation.lng]}
            />
        </>
    );
}

export default LiveTracker
