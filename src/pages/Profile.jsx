import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Profile = () => {

  const [auth, setAuth] = useAuth()

  const [mybooking, setMybookings] = useState(true)
  const [settings, setSettings] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [phno, setphno] = useState('')
  const [appointments, setAppointments] = useState([])

  const [loader, setLoader] = useState(false)
  

  const getUser = async () => {
    setLoader(true)
    try {
      const res = await axios.get(`https://medicare-backend.onrender.com/api/v1/auth/get-single-paitent/${auth.id}`)
      if(res.data.status){
        setEmail(res.data.user.email)
        setName(res.data.user.name)
        setphno(res.data.user.phno)
        setBloodType(res.data.user.bloodType)
        setLoader(false)
      }
    } catch (error) {
      
      setLoader(false)
      
    }
  }

  const getAllAppointments = async () => {
    setLoader(true)
    try {
      const res = await axios.get('https://medicare-backend.onrender.com/api/v1/appointment/get-all-appointments')
      if(res.data.status){
        setAppointments(res.data.appointments)
        setLoader(false)
      }
    } catch (error) {
     
      setLoader(false)
      
    }
  }
  
  useEffect(() => {
    if (auth.id) {
      getUser();
    }
    getAllAppointments()
  }, [auth?.id])

  const handleUpdate = async(e) => {
    setLoader(true)
    e.preventDefault()
    try {
      const res = await axios.put(`https://medicare-backend.onrender.com/api/v1/auth/update-paitent/${auth?.id}`, { email, name, phno, bloodType })
      if(res.data.status){
        getUser()
        setAuth({
          ...auth,
          
          name: res.data.user.name,
          email: res.data.user.email,
        })
        localStorage.setItem('auth', JSON.stringify(res.data))
        setLoader(false)
      }
    } catch (error) {
      setShowError(true)
      setError(error.response.data.message)
      setLoader(false)
      
    }
  }

  return (
    <>
      <Layout>
        <section className='w-[70%] mx-auto py-24'>
          <div className='w-full flex gap-6'> 
            <div className='w-[30%] border-2 border-stone-200'>
              <div className='px-3 py-4'>
                <h1 className='py-1 text-center text-black font-bold text-lg'>{auth?.name}</h1>
                <h1 className='py-1 text-center text-stone-500 font-normal text-lg'>{auth?.email}</h1>
                <h1 className='py-1 text-center text-stone-700 font-normal text-lg'>Blood Type:{bloodType}</h1>
                <div className='flex w-full justify-center'>
                  <button className='px-4 py-2 text-white bg-red-500 hover:bg-red-600 text-lg font-semibold rounded-xl mt-24'>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
            <div className='w-[70%]'>
              <div className='flex gap-10'>
                <button className='px-4 py-2 text-white font-semibold text-lg rounded-xl bg-blue-700 hover:bg-blue-800' onClick={() => { setMybookings(true); setSettings(false) }}>
                  My Booking
                </button>
                <button className='px-4 py-2 text-black font-semibold text-lg rounded-xl bg-white border-2 border-blue-700 hover:bg-blue-700 hover:border-white hover:text-white' onClick={() => { setSettings(true); setMybookings(false) }}>
                  Settings
                </button>
              </div>
              <hr className='mt-4'/>
              <div className='mt-2 w-full'>
                {
                  mybooking && (
                    
                      loader ? 
                        (<>
                          <div className='w-full h-screen flex justify-center items-center'>
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        </>) :
                        (<>
                        <h1 className='px-3 py-2 text-black text-2xl font-bold'>My Bookings</h1>
                          <div className='w-full px-4 py-2 lg:grid lg:grid-cols-2 lg:gap-4'>
                          {
                              appointments?.map(appointment => 
                                
                                  appointment.paitent._id === auth?.id ? 
                                  (
                                    <>
                                      
                                        <div className='col shadow-lg shadow-gray-500/50'>
                                          <div className='px-3 py-3 border-2 border-black'>
                                            <h1 className='text-xl font-semibold text-black text-center py-3'>Appointment Details</h1>
                                            <div className='px-3 py-3'>
                                              <h1 className='text-lg font-bold text-black px-3 py-2'>Doctor Name: <br/> {appointment.doctors.name}</h1>
                                              <h1 className='text-lg font-bold text-black px-3 py-2'>Appoitment Time: <br/> {appointment.time}</h1>
                                            </div>
                                          </div>
                                        </div>
                                      
                                    </>
                                  ) :
                                  (
                                    <>
                                    </>
                                  )
                                
                              )
                            } 
                          </div>
                        </>)
                  )
                }
                {
                  settings && (

                    loader ? 
                        (<>
                          <div className='w-full h-screen flex justify-center items-center'>
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        </>) :
                    (<>
                      <h1 className='px-3 py-2 text-black text-2xl font-bold'>Account Settings</h1>
                      <div className='w-[90%] mx-auto py-8 shadow-lg shadow-gray-500/50'>
                        <div className='py-2 px-4'>
                        <form className="space-y-6" action="#" method="POST" onSubmit={(e) => {handleUpdate(e)}}>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                              Full Name
                            </label>
                            <div className="mt-2">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="phno" className="block text-sm font-medium leading-6 text-gray-900">
                              Phone Number
                            </label>
                            <div className="mt-2">
                              <input
                                id="phno"
                                name="phno"
                                type="number"
                                autoComplete="name"
                                value={phno}
                                onChange={(e) => { setphno(e.target.value) }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="bloodtype" className="block text-sm font-medium leading-6 text-gray-900">
                              Blood Type
                            </label>
                            <div className="mt-2">
                              <input
                                id="bloodtype"
                                name="bloodtype"
                                type="text"
                                autoComplete="name"
                                value={bloodType}
                                onChange={(e) => { setBloodType(e.target.value) }}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          
                        
                          {
                            showError && (<div className='mt-2 py-2 w-full'>
                              <h1 className='text-md font-bold text-red-600 text-center'>{error}</h1>
                            </div>)
                          } 
                          <div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                        </div>
                      </div>
                    </>)

                  )
                }
                
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Profile
