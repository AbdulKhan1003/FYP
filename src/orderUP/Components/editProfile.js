import React, { useContext, useEffect, useState } from 'react'
import Title from "../ReUsables/Title"
import { MenuContext } from '../AllRestaurants/RestaurantsContext'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
    document.title = "ORDER UP - Edit Profile"
    const nav = useNavigate()
    const { user,  API_URL, setUser } = useContext(MenuContext)
    const [name, setName] = useState(user?user.name:"")
    const [number, setNumber] = useState(user.phone?user.phone:"")
    const [city, setCity] = useState(user.address?user.address.city:"")
    const [addressInput, setAddressInput] = useState(user.address?user.address.address:"")

    const handleEditProfile = async (e) =>{
        e.preventDefault()
        try {
            const {data} = await axios.put(`${API_URL}/user/${user._id}/profile/update`, {
                username: name,            
                phone: number,
                address:{
                    city: city,
                    address: addressInput
                }
            })
            if(data){
                toast.success(data.message);
                setTimeout(() => {
                  nav("/profile");
                }, 1000);
                
                const address = {
                    city: city,
                    address: addressInput,
                }
                setUser({...user,
                    name: name,
                    phone: number,
                    address: address
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }

    }
    return (
        <>
        <Title heading="Edit Profile" size={6} />
            <div className='w-100 d-flex justify-content-center container mt-3'>
                <div className='container w-50 border border-4'>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label mt-3">Username</label>
                            <input type="text" className="form-control" onChange={(e)=>{setName(e.target.value)}} value={name} id="userName" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input type="number" className="form-control" onChange={(e)=>{setNumber(e.target.value)}} value={number} id="phone" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" onChange={(e)=>{setCity(e.target.value)}} id="city" value={city} aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <textarea className="form-control" onChange={(e)=>{setAddressInput(e.target.value)}} id="address" value={addressInput} aria-describedby="emailHelp" />
                        </div>

                        <button type="submit" className="btn btn-primary mb-3" onClick={handleEditProfile}>Save Changes</button>
                    </form>
                </div>

            </div>
            <Toaster />
        </>
    )
}

export default EditProfile
