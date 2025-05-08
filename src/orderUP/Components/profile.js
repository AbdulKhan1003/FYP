import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import axios from 'axios'


function Profile() {
  const [toggle, setToggle] = useState("Active Orders")
  const [clickCount, setClickCount] = useState(0)
  const nav = useNavigate()
  const [image, setImage] = useState(null)
  const { setUser, setCartItems, user, API_URL, userLocation, setUserLocation, setRiderLocation} = useContext(MenuContext)
  
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
    console.log('image', image)
  }, [image]);

  const handleEditProfile = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (!file) {
      console.log("No file")
      return
    }

    const maxSizeInBytes = 0.2 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error(`Image size should be less than 200KB`);
      console.log("Show toast")
      return;
    }
    else {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await axios.put(
          `${API_URL}/${user._id}/profile/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data) {
          console.log("data",data)
          toast.success(data.message);
          setImage(data.user.profilePicture)
          setUser({
            ...user,
            profilePicture: data.user.profilePicture
          });
        }
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  };


  useEffect(() => {
    document.title = "ORDER UP - Profile"
    console.log("Click", clickCount)

    getOrderHistory()
  }, []);

  const trackOrderRedirect = (items) => {
    if (clickCount === 0) {
      toast("Please allow your location. Do not reject it. Click on allow if accidentally rejected");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          locationSuccess(position); 
          nav("/liveTracker");
        },
        locationFailed
      );
    }
    setClickCount(prevCount => prevCount + 1);
  };
  
  const locationSuccess = (position) => {
    setUserLocation({lat: position.coords.latitude, lng:position.coords.longitude})
    setRiderLocation({lat:30.660122760996384, lng:73.13701412587147})
    console.log("User Location", userLocation)
  }
  const locationFailed = () => {
      toast.error("Havent Got location")
  }

//   useEffect(() => {
//     setRiderLocation({let: 32.661069598118043, lng: 75.13462924695868 })
//     // api k through jo bhi aai yahin pr aayegi trackOrderRedirect me call krke
// }, [riderLocation])
 
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
            <div className='profile-image-div' style={{ width: '15%', position: 'relative' }}>
              <img loading='lazy' src={`${API_URL}/images/${user.profilePicture}` || `${API_URL}/images/66d1b047b588f463a39a8938`} alt='Profile pic' className="ms-3 me-4 rounded-circle prof-img border border-3" style={{ width: '65%' }} />
              <label
                htmlFor="avatarUpload"
                className={`position-absolute rounded-circle edit-icon`}
                style={{ cursor: 'pointer', right: '20%', top: '40%' }}
              >
                <img loading='lazy' src="edit-icon.png" alt="" style={{ width: '22px', background:'none' }} />
                <input
                  type="file"
                  id="avatarUpload"
                  className="d-none"
                  onChange={handleEditProfile}
                  accept="image/*"
                />
              </label>
            </div>
            <div className='profile-info'>
              <h2 className="h4 mb-0">{user ? user.name : "Guest"}</h2>
              <p className="text-muted mb-0">{user ? user.email : "abc@example.com"}</p>
              {user.address && <p className="text-muted mb-0">{user.address.city}</p>}
              <p className="text-muted m-0">{user ? user.role : "Guest"}</p>
            </div>
          </div>
        </div>
        {/* Order History and active orders */}
        <div id='Orders' className="card mb-4">
          <div className="card-body m-0 p-0 mt-2">
            <div className="btn-group d-flex w-50 mx-auto mb-4 order-buttons" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-purple" onClick={() => setToggle("Order History")}>Order History <span className='badge rounded-pill bg-light text-black' >0 </span></button>
              <button type="button" className="btn btn-purple ms-1" onClick={() => setToggle("Active Orders")}>Active Orders <span className='badge rounded-pill bg-light text-black' >{user.orderHistory.length} </span></button>
            </div>
            {/* Order History */}
            {toggle === "Order History" && (
              user.orderHistory.length <= 0 || user.orderHistory === null ? (
                <div className="border py-3">
                  <h5 className='d-flex justify-content-center'>No order placed.&nbsp; <Link to={"/menu"}>Tap to order</Link></h5>
                </div>
              ) : (
                <div className="border py-3">
                  <h5 className='d-flex justify-content-center'>No order placed.&nbsp; <Link to={"/menu"}>Tap to order</Link></h5>
                </div>
              )
            )}

            {toggle === "Active Orders" && (
              user.orderHistory.length <= 0 || user.orderHistory === null ? (
                <div className="border py-3">
                  <h5 className='d-flex justify-content-center'>No order placed.&nbsp; <Link to={"/menu"}>Tap to order</Link></h5>
                </div>
              ) : (
                <ul className="list-group">
                  {Object.entries(user.orderHistory).map(([orderIndex, items]) => (
                    <li key={orderIndex} className="list-group-item border mb-3 profile-orders">
                      <div className="mb-2 float-start">
                        <h4 className="h6 mb-1"><span className="fw-bold">Order no:</span> {orderIndex + 1}</h4>
                        <span className='fw-bold'>Items:</span>
                      {items.map((item) => (
                        <p key={item._id} className="mb-0">{item.name} <span className="text-secondary ms-1"> x {item.quantity} </span></p>
                      ))}
                      </div>
                        <span className="fw-bold float-end">Total: Rs.{items.reduce((sum, item) => sum + item.price, 0) + 50}</span>
                        <br />
                        <button onClick={()=>{trackOrderRedirect(items)}} className="btn float-end btn-info mt-2">Track Order</button>
                        <div className="d-flex justify-content-center/">Progress:</div> {/* Progress bar lga kr agr progress btw 70-100 to isOrdred ko true krna  */}
                    </li>
                  ))}

                </ul>
              )
            )}


          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="h5 mb-3 fw-bold">Account Settings</h3>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary" onClick={()=>{nav("/editProfile")}}>Edit Profile</button>
              <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>

            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  )
}

export default Profile
