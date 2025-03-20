import React, { useContext, useEffect, useState } from "react";
import { MenuContext } from "../AllRestaurants/RestaurantsContext";
import { Link, useNavigate } from "react-router-dom";

const OrderPlaced = () => {
    const { setPage } = useContext(MenuContext);
    const [count, setCount] = useState(10);
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    // Countdown effect
    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount(prev => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            navigate("/profile#Orders"); // Redirect when count reaches 0
        }
    }, [count, navigate]); // Depend on count and navigate

    // Set page and document title
    useEffect(() => {
        document.title = "ORDER UP - Order Placed";
        setPage("OrderPlaced");
    }, [setPage]); // Added `setPage` to dependency array

    return (
        <div className="orderPlaced">
            <div className="order-box">
                <div className="box d-flex flex-column align-items-center">
                    <img
                        src="https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png"
                        style={{ width: "150px", height: "150px" }}
                        alt="Order Success"
                    />
                    <h2>Thank you for the order!</h2>
                    <p className="fs-5 mx-5 text-center">
                        Your order has been placed and it will be with you shortly. You can track your order's progress from&nbsp;
                        <Link to={"/profile#Orders"}>Your Orders</Link>. <br />
                        Till then, feel free to explore our website to gain information about us.
                    </p>
                    <div className="">Redirecting you in {count}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderPlaced;
