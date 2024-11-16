import React, { useContext } from 'react'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'

function BreadCrmbs() {
    const {page} = useContext(MenuContext)
    return (
            <div className='breadCrumb d-flex justify-content-center'
                style={{ "--bs-breadcrumb-divider": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='13'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E\")" }} aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item fs-3"><a style={{ textDecoration: "none" }} className={`${page === "Cart" ? "text-dark" : "text-secondary"}`} href="/cart">Cart</a></li>
                    <li className="breadcrumb-item fs-3"><a style={{ textDecoration: "none" }} className={`${page === "Checkout" ? "text-dark" : "text-secondary"}`} href="/checkout">Checkout</a></li>
                    <li className="breadcrumb-item fs-3"><a style={{ textDecoration: "none" }} className={`${page === "OrderPlaced" ? "text-dark" : "text-secondary"}`} href="/orderComplete">Order Complete</a></li>
                </ol>
            </div>
    )
}

export default BreadCrmbs
