import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Star from '../assets/images/Star.png'
import { useAuth } from '../context/AuthContext'

const DoctorDetails = () => {

    const [auth, setAuth] = useAuth('')

    const params = useParams()
    const [doctor, setDoctor] = useState()
    const [open, setOpen] = useState(false)
    const [openBookings, setOpenBookings] = useState(false)
    const [timeSlots, setTimeSlots] = useState()
    const [showError, setShowError] = useState(false)
    const [loader, setLoader] = useState(false)
    
    const navigate = useNavigate()

    const getSingleDoctor = async () => {
        setLoader(true)
        try {
            const id = params.id
            
            const res = await axios.get(`https://medicare-backend.onrender.com/api/v1/auth/get-single-doctor/${id}`)
            if(res.data.status){
                setDoctor(res.data.doctor)
                setLoader(false)
            }
        } catch (error) {
            setLoader(false)
        }
    }

    useEffect(() => {
        getSingleDoctor()
        window.scrollTo(0, 0)
    }, [params.id])

    const handleClick = () => {
        setOpen((prev) => !prev)
    }
    console.log(auth?.id)
    const bookAppointment = async () => {
        setLoader(true)
        try {
            
            const res = await axios.post('https://medicare-backend.onrender.com/api/v1/appointment/create-appointment', { paitent: auth?.id, doctors: params.id, time: timeSlots })
            if(res.data.status){
                setLoader(false)
                navigate('/profile')
            }
        } catch (error) {
            setLoader(false)
        }
    }

  return (
    <>
        {
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
            (
                <>
                <Layout>
                    <section className='w-[70%] mx-auto py-16'>
                        { openBookings ? 
                        (
                            <div className='w-full h-[50vh] flex items-center'>
                                <div className='lg:w-[60%] w-[90%] mx-auto'>
                                    <div className='px-4 py-2 border-2 border-gray-500'>
                                        <h1 className='px-3 mt-2 text-black text-lg font-semibold hover:underline cursor-pointer' onClick={() => { setOpenBookings(false) }} >Go Back</h1>
                                        <div className='px-3 py-4'>
                                            <label htmlFor="time" className="block text-sm leading-6 text-gray-900 font-bold underline">
                                                Time Slots
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                id="time"
                                                name="time"
                                                value={timeSlots}
                                                onChange={(e) => setTimeSlots(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                >
                                                <option value="">Select Role</option>
                                                {
                                                    doctor?.timeSlots.map((t, index) => 
                                                        <option key={index} value={t}>{t}</option>
                                                    )
                                                }
                                                </select>
                                            </div>
                                        </div>
                                        {
                                            showError && (
                                                <><h1 className='text-lg font-bold text-red-500 text-center py-2 '>Please login to book</h1></>
                                            )
                                        }
                                        <button className='px-4 py-2 text-white font-semibold text-md bg-blue-700 hover:bg-blue-800 rounded-xl' onClick={() => { auth?.token && timeSlots ? (bookAppointment()) : (setShowError(true)) }} >Book Now</button>
                                    </div>
                                </div>
                            </div>
                        ) :
                        (
                        <div className='lg:flex gap-8'>
                            <div className='lg:w-[40%] w-full'>
                                <h1 className='text-4xl font-semibold text-black lg:hidden block mb-4'>{doctor?.name}</h1>
                                <div className='w-full'>
                                    <img className='w-full h-52  object-contain self-center' src={doctor?.photo} alt='Doctor photo' /> 
                                </div>
                                <div className='mt-6'>
                                    <h1 className='text-xl font-semibold text-black'>Qualification</h1>
                                    {
                                        doctor?.qualifications.map( (q, index) => 
                                            <span key={index} className='text-lg font-normal text-black mr-2'>{q},</span>
                                        )
                                    }
                                </div>
                                <div className='mt-6'>
                                    <h1 className='text-xl font-semibold text-black'>Timings</h1>
                                    {
                                        doctor?.timeSlots.map( (t, index) => 
                                            <h1 key={index} className='text-lg font-normal text-black'>{t}</h1>
                                        )
                                    }
                                </div>
                                <div className='mt-6'>
                                    <h1 className='text-xl font-semibold text-black'>Consultation</h1>
                                    <h1 className='text-lg font-normal text-black'>Rs. {doctor?.Price}</h1>
                                </div>
                                <button className='bg-blue-700 hover:bg-blue-900 text-white text-lg font-semibold mt-6 px-3 py-2 rounded-lg' onClick={() => { setOpenBookings(true) }}>
                                    Book an Appointment
                                </button>
                            </div>
                            <div className='lg:w-[60%] w-full py-4'>

                                <h1 className='text-4xl text-black font-bold'>{doctor?.name}</h1>
                                <div className='flex w-full h-[40px] gap-4 justify-start items-center'>
                                    <img className='w-[20px] h-[20px] object-cover' src={Star} alt='Rating Star' />
                                    <h1 className='text-md text-black font-normal'>{doctor?.averageRatings}</h1>
                                    <h1 className='text-md text-stone-500 font-normal'>({doctor?.totalRatings})</h1>
                                </div>
                                <span className='text-xl text-stone-500 font-semibold mt-4'>{doctor?.specialization}</span>
                                <p className='text-lg text-black font-normal mt-2'>{doctor?.about}</p>
                                <div className='w-full h-fit shadow-lg shadow-gray-500/50 cursor-pointer mt-4' onClick={handleClick}>
                                    <h1 className='px-3 py-6 text-black text-2xl font-semibold inline'>Experience</h1>
                                    {
                                        open ? 
                                        (
                                            <button className='px-3 py-6' onClick={handleClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-dash-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                </svg>
                                            </button>
                                        ) : 
                                        (
                                            <button className='px-3 py-6' onClick={handleClick}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-plus-square" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                </svg>
                                            </button>
                                        )
                                    }
                                    {
                                        open && (
                                            
                                            doctor?.experiences.map((e, index) => 
                                                <h1 className='px-3 py-2 text-lg font-normal text-stone-500'>{index + 1}. {e}</h1>
                                            )
                                            
                                        )
                                    }
                                </div>
                            
                                <div className='mt-4'>
                                    <h1 className='py-3 text-black text-xl font-bold'>Reviews</h1>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        )
                        }
                        
                    </section>
                </Layout>
                </>
            )
        }
        
    </>
  )
}

export default DoctorDetails
