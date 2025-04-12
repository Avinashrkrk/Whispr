import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from '../src/pages/HomePage'
import LoginPage from '../src/pages/LoginPage'
import SignUpPage from '../src/pages/SignUpPage'
import SettingsPage from '../src/pages/SettingsPage'
import ProfilePage from '../src/pages/ProfilePage'
import axios from 'axios'
import { axiosInstance } from './lib/axios'
import { useAuthStore } from './store/useAuthStore'
import {useThemeStore} from "./store/useThemeStore"
import {Loader} from 'lucide-react'
import {Toaster} from "react-hot-toast"

function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log(authUser)

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )

  return (
    <>
    <div >

      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/' />} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={authUser?<ProfilePage/> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
    </>
  )
}

export default App
