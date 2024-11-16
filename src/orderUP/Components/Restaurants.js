import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import Title from '../ReUsables/Title'
import { Button } from 'reactstrap'
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchItems } from '../hooks/useFetchItems'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


const Restaurants = () => {
  const { cartItems, setCartItems, restName, restId } = useContext(MenuContext)
  const navigate = useNavigate()
  const { items, fetchItems } =
    useFetchItems(`http://192.168.1.10:8080/api/auth/restaurant/${restId}/items`);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  document.title = "ORDER UP - Products"

  const fetchItemData = async () => {
    await fetchItems();
  };
  useEffect(() => {
    fetchItemData();
  }, []);
  console.log("Items", items)
  useEffect(() => {
    console.log("Cart Items:", cartItems)
    setCartItems(cartItems)
  }, [cartItems])

  useEffect(() => {
    const Price = sum(cartItems.map(item => item.price))
    const count = sum(cartItems.map(item => item.quantity))
    setTotalPrice(Price)
    setTotalCount(count)
  }, [cartItems])
  const sum = items => { return items.reduce((prevVal, currVal) => prevVal + currVal, 0) }

  const removeItem = (id) => {
    const filteredItems = cartItems.filter(cart => cart._id !== id)
    setCartItems(filteredItems)
  }

  const AddQty = (prodItem) => {
    const existingProduct = cartItems.find(item => item._id === prodItem._id);
    setCartItems(
      cartItems.map((item) => {
        if (existingProduct === item) {
          const unitPrice = item.price / (item.quantity || 1);
          return {
            ...item,
            quantity: (item.quantity || 0) + 1,
            price: item.price + unitPrice
          };
        } else {
          return item;
        }
      })
    );
  };

  const RemoveQty = (prodItem) => {
    const existingProduct = cartItems.find(item => item._id === prodItem._id);
    setCartItems(
      cartItems.map((item) => {
        if (existingProduct === item) {
          if (item.quantity === 1) {
          }
          const unitPrice = item.price / (item.quantity || 1);
          return {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 0,
            price: item.quantity > 1 ? item.price - unitPrice : item.price
          };
        } else {
          return item;
        }
      })
    );
  };


  const AddProduct = (prod) => {
    const existingProduct = cartItems.find(item => item._id === prod._id);
    if (existingProduct !== undefined && existingProduct !== null) {
      setCartItems(
        cartItems.map((item) => {
          if (existingProduct === item) {
            const unitPrice = item.price / (item.quantity ? item.quantity : 1);
            return {
              ...item,
              quantity: item.quantity ? item.quantity + 1 : 1,
              price: item.price + unitPrice
            };
          } else {
            return item;
          }
        })
      );
      toast.success(`Quantity of ${prod.name} increased `);
    } else {
      const newProduct = {
        ...prod,
        quantity: 1 
      };
      toast.success(`${prod.name} added `);
      setCartItems([...cartItems, newProduct]);
    }
  }


  const truncateText = (text, charLimit) => {
    if (text.length <= charLimit) return text;

    let truncated = text.slice(0, charLimit);

    if (charLimit > 90) {
      const lastIndex = Math.max(
        truncated.lastIndexOf(' '),
        truncated.lastIndexOf('.'),
        truncated.lastIndexOf(',')
      );

      truncated = lastIndex > 0 ? truncated.slice(0, lastIndex) : truncated;
    }
    return truncated + '...';
  };

  if (items) {
    console.log(items)
    return (
      <div>
        <div className='menu-bg container pt-3'>
          <Title heading={`All Products for ${restName}`}></Title>
          {items.map((prod, idx) => {
            return <div style={{ cursor: 'pointer' }} className='mt-5' key={idx}>
              <div className="card d-flex flex-lg-row mb-5">
                <div style={{ height: '280px' }}>
                  <img src={prod.image} className="prodImg" alt="..." />
                </div>
                <div className="card-body pt-1 pb-0">
                  <h4 className="card-title mt-0">{prod.name}</h4>
                  <div className='imgDiv'>
                    <p className="text-secondary mb-2">{truncateText(prod.description, 200)}</p>
                  </div>
                  <div>
                    <p className={`mb-0 badge rounded-pill bg-${prod.availability ? 'success' : 'danger'}`}>{prod.availability ? 'In-Stock' : 'Out of Stock'}</p>
                  </div>
                  <p className="text-dark mt-2 fs-5 mb-0">Rs.{prod.price}</p>
                  <p className="badge bg-info text-dark fs-5 mt-2">{prod.category}</p>
                  {prod.size ? prod.size.map((items, index) => {
                    //work in progress
                    return <Button key={index} className='btn btn-sm btn-light btn-outline-success me-3'>{items}</Button>
                  }) : ''}
                  <br />
                  <Button type='button' className='' color='primary' outline data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => AddProduct(prod)}>Add to Cart</Button>

                  <div className="offcanvas offcanvas-end " tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header text-center">
                      <h3 className='text-center' style={{ width: '100%' }} id="offcanvasRightLabel">
                        <FontAwesomeIcon icon={faUtensils} />
                        <span className="ms-3">Your Order</span>
                      </h3>
                      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                      {cartItems.length > 0 && <>
                        <hr />
                        <table className="table table-striped table-responsive mt-5 ">
                          <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope='col'>Quantity</th>
                              <th scope="col">Price</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((item, idx) => {
                              return <tr key={idx}>
                                <td style={{ width: '30%' }}>{item.name}</td>
                                <td><FontAwesomeIcon className={`px-2 ${item.quantity <= 1 ? 'disabled-icon' : ''}`} icon={faMinus} style={{ color: 'red' }} onClick={() => { if (item.quantity > 1) RemoveQty(item); }} />
                                  <span className='fs-6 mx-1'>{item.quantity ? item.quantity : 1}</span>
                                  <FontAwesomeIcon className='px-2' icon={faPlus} style={{ color: 'green' }} onClick={() => { AddQty(item) }} /></td>
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
                        <button className='btn btn-success w-100 mt-3' color='success' onClick={() => { navigate("/checkout") }}>Checkout</button>
                      </>
                      }
                      {cartItems.length === 0 && <>
                        <hr />
                        <h3 className="text-center mt-4">No Items in Cart</h3>
                      </>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}

        </div>
        <Toaster />
      </div>
    )
  } else {
    return <div className='container pt-3 d-flex justify-content-center flex-column align-items-center'>
      <h1 className="mb-5">Fetching Products...</h1>
      <div className="spinner-border big-spinner mt-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  }
}

export default Restaurants
