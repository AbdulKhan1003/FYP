import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import Title from '../ReUsables/Title'
import { Button } from 'reactstrap'
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'


const Restaurants = () => {
  document.title = "ORDER UP - Products"
  const { cartItems, setCartItems, rest: restaurant, API_URL } = useContext(MenuContext)

  const userProfile = JSON.parse(localStorage.getItem("User"))
  const location = useLocation()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('')


  const [items, setItems] = useState(null)
  const [reviews, setReviews] = useState(null)

  const fetchItems = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/restaurant/${location.state?.restaurantId}/items`)
      if (data) {
        setItems(data.items)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log("Rest", location.state?.restaurant)
    fetchItems()
  }, []);

  const fetchItemReviews = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/restaurant/item/${item._id}/reviews`)
      if (data) {
        console.log(data)
        setReviews(data.reviews)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleItemReviewPost = async (e) => {
    e.preventDefault()
    try {
      if (rating === 0) {
        Swal.fire({
          title: "Error",
          text: "Please select stars(1-5)",
          icon: "warning"
        });
      }
      else {
        const { data } = await axios.post(`${API_URL}/restaurant/item/${item._id}/reviews/${userProfile._id}`, {
          rating,
          comment: review
        })
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success"
        });
        fetchItemReviews()
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response.data.message || "An unexpected error occurred",
        icon: "warning"
      });
    }
    finally {
      setRating(0)
      setReview('')
    }
  }

  useEffect(() => {
    if (item) {
      console.log('Called')
      fetchItemReviews()
    }
  }, [item])

  useEffect(() => {
    console.log("Cart Items:", cartItems)
    setCartItems(cartItems)
  }, [cartItems])

  useEffect(() => {
    const allItems = cartItems.flatMap(rest => rest.order);

    const totalPrice = allItems.reduce((sum, item) => sum + item.price, 0);
    const totalCount = allItems.reduce((sum, item) => sum + item.quantity, 0);
    
    setTotalPrice(totalPrice)
    setTotalCount(totalCount)
  }, [cartItems])
  const sum = items => { return items.reduce((prevVal, currVal) => prevVal + currVal, 0) }

  const removeItem = (id) => {
    const updatedCart = cartItems.map((restaurant) => {
      const filteredOrder = restaurant.order.filter(item => item._id !== id);
  
      return {
        ...restaurant,
        order: filteredOrder,
      };
    });
  
    setCartItems(updatedCart);
  };
  
  const AddQty = (prodItem) => {
    const existingProduct = cartItems
      .flatMap((rest) => rest.order)
      .find((item) => item._id === prodItem._id);

    setCartItems(
      cartItems.map((restaurant) => {
        return {
          ...restaurant,
          order: restaurant.order.map((item) => {
            if (item._id === existingProduct._id) {
              const unitPrice = item.price / (item.quantity || 1);
              return {
                ...item,
                quantity: (item.quantity || 0) + 1,
                price: item.price + unitPrice,
              };
            } else {
              return item;
            }
          }),
        };
      })
    );

  };

  const RemoveQty = (prodItem) => {
    const existingProduct = cartItems
      .flatMap((rest) => rest.order)
      .find((item) => item._id === prodItem._id);

    setCartItems(
      cartItems.map((restaurant) => {
        return {
          ...restaurant,
          order: restaurant.order.map((item) => {
            if (item._id === existingProduct._id) {
              const unitPrice = item.price / (item.quantity || 1);
              return {
                ...item,
                quantity: (item.quantity || 0) + 1,
                price: item.price + unitPrice,
              };
            } else {
              return item;
            }
          }),
        };
      })
    );

  };

  const AddProduct = (currentItem, currentRestaurant, quantity = 1) => {
    if (!currentItem || !currentRestaurant) return;

    const newCartItem = {
      _id: currentItem._id,
      name: currentItem.name,
      image: currentItem.image,
      price: currentItem.price,
      quantity: quantity,
    };

    const restaurantCartItem = {
      restaurant: {
        _id: currentRestaurant._id,
        name: currentRestaurant.name,
        logo: currentRestaurant.logo,
        phone: currentRestaurant.phone,
      },
      order: [newCartItem],
    };
    // toast.success(`${currentItem.name} added `);
    setCartItems((prevCart) => {
      const existingRestaurantIndex = (prevCart || []).findIndex(
        (item) => item.restaurant._id === currentRestaurant._id
      );

      if (existingRestaurantIndex === -1) {
        return [...(prevCart || []), restaurantCartItem];
      }

      const updatedCart = [...(prevCart || [])];
      const existingItemIndex = updatedCart[existingRestaurantIndex].order
        .findIndex((item) => item._id === currentItem._id);

      if (existingItemIndex === -1) {
        updatedCart[existingRestaurantIndex].order.push(newCartItem);
      } else {
        updatedCart[existingRestaurantIndex].order[existingItemIndex].quantity
          += quantity;
      }

      return updatedCart;
    });
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


  const handleClick = (index) => {
    setRating(index + 1);
  };

  const handleSearch = (e) => {
    setTimeout(() => {
      setItems(items.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
      );
    }, 500)
  }


  useEffect(() => {
    console.log('reviews', reviews)
  }, [reviews])

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
          {items.map((prod, idx) => {
            return <div style={{ cursor: 'pointer' }} className='mt-5' key={idx}>
              <div className="card d-flex flex-lg-row mb-5 options menu-rest-cards"
                data-bs-toggle="offcanvas"
                data-bs-target={`#offcanvasProduct-${prod._id}`}
                aria-controls={`offcanvasProduct-${prod.id}`}
                onClick={() => { setItem(prod) }}>
                <img src={`${API_URL}/images/${prod.image}`} className="card-img-top menu-rest-img img-fluid" alt="..." />
                <div className="card-body pt-1 pb-0">
                  <h4 className="card-title mt-0">{prod.name}</h4>
                  <p className="text-secondary mb-2">{truncateText(prod.description, 100)}</p>
                  <div>
                    <p className={`mb-0 badge rounded-pill bg-${prod.lowStockAlert ? 'danger' : 'success'}`}>
                      {prod.lowStockAlert ? 'Limited Orders' : 'In-Stock'}
                    </p>
                  </div>
                  <p className="text-dark mt-2 fs-5 mb-0">Rs.{prod.price}</p>
                  <p className="badge bg-info text-dark fs-5 mt-2">{prod.category}</p>
                  {prod.size && prod.size.map((items, index) => (
                    <Button className='btn btn-sm btn-light btn-outline-success me-3'>{items}</Button>
                  ))}
                  <br />

                  {/* Button to Open Cart Offcanvas */}
                  <Button type='button' className='mb-3' color='primary' outline
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart"
                    onClick={() => AddProduct(prod, restaurant)}>
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Offcanvas for Product Details */}
              <div className="offcanvas offcanvas-end" tabIndex="-1" id={`offcanvasProduct-${prod._id}`}
                aria-labelledby={`offcanvasProductLabel-${prod._id}`}>
                <div className="offcanvas-header">
                  <h4>Product Detail</h4>
                  <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                  <img src={`${API_URL}/images/${prod.image}`} className="img-fluid mb-3" alt={prod.name} />
                  <h5 className="offcanvas-title" id={`offcanvasProductLabel-${prod.pID}`}>{prod.name}</h5>
                  <p>{prod.description}</p>
                  <p><strong>Price:</strong> Rs.{prod.price}</p>
                  <p><strong>Category:</strong> {prod.category}</p>
                  <hr />
                  <h5 className='mt-4'>Add a Review</h5>
                  <form method='POST' onSubmit={handleItemReviewPost}>
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          onClick={() => handleClick(index)}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={index < rating ? "#FFD700" : "#ddd"}
                          stroke="none"
                          width="40"
                          height="40"
                          style={{
                            cursor: "pointer",
                            filter: index < rating ? "drop-shadow(0 0 6px #FFD700)" : "none",
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          <path d="M12 2l2.9 6.9 7.6.6-5.5 4.8 1.7 7.4L12 18l-6.7 4.7 1.7-7.4-5.5-4.8 7.6-.6z" />
                        </svg>
                      ))}
                    </div>
                    <input type="text" required placeholder='What do u think?' value={review} onChange={(e) => setReview(e.target.value)} className="form-control mt-2 mb-2" aria-label="Text input with radio button" />
                    <Button className='btn-info btn-sm d-flex ms-auto mt-1'>Post Review</Button>
                  </form>
                  <hr />
                  <h3 className='mt-4'>Total Reviews({reviews ? reviews.length : 0})</h3>
                  {reviews !== null && reviews.map((review, idx) => {
                    return <div key={idx} className='mt-4'>
                      <div className="photo-name d-flex align-items-center">
                        <img className="rounded-circle float-start me-3" style={{ width: "12%" }} src={`${API_URL}/images/${review.userId.profilePicture}`} alt="" />
                        <p className='m-0 p-0' style={{ fontSize: '12px' }}>{review.userId.name}</p>
                      </div>
                      <div className="d-flex mt-2" style={{ fontSize: '0.7rem' }}>
                        <span className='me-3'>
                          {[...Array(Math.floor(review.rating || 0))].map((_, index) => (
                            <span key={index}>⭐</span>
                          ))}
                        </span>
                        <span>{review.createdAt ? review.createdAt.slice(0, 10) : ''}</span>
                      </div>
                      <p className='m-0 p-0 mt-1'>{review ? review.comment : ''}</p>
                      <hr />
                    </div>
                  })}
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
                          {cartItems.map((rest) =>
                            rest.order.map((item) => (
                              <tr key={item._id}>
                                <td style={{ width: '30%' }}>{item.name}</td>
                                <td>
                                  <FontAwesomeIcon
                                    className={`px-2 ${item.quantity <= 1 ? 'disabled-icon' : ''}`}
                                    icon={faMinus}
                                    style={{ color: 'red' }}
                                    onClick={() => {
                                      if (item.quantity > 1) RemoveQty(item);
                                    }}
                                  />
                                  <span className='fs-6 mx-1'>{item.quantity ? item.quantity : 1}</span>
                                  <FontAwesomeIcon
                                    className={`px-2 ${item.quantity >= 10 ? 'disabled-icon' : ''}`}
                                    icon={faPlus}
                                    style={{ color: 'green' }}
                                    onClick={() => AddQty(item)}
                                  />
                                </td>
                                <td>{item.price}</td>
                                <td>
                                  <button className='btn btn-sm rounded-pill btn-outline-danger' onClick={() => removeItem(item._id)}>Remove</button>
                                </td>
                              </tr>
                            ))
                          )}

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
