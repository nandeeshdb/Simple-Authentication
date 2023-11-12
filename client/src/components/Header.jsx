import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {FaSearch} from 'react-icons/fa'

function Header() {
  const {currentUser} = useSelector((state)=>state.user)
  const[searchTerm,setSearchTerm] = useState('')
  const navigate =  useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <div className='bg-slate-300'>
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
           <Link to='/'> <h1 className='font-bold text-2xl'>Buy&<span className='text-slate-500'>Sell</span>
            </h1></Link>
           <form onSubmit={handleSubmit} className='bg-slate-100 p-2 rounded-lg flex items-center'>
           <input
            type='text'
            placeholder='search...'
            className='bg-transparent focus:outline-none  w-24 sm:w-64 '
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            
           />
           <button><FaSearch className='text-slate-600'/></button>
           
           </form>
           <ul className='flex gap-3' >
            <Link to='/'><li>Home</li></Link>
            <Link  to='about'><li>About</li></Link>

            <Link to='/profile'>

            {currentUser?(
              <img src={currentUser.profilePicture} alt="no" className='w-7 h-7 rounded-full object-cover'/>
            ):(<li>Sign In</li>)}
            </Link>
            
           </ul>
        </div>



    </div>
  )
}

export default Header