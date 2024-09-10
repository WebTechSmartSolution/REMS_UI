import React from 'react'
import Footer from '../components/header-footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/header-footer/Header'

function Layout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
