import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

function SignUp() {
  const [formData,setFormData] = useState({})
  const[error,setError] = useState(false)
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange =(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});

  }

  const handleSubmit= async(e)=>{
    e.preventDefault();

    try {
      setLoading(true)
      setError(false)
      const res = await fetch('api/auth/signup', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      setLoading(false)
      if(data.success === false){
        return setError(true)
        
      }
      navigate('/sign-in')
      
      
    } catch (error) {
      setError(true)
      setLoading(false)
    }

    
    

  }
  
  return (
    <div className='p-20 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' onChange={handleChange} className='bg-slate-100 p-2 rounded-lg'/>
        <input type="email" placeholder='Email' id='email' onChange={handleChange} className='bg-slate-100 p-2 rounded-lg'/>
        <input type="password" placeholder='Password' id='password' onChange={handleChange} className='bg-slate-100 p-2 rounded-lg'/>
        <button disabled={loading} className='bg-red-800 p-2 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-60'>
          {loading? "loading":"sign up"}
        </button>
        <OAuth />
        
      </form>
      
      <div className='flex gap-2 my-4 '>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-900 underline'>Sign In</span>
        </Link>
      </div>
      <h2 className='text-red-500 mt-5 font-medium'>
        {error&& "Account Not Created"}
      </h2>
    </div>
  )
}

export default SignUp