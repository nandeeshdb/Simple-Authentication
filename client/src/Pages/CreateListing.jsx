import React from 'react'

function CreateListing() {
  return (
    <main className='p-4 max-w-4xl mx-auto'>
    <h1 className='font-semibold text-2xl text-center my-8 '>
        Create Listing</h1>
        <form className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-4 flex-1'>
                <input className='border shadow-sm rounded-lg p-3' type='text' required placeholder='Name' id='name' minLength='10' maxLength='80' />
                <textarea className='border shadow-sm rounded-lg p-3' type='text' required placeholder='Description' id='description' />
                <input className='border shadow-sm rounded-lg p-3' type='text' required placeholder='address' id='Address' />
                <div className='flex gap-8 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'/>
                        <span className=' font-semibold'>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'/>
                        <span className=' font-semibold'>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'/>
                        <span className=' font-semibold'>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'/>
                        <span className=' font-semibold'>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='other' className='w-5'/>
                        <span className=' font-semibold'>Other</span>
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap'>
                    <div className='flex gap-2 items-center'>
                        <input className="border p-3 rounded-lg" type="number" id="beds" min='0' max='10'/>
                        <p className='font-semibold'>Beds</p>
                    </div >
                    <div className='flex gap-2 items-center'>
                        <input className="border p-3 rounded-lg" type="number" id="baths" min='0' max='5'/>
                        <p className='font-semibold'>Baths</p>
                    </div>
                   
                    <div className='flex gap-2 items-center'>
                        <input className="border p-3 rounded-lg" type="number" id="regular-price" min='0' max='10'/>
                        <div className='flex-col'>
                        <p className='font-semibold'>Regular Price</p>
                        <span className='text-sm'>($ / month)</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
        
                        <input className="border p-3 rounded-lg" type="number" id="discounted-price" min='0' max='1000'/>
                        <div className='flex-col'>
                        <p className='font-semibold'>Discounted Price</p>
                        <span className='text-sm'>($ / month)</span>
                        </div>
                    </div>
                    
                
                </div>
            </div>

            <div className='flex flex-1 flex-col gap-4'>
                <p className='font-semibold'>Image:
                <span className='font-normal text-sm text-gray-600'>The frist image will be the cover(max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input className='p-3 rounded-l border border-gray-400' type='file' accept='image/*' multiple/>
                    <button className= 'border rounded-xl p-3 border-green-700 text-green-700 hover:shadow-xl disabled:opacity-80 '>Upload</button>
                </div>
                <button className='bg-slate-700 p-3 rounded-xl text-white uppercase hover:opacity-95 disabled:opacity-60'>Create Listing</button>


            </div>
            


           

        </form>
    
    </main>
  )
}

export default CreateListing