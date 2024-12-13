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
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn