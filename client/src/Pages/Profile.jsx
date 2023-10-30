import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='p-20 max-w-lg mx-auto'>
      <h1 className='font-bold text-center  text-xl'>Profile</h1>
      <form className='flex flex-col gap-3'>
        <img src={currentUser.profilePicture} alt='no' className='w-28 h-28 rounded-full self-center cursor-pointer '/>
        <input defaultValue={currentUser.username} type="text" placeholder='Username' id='username' className='bg-slate-100 rounded-lg p-2 '/>
        <input defaultValue={currentUser.email} type="email" placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-2 '/>
        <input type="password" placeholder='Password' id='username' className='bg-slate-100 rounded-lg p-2 '/>
        <button className='bg-red-800 text-white p-2 rounded-lg mt-2 uppercase '>Update</button>
      </form>
      <div className='text-red-600 flex justify-between mt-3'>
        <span>Delete</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile