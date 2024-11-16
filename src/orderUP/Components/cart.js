import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import BreadCrumbs from '../ReUsables/BreadCrumbs'

// API me quantity ni haii isliye total count NAN haii. Fix 
//quanity increase ya select me barhao ge to parameter aik add hojaye ga temporairly

//aur price bhi NAN hogi agr increase kii to kwke changeQuantity() me bhi unit price ni calc hogi 
const Cart = () => {
  const { cartItems, setCartItems, setPage } = useContext(MenuContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

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


  return (
    <>
      <BreadCrumbs />
      <div className='container pt-3'>
        {/* <Title heading="Cart"></Title> */}
        {cartItems.length > 0 && <>
          <table className="table table-striped table-responsive mt-5 ">
            <thead>
              <tr>
                <th scope="col">Quantity</th>
                <th className='cartImg' scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* yaha bhi qty jab api me add hojaye ga to testing krke select ura daina haii agr issue kre  */}
              {cartItems.map((item, idx) => {
                return <tr key={idx}>
                  <th scope="row">
                    <select defaultValue={item.quantity} className="form-select-sm" aria-label=".form-select-sm example" onChange={e => changeQuantity(item, Number(e.target.value))}>
                      <option value='1'>1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </th>
                  <td className='cartImg'> <img style={{ width: '150px', height: '90px' }} src={item.image} alt="" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td className='mt-3'><button className='btn btn-sm rounded-pill btn-outline-danger' onClick={() => removeItem(item._id)}>Remove</button></td>
                </tr>
              })}
            </tbody>
          </table>
          <div className="d-flex justify-content-end me-3">
            <h5 className='ms-auto'>Total Count:{totalCount}</h5>
          </div>
          <div className="d-flex justify-content-end me-3">
            <h5 className='ms-auto'>Total Price:{totalPrice}</h5>
          </div>
        </>
        }
        {cartItems.length === 0 &&
          <>
            <div className='emptyCart'>
              <center>
                <img src="empty-cart.jpg" alt="" />
              </center>
            </div>
            <h2 className='text-center mt-5'>No Items in cart. <Link to='/menu'>Click to add!</Link> </h2>
          </>}
        {cartItems.length !== 0 && <Link to={"/checkout"}><button className='btn btn-outline-success float-end mt-1 mb-5 me-4'>Go to Checkout</button></Link>}
      </div>

    </>
  )
}


export default Cart
