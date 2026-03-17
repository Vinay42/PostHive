import './App.css'
import React,{useState,useEffect} from 'react'
import {useDispatch,Provider} from "react-redux"
import authService from "./appwrite/auth"
import { login,logout } from './store/authFile'
import { Footer, Header } from './components'
import { Outlet, useNavigate } from 'react-router-dom'


function App() {
  const [loading,setLoading] = useState(true)
  const disPatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    authService.getCurrentUser().
    then((userData)=>{
      if(userData){
        disPatch(login({userData}))
      }else{
        disPatch(logout())
        navigate("/")
      }
    })
    .finally(()=>setLoading(false))
  },[navigate, disPatch])


  return !loading ? (
    <div className='min-h-sc flex flex-wrap content-between bg-sky-100  ' >
      <div className='w-full block' >
        <Header/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
