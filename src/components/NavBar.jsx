import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import {BASE_URL }  from "../utils/constants"
import { removeUser } from '../utils/userSlice';

const NavBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(store=>store.user);

  const handleLogout =  async ()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
      dispatch(removeUser())
      navigate("/login")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <a href='/' className="btn btn-ghost text-xl">👩‍💻 DevTinder</a>
    </div>
    { user &&<div className="flex-none gap-2">
    
    <div className="dropdown dropdown-end flex">
    <p>Welcome, {user?.firstName}</p>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="user photoUrl"
              src={user?.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 mx-5 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/connections" className="justify-between">
              Connections
            </Link>
          </li>
          <li>
            <Link to="/requests" className="justify-between">
              Requests
            </Link>
          </li>
          <li onClick={handleLogout} className='text-red-700 font-bold'><a>Logout</a></li>
        </ul>
      </div>
    </div>}
  </div>
  )
}

export default NavBar
