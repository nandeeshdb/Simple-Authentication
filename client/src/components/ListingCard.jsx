import React from 'react'
import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

function ListingCard({listing}) {
  return (
    <div className='bg-gray-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
    <Link to={`/listing/${listing._id}`}>
        <img 
        src={listing.imageUrls[0]} alt='no'
        className='h-[330px] sm:h-[220px] w-full object-cover hover:scale-105 transition-sacle duration-400'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
        <p className=' font-semibold truncate text-lg mb-2'>
            {listing.name}
        </p>
        <div className='flex items-center gap-1'>
        <MdLocationOn className='text-green-600 w-6  h-4'/>
        <p className='text-sm truncate w-full'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
        <p className='font-semibold mt-2'> $ 
            {listing.offer ? 
            listing.discountPrice : 
            listing.regularPrice}
            {listing.type==='rent' && '/month'}
        </p>

        <div className='flex gap-4'>
            <div className='font-bold text-xs'>
                {listing.bedrooms> 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
            </div>
            <div className='font-bold text-xs'>
                {listing.bathrooms> 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
            </div>

        </div>




        </div>
    </Link>
    </div>
  )
}

export default ListingCard