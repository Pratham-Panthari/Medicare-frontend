import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Star from '../assets/images/Star.png'

const SearchDoctor = () => {

  const [doctors, setDoctors] = useState([])
  const [keyword, setKeyword] = useState('')
  const [loader, setLoader] = useState(false)

  const getAllDoctors = async() => {
    setLoader(true)
    try {
        const res = await axios.get('https://medicare-backend.onrender.com/api/v1/auth/get-all-doctors?limit=4')
        if(res?.data.status){
            setDoctors(res?.data.doctors)
            setLoader(false)
        }
    } catch (error) {
        setLoader(false)
    }
  }

  const handleSearch = async (e) => {
    setLoader(true)
    e.preventDefault()
    try {
      const res = await axios.get(`https://medicare-backend.onrender.com/api/v1/auth/search-doctor/${keyword}`)
      if(res.data.status){
        setDoctors(res?.data.result)
        setLoader(false)
      }
    } catch (error) {
        setLoader(false)
    }
  }

  useEffect(() => {
    getAllDoctors()
  }, [])


  return (
    <>
        <Layout>
            <section className='w-full h-[400px] background flex justify-center items-center'>
              <div className='lg:w-[40%] w-[80%] mx-auto'>
                <h1 className='py-6 text-4xl text-black font-bold text-center'>Find A Doctor</h1>
                <input className='lg:w-[80%] w-[70%] px-2 py-3 inline rounded-md' type='text' placeholder='Search Doctor' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} >
                </input>
                <button type='button' className='px-3 py-3 lg:w-[15%] w-[25%] rounded-xl ml-2 text-white text-lg font-semibold bg-blue-700 hover:bg-blue-900' onClick={(e) => {handleSearch(e)}} >
                  Search
                </button>
              </div>
            </section>
            {
              loader ? 
              (<>
                <div className='w-full h-[300px] flex justify-center items-center'>
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
                  <div className='w-full px-4 py-2 lg:grid lg:grid-cols-4 lg:gap-10'>
                        {
                            doctors.map(doctor => 
                                <Link to={`/doctor/${doctor._id}`}>
                                    <div key={doctor._id} className='col mt-2 '>
                                        <img className='w-full h-[300px] object-fill rounded-xl' src={doctor.photo} alt='Doctor-Photo' />
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
            
        </Layout>
    </>
  )
}

export default SearchDoctor
