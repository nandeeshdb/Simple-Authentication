import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

function Contact({listing}) {
    const[landlord,setLandlord]= useState(null);
    const[message,setMessage] = useState('')

    const onChangeHandler=(e)=>{
        setMessage(e.target.value)
    }

    useEffect(() => {
        const fetchLandlord = async () => {
          try {
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandlord(data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchLandlord();
      }, [listing.userRef]);

  return (
    <div>{landlord && (
        <div className='flex flex-col gap-3'>
        <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>
        <textarea className=' w-full border p-3 rounded-lg' name='message' id='message' value={message} onChange={onChangeHandler} placeholder='Enter your message'></textarea>
        <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-center p-3 text-white rounded-lg hover:opacity-95'>
        Send Message
        </Link>
        </div>
    )}
    </div>
  )
}

export default Contact