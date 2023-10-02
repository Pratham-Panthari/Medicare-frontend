import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import heroimg01 from '../assets/images/hero-img01.png'
import heroimg02 from '../assets/images/hero-img02.png'
import heroimg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import about from '../assets/images/about.png'
import feature from '../assets/images/feature-img.png'
import aboutCard from '../assets/images/about-card.png'
import Star from '../assets/images/Star.png'
import Faq from '../assets/images/faq-img.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [doctors, setDoctors] = useState([])
    const [open, setOpen] = useState({})
    const [faq, setFaq] = useState([])
    const [loader, setLoader] = useState(false)

    const getAllServices = async () => {
        setLoader(true)
        try {
            const res = await axios.get('https://medicare-backend.onrender.com/api/v1/services/get-all-services')
            if(res.data.status){
                setServices(res.data.services)
                setLoader(false)
            }
        } catch (error) {
           setLoader(false)
        }
    }

    const getAllDoctors = async() => {
        setLoader(true)
        try {
            const res = await axios.get('https://medicare-backend.onrender.com/api/v1/auth/get-all-doctors?limit=4')
            if(res.data.status){
                setDoctors(res.data.doctors)
                setLoader(false)
            }
        } catch (error) {
           setLoader(false)
        }
    }

    const getAllFaq = async () => {
        setLoader(true)
        try {
            const res = await axios.get('https://medicare-backend.onrender.com/api/v1/faqs/get-all-faqs')
            if(res.data.status){
                setFaq(res.data.faqs)
            }
        } catch (error) {
            setLoader(false)
        }
    }

    useEffect(() => {
        getAllServices()
        getAllDoctors()
        getAllFaq()
    }, [])

    const openFaq = (id) => {
        setOpen({...open, [id]: true})
    }
    const closeFaq = (id) => {
        setOpen({...open, [id]: false})
    }
    

  return (
    <>
        <Layout>
           {/*  ============== Hero Section =============== */}
            <div className='w-full h-full background'>
                <section className='w-[80%] mx-auto py-24'>
                    <div className='w-full h-full flex'>
                        <div className='px-3 py-2 lg:w-[50%] w-full'>
                            <h1 className='text-5xl text-black font-medium py-2'>We help patients live a healthy, longer live</h1>
                            <h1 className='text-xl text-black font-semibold mt-4'>Welcome to Medicare - Your Trusted Healthcare Companion</h1>
                            <p className='py-4 text-md text-black font-normal'>Medicare is your dedicated platform for seamless doctor appointments, tailored to your needs. Our mission is to make quality healthcare accessible to everyone. With Medicare, you're in control of your health journey. Say goodbye to long wait times and endless paperwork. Say hello to convenience, transparency, and peace of mind.</p>
                            <button className='mt-2 rounded-full text-lg px-6 py-3 text-white font-medium bg-blue-700 hover:bg-blue-800' onClick={() => {navigate('/search-doctor')}} >Book Appointment</button>
                            <div className='mt-6 flex gap-6 w-full h-fit'>
                                <div className='w-[33%]'>
                                    <h1 className='text-3xl text-black font-bold'>30+</h1>
                                    <p className='text-md text-stone-500'>Years of Experince</p>
                                </div>
                                <div className='w-[33%]'>
                                    <h1 className='text-3xl text-black font-bold'>15+</h1>
                                    <p className='text-md text-stone-500'>Clinc Locations</p>
                                </div>
                                <div className='w-[33%]'>
                                    <h1 className='text-3xl text-black font-bold'>100%</h1>
                                    <p className='text-md text-stone-500'>Patient Satisfaction</p>
                                </div>
                            </div>
                        </div>
                        <div className='py-2 w-[20%] rounded-xl h-96 ml-16 hidden lg:block md:block'>
                            <img className='w-full h-full object-fit rounded-xl' src={heroimg01} alt='Hero Image 1' />
                        </div>
                        <div className='py-2 w-[20%] rounded-xl h-full ml-4 hidden lg:block md:block'>
                            <img className='object-fit rounded-xl mt-4 h-52 w-auto' src={heroimg02} alt='Hero Image 2' />
                            <img className='object-fit rounded-xl mt-4 h-52 w-auto pl-2' src={heroimg03} alt='Hero Image 3' />
                        </div>
                    </div>
                </section>
            </div>
            {/* ================= Medical Services section =================== */}
            <section className='py-16 w-[80%] mx-auto'>
                <h1 className='text-4xl text-black text-center font-medium'>Providing the Best <br/> Medical Services</h1>
                <p className='text-lg text-stone-500 font-normal text-center mt-4'>World class care for everyone. Our health care system offers <br/> unmatched expert care.</p>
                <div className='w-full py-16 lg:flex gap-6'>
                    <div className='lg:w-[33%] w-full'>
                        <img className='w-[200px] h-[200px] object-cover justify-center mx-auto' src={icon01} alt='icon01' />
                        <h1 className='text-2xl text-black font-semibold py-6 text-center'>Find a Doctor</h1>
                        <p className='text-lg text-stone-500 font-normal text-center'>World class care for everyone. Our health care system offers unmatched expert care.</p>
                    </div>
                    <div className='lg:w-[33%] w-full'>
                        <img className='w-[200px] h-[200px] object-cover justify-center mx-auto' src={icon02} alt='icon01' />
                        <h1 className='text-2xl text-black font-semibold py-6 text-center'>Find a Locations</h1>
                        <p className='text-lg text-stone-500 font-normal text-center'>World class care for everyone. Our health care system offers unmatched expert care.</p>
                    </div>
                    <div className='lg:w-[33%] w-full'>
                        <img className='w-[200px] h-[200px] object-cover justify-center mx-auto' src={icon03} alt='icon01' />
                        <h1 className='text-2xl text-black font-semibold py-6 text-center'>Book an Appointment</h1>
                        <p className='text-lg text-stone-500 font-normal text-center'>World class care for everyone. Our health care system offers unmatched expert care.</p>
                    </div>
                </div>
            </section>
            {/* ==================== Proud Section ==================== */}
            <section className='py-12 w-[80%] mx-auto'>
                <div className='w-full lg:flex gap-6'>
                    <div className='lg:w-[50%] w-full'>
                        <img className='w-[400px] h-[400px] rounded-xl object-cover mx-auto' src={about} alt='about' />
                    </div>
                    <div className='lg:w-[50%] w-full'>
                        <h1 className='text-4xl text-black font-semibold'>Proud to be one of nations best</h1>
                        <p className='text-stone-600 font-normal mt-6'>At Medicare, we're on a mission to transform the way you access healthcare. We understand that finding the right doctor and scheduling appointments can be a challenging and time-consuming task. That's why we've created a platform that puts your health and convenience first.
                        <br/> <br/> Our dedicated team is passionate about making healthcare accessible to all. We believe that everyone deserves easy access to quality medical care. With Medicare, you can book appointments with top-notch healthcare professionals effortlessly.
                        <br/> <br/> We're committed to transparency, security, and patient satisfaction. Our platform not only helps you find the right healthcare provider but also allows you to read real patient reviews, ensuring you make informed decisions about your health.
                        </p>
                        <button className='mt-4 rounded-full text-lg px-6 py-3 text-white font-medium bg-blue-700 hover:bg-blue-800'>Learn More</button>
                    </div>
                </div>
            </section>
            {/* ==================== Medical Services =================== */}
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
                        <section className='py-12 w-[80%] mx-auto'>
                            <h1 className='lg:text-4xl text-2xl text-black font-semibold text-center'>Our Medical Services</h1>
                            <div className='w-full px-4 py-2 lg:grid lg:grid-cols-3 lg:gap-10 mt-16'>
                                {
                                    services.map(service => 
                                        <div key={service._id} className='col'>
                                            <h1 className='lg:text-2xl text-xl text-black font-medium text-center mt-4'>{service.name}</h1>
                                            <p className='lg:text-lg text-md text-stone-500 font-normal mt-4 text-center'>{service.description}</p>
                                        </div>
                                    ) 
                                }
                                
                            </div>
                        </section>
                    </>
                )
            }
           
            {/* =================== Virtual Treatment ========================== */}
            <section className='py-12 lg:w-[60%] w-[80%] mx-auto'>
                <div className='lg:flex gap-10'>
                    <div className='lg:w-[50%] w-full'>
                        <h1 className='lg:text-4xl text-2xl text-black font-semibold'>Get virtual treatment anytime</h1>
                        <p className='lg:text-lg text-md text-stone-500 mt-6'>1. Schedule the appointment directly. <br/>2. Search for your physicans here, and contact their office. <br/>3. Use your online scheduling tool to book an appointment. </p>
                        <img className='w-[300px] h-[200px] object-cover' src={aboutCard} alt='About-Card' />
                    </div>
                    <div className='w-[50%] hidden lg:block'>
                        <img className='w-full h-full object-cover' src={feature} alt='feature-image' />
                    </div>
                </div>
            </section>
           {/*  ======================== Featured Doctors ======================= */}
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
                        <section className='py-12 w-[80%] mx-auto'>
                            <h1 className='text-4xl text-black font-semibold text-center'>Our Featured Doctors</h1>
                            <p className='mt-4 text-lg text-stone-500 font-normal text-center'>Get an appointment with our most reputed and famous specialists at affordable rates.</p>
                            <div className='w-full px-4 py-2 lg:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 lg:gap-10 mt-16'>
                                {
                                    doctors.map(doctor => 
                                        <Link key={doctor._id} to={`/doctor/${doctor._id}`}>
                                            <div  className='col mt-2'>
                                                <img className='lg:w-full lg:h-[300px] w-auto h-96 object-fill rounded-xl self-center' src={doctor.photo} alt='Doctor-Photo' />
                                                <h1 className='text-2xl text-black font-semibold mt-4'>{doctor.name}</h1>
                                                <div className='flex justify-between mt-4'>
                                                    <div className='w-[50%]'>
                                                        <div className='bg-cyan-300 w-[80%] h-[40px] rounded-xl'>
                                                            <h1 className='text-center text-black-800 font-bold text-sm py-2'>{doctor.specialization}</h1>
                                                        
                                                        </div>
                                                    </div>
                                                    <div className='w-[50%]'>
                                                        <div className='flex w-full h-[40px] gap-4 justify-end items-center'>
                                                            <img className='w-[20px] h-[20px] object-cover' src={Star} alt='Rating Star' />
                                                            <h1 className='text-md text-black font-normal'>{doctor.averageRatings}</h1>
                                                            <h1 className='text-md text-stone-500 font-normal'>({doctor.totalRatings})</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className='text-stone-500 text-md mt-4'>{doctor.bio}</p>
                                                
                                            </div>    
                                        </Link>
                                    )
                                }
                            </div>
                        </section>
                    </>
                )
            }
            
            {/* ================== Frequently Asked Questions =================== */}
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
                        <section className='w-[80%] mx-auto py-12'> 
                            <div className='w-full lg:flex lg:gap-10'>
                                <div className='lg:w-[50%] w-full'>
                                    <img className='w-full h-[400px] object-contain' src={Faq} alt='Faq-image' />
                                </div>
                                <div className='lg:w-[50%] w-full'>
                                    <h1 className='text-black text-2xl font-semibold mt-4 text-center'>Frequently Asked Questions</h1>
                                    <div className='bg-white shadow-lg shadow-stone-300 w-full h-fit mt-8'>
                                        {
                                            faq.map(f => 
                                                <div key={f._id} className='w-full h-fit items-center px-3 py-4'>
                                                    <h1 className='px-2 py-6 lg:text-xl text-sm text-black font-medium inline cursor-pointer' onClick={() => {openFaq(f._id)}}>{f.question}</h1>
                                                
                                                    {
                                                    open[f._id] ? (<button className='px-2' onClick={() => {closeFaq(f._id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-dash-square" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                                                                </svg>
                                                        </button>) : (
                                                            <button className='px-2' onClick={() => {openFaq(f._id)}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-plus-square" viewBox="0 0 16 16">
                                                                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                                                </svg>
                                                            </button>
                                                        )
                                                    }
                                                    {
                                                        open[f._id] && (
                                                            <p className='lg:text-lg text-sm text-stone-500 font normal px-4 py-2'>{f.answer}</p>
                                                        )
                                                    }
                                                    
                                                    <hr/>
                                                </div>    
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
            
        </Layout>
    </>
  )
}

export default Home
