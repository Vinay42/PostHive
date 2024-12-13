import './App.css'
import React,{useState,useEffect} from 'react'
import {useDispatch,Provider} from "react-redux"
import authService from "./appwrite/auth"
import { login,logout } from './store/authFile'
import { Footer, Header } from './components'
import { Navigate, Outlet } from 'react-router-dom'


function App() {
  const [loading,setLoading] = useState(true)
  const disPatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser().
    then((userData)=>{
      if(userData){
        // console.log(userData)
        disPatch(login({userData}))
      }else{
        disPatch(logout())
        Navigate("/")
      } 
    })
    .finally(()=>setLoading(false))
  },[])
  // console.log('Appwrite URL:', import.meta.env.VITE_APPWRITE_URL);


  // console.log(import.meta.env.VITE_APPWRITE_URL)

  return !loading ? (
    <div className='min-h-sc flex flex-wrap content-between bg-gray-400 ' >
      <div className='w-full block' >
        <Header/>
        <main>
        Todo:  <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
