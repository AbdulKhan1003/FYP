import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import Title from '../ReUsables/Title'
import { Button } from 'reactstrap'
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Restaurants = () => {
  const { id } = useParams()
  const { restaurant, cartItems, setCartItems } = useContext(MenuContext)
  const navigate = useNavigate()
  const [price, setPrice] = useState("None")

  useEffect(() => {
    console.log("Cart Items:", cartItems)
    localStorage.setItem('Cart Items', JSON.stringify(cartItems))
  }, [cartItems])

  const AddProduct = (prod) => {
    const existingProduct = cartItems.find(item => item.pID === prod.pID);
    if (existingProduct !== undefined && existingProduct !== null) {
      console.log("same id")
      setCartItems(
        cartItems.map((item) => {
          return { ...item, quantity: item.quantity + 1 };
        })
      );
      toast.success(`Quantity of ${prod.pName} increased `)

    } else {
      toast.success("New Prod added")
      setCartItems([...cartItems, prod])
      navigate('/cart')
    }
  }
  const productSize = (prod, size) => {
      var prodToResize = restaurant[id - 1].products.find((product) => {
        return product.pID === prod.pID
    })
    console.log(prodToResize)
    if(size==="Half"){
      setPrice(restaurant[id-1].products[prod.pID-1].price)
    }
    else if(size === "Full"){
      setPrice(restaurant[id-1].products[prod.pID-1].priceFull)
    }

    restaurant[id-1].products.map((prods)=>{
      if(prods.pID!== prod.pID){
        console.log("Itni ni milti",prods)
        setPrice(restaurant[id-1].products[prod.pID-1].price)
      }
    })
  }

    return (
      <div>
        <div className='menu-bg container pt-3'>
          <Title heading={`All Products for ${restaurant[id - 1].restaurantName}`}></Title>
          {restaurant[id - 1].products.map((prod, idx) => {
            return <div style={{ cursor: 'pointer' }} className='mt-5' key={idx}>
              <div className="card d-flex flex-lg-row mb-5">
                <img src={prod.image} className="card-img-top img-fluid border-end" alt="..." />
                <div className="card-body pt-1 pb-0">
                  <h4 className="card-title mt-0">{prod.pName}</h4>
                  <p className="text-secondary mb-2">{prod.desc}</p>
                  <div>
                    <p className={`mb-0 badge rounded-pill bg-${prod.isAvailable ? 'success' : 'danger'}`}>{prod.isAvailable ? 'In-Stock' : 'Out of Stock'}</p>
                  </div>
                  <p className="text-dark mt-3 fs-5">Rs.{price}</p>
                  {prod.size ? prod.size.map((items, index) => {
                    //work in progress
                    return <Button key={index} className='btn btn-sm btn-light btn-outline-success me-3' onClick={() => productSize(prod, items)}>{items}</Button>
                  }) : ''}
                  <br />
                  <Button type='button' className='mt-3' color='primary' outline disabled={!prod.isAvailable} onClick={() => AddProduct(prod)}>Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          })}

        </div>
        <Toaster />
      </div>
    )
  }

  export default Restaurants
