import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import BreadCrumbs from '../ReUsables/BreadCrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ScrollToTopButton from '../ReUsables/ScrollToTopButton';
const Cart = () => {
  const { cartItems, setCartItems, setPage } = useContext(MenuContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const navigate = useNavigate()

  document.title = "ORDER UP - Cart"
  useEffect(() => {
    const Price = sum(cartItems.map(item => item.price))
    const count = sum(cartItems.map(item => item.quantity))
    setTotalPrice(Price)
    setTotalCount(count)
    setPage("Cart")
    console.log(cartItems)
  }, [cartItems])

  const sum = items => { return items.reduce((prevVal, currVal) => prevVal + currVal, 0) }
  const removeItem = (id) => {
    const filteredItems = cartItems.filter(cart => cart._id !== id)
    setCartItems(filteredItems)
  }

  const changeQuantity = (cartItem, newQuantity) => {
    const unitPrice = cartItem.price / cartItem.quantity; //genious move

    const updatedCartItems = cartItems.map(item =>
      item._id === cartItem._id
        ? {
          ...item,
          quantity: newQuantity,
          price: unitPrice * newQuantity
        }
        : item
    );

    setCartItems(updatedCartItems);
  };

  const groupedItems = cartItems.reduce((groups, item) => {
    const { restName } = item;
    if (!groups[restName]) {
      groups[restName] = [];
    }
    groups[restName].push(item);
    return groups;
  }, {});

  const removeProductsByRestName = (restName) => {
    setCartItems(cartItems.filter(item => item.restName !== restName));
  }


  return (
    <div className="mt-5">
      <BreadCrumbs />
      {Object.entries(groupedItems).map(([restName, items]) => (
        <div key={restName} className="card mb-5 container">
          <div className="card-header d-flex">
            <b className='ms-3 fs-4'>{restName}</b>
            <div className='ms-auto me-5 mt-2'>
              <FontAwesomeIcon className='fa-xl me-5'
                onClick={() => { removeProductsByRestName(restName) }} icon={faTrash} style={{ color: 'red', cursor: 'pointer' }} />
            </div>
          </div>
          <div className="card-body p-0">
            {items.map((item, idx) => (
              <div key={idx} className="row mt-3">
                <div className="col-2 cartQty d-flex justify-content-center align-items-center">
                  <select
                    defaultValue={item.quantity}
                    className="form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={e => changeQuantity(item, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <div className="col-3 cartImg py-3">
                  <img style={{ width: '150px', height: '90px'}} src={item.image} alt={item.name} />
                </div>

                <div className="col-2 cartName d-flex justify-content-start align-items-center">
                  <div>{item.name}</div>
                </div>

                <div className="col-2 cartPrice d-flex justify-content-center align-items-center">
                  <div><b>Rs. {item.price}</b></div>
                </div>

                <div className="col-3 cartRem d-flex justify-content-center align-items-center">
                  <button className="btn btn-sm rounded-pill btn-outline-danger" onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
                <hr className='m-0 p-0 my-3' />
              </div>
            ))}
          </div>
          <div className="d-flex">
            <div className='ms-auto me-2 mb-2'>
              <b className="me-5 fs-5">Subtotal: Rs. {sum(items.map(item => item.price))}</b>
            </div>
          </div>
        </div>
      ))}
      <div className='container'>
        {cartItems.length!==0 && 
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
                <img src="empty-cart.jpg" alt="" />
              </center>
            </div>
            <h3 className='text-center mt-5'>No Items in cart. <Link to='/menu'>Click to add!</Link> </h3>
          </>}
        {cartItems.length !== 0 && <Link to={"/checkout"}><button className='btn btn-outline-success float-end mt-1 mb-5 me-4'>Go to Checkout</button></Link>}
      </div>
      <ScrollToTopButton />
    </div>

  );

}


export default Cart
