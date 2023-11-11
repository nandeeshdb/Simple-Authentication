import React from 'react'

function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className=' p-8 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex gap-3 items-center'>
                        <label className='whitespace-nowrap font-semibold' >Search Term:</label>
                        <input
                        type='text'
                        id='searchTerm'
                        placeholder='search'
                        className='border p-3 w-full rounded-lg ' 
                        />
                    </div>
                    <div className='flex gap-2 items-center flex-wrap '>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='all' className='w-5'/>
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='rent' className='w-5'/>
                            <span>Rent </span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='sale' className='w-5'/>
                            <span> Sale</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='offer' className='w-5'/>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center flex-wrap '>
                        <label className='font-semibold'>Amedities:</label>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='parking' className='w-5'/>
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='furnished' className='w-5'/>
                            <span>Furnished </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort: </label>
                        <select id='sort_order' className='border p-3 rounded-lg'>
                            <option>Price high to low</option>
                            <option>Price low to high</option>
                            <option>Price latest</option>
                            <option>Price oldest</option>

                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-xl hover:opacity-95 my-10'>Search</button>
                </form>
            
        </div>
        <div className=''>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700'>Results</h1>
        </div>
    </div>
  )
}

export default Search