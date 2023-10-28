import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='p-20 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-2 rounded-lg'/>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-2 rounded-lg'/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-2 rounded-lg'/>
        <button  className='bg-red-800 p-2 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-60'>Sign Up</button>
      </form>
      <div className='flex gap-2 my-4 '>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-900 underline'>Sign In</span>
        </Link>
        
      </div>
    </div>
  )
}

export default SignUp