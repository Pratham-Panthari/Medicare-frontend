import React from 'react'
import Logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='w-[80%] mx-auto py-12'>
      <div className='w-[25%]'>
        <Link to='/'>
          <img className='w-auto h-10 object-fill' src={Logo}  />
        </Link>
      </div>
      <p className='text-stone-500 mt-4 text-lg'>Copyright &#169; 2023, Developed by Pratham Panthari</p>

    </div>
  )
}

export default Footer
