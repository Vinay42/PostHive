import React from "react";
import {useDispatch} from 'react-redux'
import  authService from '../../appwrite/auth'
import {logout} from '../../store/authFile'

function LogoutBtn() {
    const disPatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            disPatch(logout())
        })
        .catch((error)=>{
          console.log("Error in LogoutBtn: ",error)
        })
        
    }
  return (
    <button
    className='inline-block px-4 py-2 text-white  font-medium rounded-full duration-200 hover:bg-[#3498DB] transition-colors '
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn