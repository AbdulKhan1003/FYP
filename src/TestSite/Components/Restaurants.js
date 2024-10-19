import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import Title from '../ReUsables/Title'
import { Button } from 'reactstrap'
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { useFetchItems } from '../hooks/useFetchItems'

const Restaurants = () => {
  const { id } = useParams()
  const { cartItems, setCartItems } = useContext(MenuContext)
  const { items, fetchItems } =
  useFetchItems(`http://192.168.1.16:8080/api/auth/restaurant/${id}/items`);

  
  document.title = "ORDER UP - Products"

  const fetchItemData = async () => {
    await fetchItems();
  };
  useEffect(() => {
    fetchItemData();
  },[]);
  const navigate = useNavigate()
  useEffect(() => {
    console.log("Cart Items:", cartItems)
    localStorage.setItem('Cart Items', JSON.stringify(cartItems))
  }, [cartItems])
  
  const AddProduct = (prod) => {
    console.log("prod id haii:",prod._id)
    const existingProduct = cartItems.find(item => item._id === prod._id);
    if (existingProduct !== undefined && existingProduct !== null) {
      setCartItems(
        cartItems.map((item) => {
          const unitPrice = item.price / item.quantity
          return { ...item, 
            quantity: item.quantity + 1,
            price: item.price + unitPrice
          };
        })
      );
      toast.success(`Quantity of ${prod.pName} increased `)
      
    } else {
      toast.success("New Prod added")
      setCartItems([...cartItems, prod])
      navigate('/cart')
    }
  }
  
  if(items){
    console.log(items)
  return (
    <div>
        <div className='menu-bg container pt-3'>
          <Title heading={`All Products for Name add kar`}></Title>
          {items.map((prod, idx) => {
            return <div style={{ cursor: 'pointer' }} className='mt-5' key={idx}>
              <div className="card d-flex flex-lg-row mb-5">
                <img src={prod.image} className="card-img-top img-fluid border-end prodImages" alt="..." />
                <div className="card-body pt-1 pb-0">
                  <h4 className="card-title mt-0">{prod.name}</h4>
                  <p className="text-secondary mb-2">{prod.description}</p>
                  <div>
                    <p className={`mb-0 badge rounded-pill bg-${prod.isAvailable ? 'success' : 'danger'}`}>{prod.isAvailable ? 'In-Stock' : 'Out of Stock'}</p>
                  </div>
                  <p className="text-dark mt-3 fs-5 mb-0">Rs.{prod.price}</p>
                  <p className="badge bg-info text-dark fs-5 mt-2">{prod.category}</p>
                  {prod.size ? prod.size.map((items, index) => {
                    //work in progress
                    return <Button key={index} className='btn btn-sm btn-light btn-outline-success me-3'>{items}</Button>
                  }) : ''}
                  <br />
                  <Button type='button' className='' color='primary' outline onClick={() => AddProduct(prod)}>Add to Cart</Button>
                </div>
              </div>
            </div>
          })}

        </div>
        <Toaster />
      </div>
    )
  }else{
    return <h1 className="text-center">Fetching Products...</h1>
  }
  }

  export default Restaurants
