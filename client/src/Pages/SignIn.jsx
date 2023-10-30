import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {

  const [formData,setFormData] = useState({});
  const {loading,error} = useSelector((state)=>state.user)
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onChangeHandler=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const onSubmitHandler =async(e)=>{
    e.preventDefault();

    try {
        dispatch(signInStart())
        
        const res = await fetch('api/auth/signin', {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        })

      const data = await res.json();
      

      if(data.success===false){
        return dispatch(signInFailure(data.message))
      }
      dispatch(signInSuccess(data))
      navigate('/');
      
    } catch (error) {
      dispatch(signInFailure(error))
      
      
    }

    

  }

  return (
    <div className='p-20 max-w-lg mx-auto'>
        <h1 className='font-bold text-center my-7 text-xl'>Sign Up</h1>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-3 '>
          <input onChange={onChangeHandler} className='bg-slate-100 rounded-lg p-2 ' type="email" placeholder='Enter Email' id='email'/>
          <input onChange={onChangeHandler} className='bg-slate-100 rounded-lg p-2 ' type="password" placeholder='Enter Email' id='password'/>
          <button disabled={loading} className='bg-red-800 text-white rounded-lg my-4 p-2 uppercase hover:opacity-90 disabled:opacity-70'>
            {
              loading?"loading":"sign in"
            }
          </button>
        </form>
        <p className='my-3'>
          Dont have an account? 
          <Link to='/sign-up'>
          <span className='text-blue-800 underline'>  Sign Up</span>
            </Link>
        </p>

       
        {error && <p className='text-red-500 mt-5'>{error}</p>}
      

    
      
    </div>
  )
}

export default SignIn