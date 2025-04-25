import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import axios from 'axios'

function Profile() {

  const [toggle, setToggle] = useState("Order History")
  const [orderHistory, setOrderHistory] = useState(null)
  const [activeOrders, setActiveOrders] = useState(null)
  const nav = useNavigate()
  const { setUser, setCartItems, user, API_URL } = useContext(MenuContext)
  const allOrders = user.orderHistory.flatMap((order, orderIndex) =>
    order.map((item) => ({
      orderIndex: orderIndex + 1,
      ...item,
    }))
  );
  console.log(allOrders);

  const getOrderHistory = async () => {
    const { data } = axios.get(`${API_URL}/user/${user._id}/history/orders`)
    console.log(data)
  }

  useEffect(() => {
    document.title = "ORDER UP - Profile"


    getOrderHistory()
  }, []);

  const handleLogout = () => {
    localStorage.setItem('LoggedIn', 0)
    setCartItems([])
    setUser({})
    nav('/')
    window.location.reload();
  }

  return (
    <>
      <div className="container my-4">
        <div className="card mb-4">
          <div className="card-body d-flex align-items-center profile-main">
            <img src={`${API_URL}/images/${user.profilePicture}`} alt='Profile pic' style={{ width: '5%', borderRadius: '50%' }} className="me-4" />
            <div>
              <h2 className="h4 mb-0">{user ? user.name : "Guest"}</h2>
              <p className="text-muted mb-1">{user ? user.email : "abc@example.com"}</p>
              <p className="text-muted mb-1">{user ? user.role : "Guest"}</p>
            </div>
          </div>
        </div>
        {/* Order History and active orders */}
        <div id='Orders' className="card mb-4">
          <div className="card-body m-0 p-0 mt-2">
            <div className="btn-group d-flex w-50 mx-auto mb-4" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-purple" onClick={() => setToggle("Order History")}>Order History <span className='badge rounded-pill bg-light text-black' >{user.orderHistory.length} </span></button>
              <button type="button" className="btn btn-purple ms-1" onClick={() => setToggle("Active Orders")}>Active Orders <span className='badge rounded-pill bg-light text-black' >{user.orderHistory.length} </span></button>
            </div>
            {/* Order History */}
            {toggle === "Order History" && (
              user.orderHistory.length <= 0 || user.orderHistory === null ? (
                <div className="border py-3">
                  <h5 className='d-flex justify-content-center'>No order placed.&nbsp; <Link to={"/menu"}>Tap to order</Link></h5>
                </div>
              ) : (
                <ul className="list-group">
                  {Object.entries(user.orderHistory).map(([orderIndex, items]) => (
                    <li key={orderIndex} className="list-group-item border mb-3 profile-orders">
                      <div className="mb-2 d-flex justify-content-between">
                        <h4 className="h6 mb-1"><span className="fw-bold">Order no:</span> {orderIndex+1}</h4>
                        <span className="fw-bold">Total: Rs.{items.reduce((sum, item) => sum + item.price, 0)}</span>
                      </div>
                      <span className='fw-bold'>Items:</span>
                      {items.map((item) => (
                          <p key={item._id} className="mb-0">{item.name}</p>
                      ))}
                    </li>
                  ))}

                </ul>
              )
            )}

            {toggle === "Active Orders" && <>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center mb-3 border profile-orders">
                  <div>
                    <h4 className="h6 mb-1">Order no: 1</h4>
                    <p className="text-muted mb-0">Placed on: 21/3/2025</p>
                  </div>
                  <div className="d-flex flex-column align-items-center flex-grow-1 mx-5">
                    <div className="text-start w-50">Progress State</div>
                    <div className="progress w-50">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </li>
              </ul>

            </>}


          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="h5 mb-3 fw-bold">Account Settings</h3>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary">Edit Profile</button>
              <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Profile
