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
import { useLocation } from 'react-router-dom'


const Restaurants = () => {
  const { cartItems, setCartItems, restName, restId } = useContext(MenuContext)
  const location = useLocation()
  console.log("object", location)
  const navigate = useNavigate()
  const { items, fetchItems } =
    useFetchItems(`http://192.168.1.15:8080/api/auth/restaurant/${location.state?.restaurantId}/items`);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  document.title = "ORDER UP - Products"

  const fetchItemData = async () => {
    await fetchItems();
  };
  useEffect(() => {
    fetchItemData();
  }, []);

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

  const AddProduct = (prod, newRestId, newRestName) => {
    const existingProduct = cartItems.find(item => item._id === prod._id);

    if (existingProduct) {
      setCartItems(
        cartItems.map((item) => {
          if (existingProduct === item) {
            const unitPrice = item.price / (item.quantity ? item.quantity : 1);
            return {
              ...item,
              quantity: item.quantity ? item.quantity + 1 : 1,
              price: item.price + unitPrice
              // Do not update restId and restName for existing products
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
        quantity: 1,
        restId: restId,
        restName: restName
      };
      toast.success(`${prod.name} added `);
      setCartItems([...cartItems, newProduct]);
    }
  };

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

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(items) && items.length > 0) {
      setAllProducts(items);
      setLoading(false);
    }
  }, [items]);

  const handleSearch = (e) => {
    setTimeout(() => {
      setAllProducts(items.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }, 500)
  }

  if (items) {
    console.log(items)
    return (
      <div>
        <div className='menu-bg container pt-3'>
          <Title heading={`All Products for ${location.state?.restaurantName}`}></Title>
          <div className="d-flex mt-3">
            <div className="input-group searchBar">
              <span className="input-group-text"><i className="bi bi-search"></i> </span>
              <input className="form-control" type="search" placeholder="Search here.." aria-label="Search" onChange={handleSearch}
              />
            </div>
          </div>
          {allProducts.map((prod, idx) => {
            return <div style={{ cursor: 'pointer' }} className='mt-5' key={idx}>
              <div className="card d-flex flex-lg-row mb-5 options menu-rest-cards"
                data-bs-toggle="offcanvas"
                data-bs-target={`#offcanvasProduct-${prod.pID}`}
                aria-controls={`offcanvasProduct-${prod.pID}`}>

                <img src={prod.image} className="card-img-top menu-rest-img img-fluid" alt="..." />
                <div className="card-body pt-1 pb-0">
                  <h4 className="card-title mt-0">{prod.name}</h4>
                  <p className="text-secondary mb-2">{truncateText(prod.description, 100)}</p>
                  <div>
                    <p className={`mb-0 badge rounded-pill bg-${prod.availability ? 'success' : 'danger'}`}>
                      {prod.availability ? 'In-Stock' : 'Out of Stock'}
                    </p>
                  </div>
                  <p className="text-dark mt-2 fs-5 mb-0">Rs.{prod.price}</p>
                  <p className="badge bg-info text-dark fs-5 mt-2">{prod.category}</p>
                  {prod.size && prod.size.map((items, index) => (
                    <Button key={index} className='btn btn-sm btn-light btn-outline-success me-3'>{items}</Button>
                  ))}
                  <br />

                  {/* Button to Open Cart Offcanvas */}
                  <Button type='button' className='mb-3' color='primary' outline
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart"
                    onClick={() => AddProduct(prod)}>
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Offcanvas for Product Details */}
              <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasProduct-${prod.pID}`}
                aria-labelledby={`offcanvasProductLabel-${prod.pID}`}>
                <div className="offcanvas-header">
                  <h4>Product Detail</h4>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <img src={prod.image} className="img-fluid mb-3" alt={prod.name} />
                  <h5 className="offcanvas-title" id={`offcanvasProductLabel-${prod.pID}`}>{prod.name}</h5>
                  <p>{prod.description}</p>
                  <p><strong>Price:</strong> Rs.{prod.price}</p>
                  <p><strong>Category:</strong> {prod.category}</p>
                </div>
              </div>

              {/* Offcanvas for Cart */}
              <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasCart" aria-labelledby="offcanvasCartLabel">
                <div className="offcanvas-header text-center">
                  <h3 className='text-center' style={{ width: '100%' }} id="offcanvasCartLabel">
                    <FontAwesomeIcon icon={faUtensils} />
                    <span className="ms-3">Your Order</span>
                  </h3>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  {cartItems.length > 0 ? (
                    <>
                      <hr />
                      <table className="table table-striped table-responsive mt-5">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, idx) => (
                            <tr key={idx}>
                              <td style={{ width: '30%' }}>{item.name}</td>
                              <td>
                                <FontAwesomeIcon className={`px-2 ${item.quantity <= 1 ? 'disabled-icon' : ''}`} icon={faMinus} style={{ color: 'red' }} onClick={() => { if (item.quantity > 1) RemoveQty(item); }} />
                                <span className='fs-6 mx-1'>{item.quantity ? item.quantity : 1}</span>
                                <FontAwesomeIcon className={`px-2 ${item.quantity >= 10 ? 'disabled-icon' : ''}`} icon={faPlus} style={{ color: 'green' }} onClick={() => { AddQty(item) }} />
                              </td>
                              <td>{item.price}</td>
                              <td>
                                <button className='btn btn-sm rounded-pill btn-outline-danger' onClick={() => removeItem(item._id)}>Remove</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-end me-3">
                        <h5 className='ms-auto'>Item Count: {totalCount}</h5>
                      </div>
                      <div className="d-flex justify-content-end me-3">
                        <h5 className='ms-auto'>Total Price: {totalPrice}</h5>
                      </div>
                      <button className='btn btn-success w-100 mt-3' onClick={() => navigate("/checkout")}>Checkout</button>
                    </>
                  ) : (
                    <>
                      <hr />
                      <h3 className="text-center mt-4">No Items in Cart</h3>
                    </>
                  )}
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
