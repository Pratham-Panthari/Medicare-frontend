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
  const [openDelete, setOpenDelete] = useState({})
  

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
      getAllAppointments()
    }
    
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

  const confirmDelete = (id) => {
    setOpenDelete({...openDelete, [id]: true})
  }

  const closeConfirmDelete = (id) => {
    setOpenDelete({...openDelete, [id]: false})
  }
  const handleDelete = async (id) => {
    
    try {
      const res = await axios.delete(`https://medicare-backend.onrender.com/api/v1/appointment/delete-appointment/${id}`)
      if(res.data.status){
        getAllAppointments()
      }
    } catch (error) {
      
    }
  }
 

  return (
    <>
      <Layout>
        <section className='w-[70%] mx-auto py-24'>
          <div className='w-full lg:flex gap-6'> 
            <div className='lg:w-[30%] w-full mb-6 border-2 border-stone-200'>
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
            <div className='lg:w-[70%] w-full'>
              <div className='flex lg:gap-10 gap-6'>
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
                                
                                appointment?.paitent?._id === auth?.id ? 
                               
                                  (
                                    
                                    <>
                                      <div className='col shadow-lg shadow-gray-500/50 mb-6 h-fit'>
                                        <div className='px-3 py-3 border-2 border-black'>
                                          <div className='w-full justify-between flex px-3 py-2'>
                                            <h1 className='text-xl font-semibold text-blackpy-3'>Appointment Details</h1>
                                            <button onClick={() => { confirmDelete(appointment?._id) }}>
                                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="red" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                              </svg>
                                            </button>
                                                
                                          </div>
                                          <hr/>
                                                
                                          <div className='px-3 py-3'>
                                            <h1 className='text-lg font-bold text-black px-3 py-2'>Doctor Name: <br/> {appointment.doctors.name}</h1>
                                            <h1 className='text-lg font-bold text-black px-3 py-2'>Appoitment Time: <br/> {appointment.time}</h1>
                                          </div>
                                          {
                                              openDelete[appointment?._id] ?
                                                (
                                                  <div className='px-4 py-2'>
                                                      <h1 className='px-3 mt-2 text-black text-lg font-semibold hover:underline cursor-pointer' onClick={() => { closeConfirmDelete(appointment?._id) }} >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-x-lg" viewBox="0 0 16 16">
                                                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                                        </svg>
                                                      </h1>
                                                      <div className='px-3 py-4'>
                                                        <p className='text-sm text-stone-500 font-normal'>Do you want to delete this appointment?</p>
                                                      </div>
                                                      <button className='px-4 py-2 text-white font-semibold text-md bg-red-500 hover:bg-red-400 rounded-xl' onClick={() => {handleDelete(appointment?._id); closeConfirmDelete(appointment?._id)}} >Delete</button>
                                                  </div>
                                                      
                                                ) : 
                                                (
                                                  <>
                                                  </>
                                                )
                                            }
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
