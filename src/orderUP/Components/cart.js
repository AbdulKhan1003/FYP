import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import BreadCrumbs from '../ReUsables/BreadCrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ScrollToTopButton from '../ReUsables/ScrollToTopButton';

const Cart = () => {
  const { cartItems, setCartItems, setPage, API_URL } = useContext(MenuContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  document.title = "ORDER UP - Cart"

  const sum = items => items.reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    const allItems = cartItems.flatMap(rest => rest.order);
    const price = sum(allItems.map(item => item.price));
    const count = sum(allItems.map(item => item.quantity));
    setTotalPrice(price);
    setTotalCount(count);
    setPage("Cart");
    console.log("CI", cartItems)
  }, [cartItems]);

  const removeItem = (id) => {
    const updatedCartItems = cartItems.map(rest => ({
      ...rest,
      order: rest.order.filter(item => item._id !== id)
    })).filter(rest => rest.order.length > 0);
    setCartItems(updatedCartItems);
  }

  const changeQuantity = (targetItem, newQuantity) => {
    const updatedCartItems = cartItems.map(rest => ({
      ...rest,
      order: rest.order.map(item => {
        if (item._id === targetItem._id) {
          const unitPrice = item.price / item.quantity;
          return {
            ...item,
            quantity: newQuantity,
            price: unitPrice * newQuantity
          }
        }
        return item;
      })
    }));
    setCartItems(updatedCartItems);
  }

  const removeProductsByRestName = (restName) => {
    const updatedCartItems = cartItems.filter(rest => rest.restaurant.name !== restName);
    setCartItems(updatedCartItems);
  }

  return (
    <div className="mt-5">
      <BreadCrumbs />
      {cartItems.map((rest, index) => (
        <div key={index} className="card mb-5 container">
          <div className="card-header d-flex align-items-center">
            {/* Optional logo display */}
            {/* <img src={`${API_URL}/images/${rest.restaurant.logo}`} alt="logo" style={{ width: 40, height: 40, marginRight: 10 }} /> */}
            <b className='ms-3 fs-4'>{rest.restaurant.name}</b>
            <div className='ms-auto me-5 mt-2'>
              <FontAwesomeIcon
                className='fa-xl me-5'
                onClick={() => removeProductsByRestName(rest.restaurant.name)}
                icon={faTrash}
                style={{ color: 'red', cursor: 'pointer' }}
              />
            </div>
          </div>
          <div className="card-body p-0">
            {rest.order.map((item, idx) => (
              <div key={idx} className="row mt-3">
                <div className="col-2 cartQty d-flex justify-content-center align-items-center">
                  <select
                    value={item.quantity}
                    className="form-select-sm"
                    onChange={e => changeQuantity(item, Number(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="col-3 cartImg py-3">
                  <img
                    style={{ width: '150px', height: '90px' }}
                    src={`${API_URL}/images/${item.image}`}
                    alt={item.name}
                  />
                </div>
                <div className="col-2 cartName d-flex justify-content-start align-items-center">
                  <div>{item.name}</div>
                </div>
                <div className="col-2 cartPrice d-flex justify-content-center align-items-center">
                  <div><b>Rs. {item.price}</b></div>
                </div>
                <div className="col-3 cartRem d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-sm rounded-pill btn-outline-danger"
                    onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
                <hr className='m-0 p-0 my-3' />
              </div>
            ))}
          </div>
          <div className="d-flex">
            <div className='ms-auto me-2 mb-2'>
              <b className="me-5 fs-5">Subtotal: Rs. {sum(rest.order.map(item => item.price))}</b>
            </div>
          </div>
        </div>
      ))}

      <div className='container'>
        {cartItems.length !== 0 &&
          <>
            <div className="d-flex justify-content-end me-3">
              <h5 className='ms-auto text-bold fw-bold'>Item Count: {totalCount}</h5>
            </div>
            <div className="d-flex justify-content-end me-3">
              <h5 className='ms-auto text-bold fw-bold'>Total Price: {totalPrice}</h5>
            </div>
          </>}

        {cartItems.length === 0 &&
          <>
            <div className='emptyCart m-0 p-0'>
              <center>
                <img src="empty-cart.jpg" alt="empty" />
              </center>
            </div>
            <h3 className='text-center mt-5'>No Items in cart. <Link to='/menu'>Click to add!</Link> </h3>
          </>}

        {cartItems.length !== 0 &&
          <Link to="/checkout">
            <button className='btn btn-outline-success float-end mt-1 mb-5 me-4'>Go to Checkout</button>
          </Link>}
      </div>

      <ScrollToTopButton />
    </div>
  );
}

export default Cart;
