import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SearchDoctor from './pages/SearchDoctor'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Login from './pages/Login'
import DoctorDetails from './pages/DoctorDetails'
import Register from './pages/Register'
import Profile from './pages/Profile'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/search-doctor' element={<SearchDoctor />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/doctor/:id' element={<DoctorDetails />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </>
  )
}

export default App
