import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Star from '../assets/images/Star.png'

const SearchDoctor = () => {

  const [doctors, setDoctors] = useState([])
  const [keyword, setKeyword] = useState('')

  const getAllDoctors = async() => {
    try {
        const res = await axios.get('https://medicare-backend.onrender.com/api/v1/auth/get-all-doctors?limit=4')
        if(res?.data.status){
            setDoctors(res?.data.doctors)
        }
    } catch (error) {
        
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`https://medicare-backend.onrender.com/api/v1/auth/search-doctor/${keyword}`)
      if(res.data.status){
        setDoctors(res?.data.result)
      }
    } catch (error) {
        
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
        </Layout>
    </>
  )
}

export default SearchDoctor
