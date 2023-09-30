import React, { useState } from 'react'
import Logo from '../assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


const Header = () => {
  const [auth,setAuth] = useAuth() 
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const navigationItems = [
    {
      key: 1,
      itemName : 'Home',
      itemLink: '/',
      active: 'true',
    },
    {
      key: 2,
      itemName : 'Find A Doctor',
      itemLink: '/search-doctor',
      active: 'false',
    },
    {
      key: 3,
      itemName : 'Services',
      itemLink: '/services',
      active: 'false',
    },
    {
        key: 4,
        itemName : 'Contact',
        itemLink: '/contact',
        active: 'false',
      },
  ]

  const handleLogout = () => {
    setAuth({
      ...auth,
      id:null,
      name: null,
      email: null,
      token: '',
    })
    localStorage.removeItem('auth')
    navigate('/login')
  }

  const handleProfile = () => {
    navigate('/profile')
  }
  
  const handleClick = () => { 
    setOpen((prevState) => !prevState); 
  }

  return (
    <>
      <nav className='bg-no-repeat h-20 background z-[20]'>
        <div className='flex items-center justify-between md:w-[75%] w-[80%] mx-auto py-2 h-full'>
          <div>
           <Link to='/'><img className='h-8 w-auto' src={Logo} alt='MediCare Logo' /></Link> 
          </div>
          <div className={`nav-Links md:static absolute flex items-center md:w-auto w-full md:min-h-fit min-h-[60vh] left-0 ${open ? 'top-[9%]' : 'top-[-100%]'} px-5`}>
            <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
              {
                navigationItems.map((items) => 
                  
                    <li key={items.key} className='text-stone-900  hover:text-stone-500'>
                      <Link to={items.itemLink}>{items.itemName}</Link>
                    </li>
                  
                )
              }
            </ul>
          </div>
          {
            auth?.token ? 
            (<> 
              <div className='flex items-center gap-2'> 
                <button className='border-0 bg-transparent' onClick={handleProfile}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-person-square" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                  </svg>
                </button>
                <button className='border-0 bg-transparent' onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
                </button>
                <button type='button' className='cursor-pointer md:hidden' onClick={handleClick}>
                  {
                    open ? 
                    (<>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </>) :
                    (<>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </>)
                  }
                  
                </button>
              </div>
            </>) 
            : 
            (<> 
              <div className='flex items-center gap-2'>
                
                  
                  <button className='bg-blue-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-900' type='button' onClick={() => { navigate('/login') }}>Login</button>
                
                
                <button type='button' className='cursor-pointer md:hidden' onClick={handleClick}>
                  {
                    open ? 
                    (<>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </>) :
                    (<>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </>)
                  }
                  
                </button>
                
              </div>
            </>)
          }
        </div>
      </nav>

    </>
  )
}

export default Header




