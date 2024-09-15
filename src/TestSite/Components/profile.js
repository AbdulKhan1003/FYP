import React from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const nav = useNavigate()
    const handleLogout = () =>{
        localStorage.setItem('LoggedIn', JSON.stringify(0))
        nav('/')
        window.location.reload();
      }
    
  return (
    <div>
        <button className='btn btn-outline-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile
