import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from './Contact';

function Listing() {
    SwiperCore.use([Navigation])
    const {currentUser} = useSelector((state) => state.user);

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const[contact,setContact] =useState(false);
    const params = useParams();
    useEffect(() => {       
      const fetchListing = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/listing/get/${params.listingId}`);
          const data = await res.json();
          if (data.success === false) {
            setError(true);
            setLoading(false);
            return;
          }
          setListing(data);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchListing();
    }, [params.listingId]);
    console.log(loading);
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <>
            <Swiper navigation>
                {listing.imageUrls.map((url)=>(
                    <SwiperSlide key={url}>
                        <div className='h-[450px]' style={{background:`url(${url}) center no-repeat `,backgroundSize:'cover'}}>
                        </div>
                    </SwiperSlide>

                
                ))}
            </Swiper>
            <div className='flex flex-col p-3 my-7 gap-4 max-w-4xl mx-auto sm:mx-20   '>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice
                : listing.regularPrice}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4 my-2'>
            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg'>
                {listing.type==='rent' ? 'For Rent' : 'For Sale'}
            </p>
            {
                listing.offer&&(
                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg'>${+listing.regularPrice - listing.discountPrice}</p>
                )
            }
            </div>
           <p className='text-slate-700'><span className='font-semibold text-black text-xl'>Description - </span>
            {listing.description}</p>

            <ul className='flex gap-10 items-center flex-wrap'>
            <li className='flex gap-2 items-center text-green-900 font-semibold'>
                <FaBed className='text-2xl'/>
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                
            </li>
            <li className='flex gap-2 items-center text-green-900 font-semibold'>
                <FaBath className='text-2xl'/>
                {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}
                
            </li>
            <li className='flex gap-2 items-center text-green-900 font-semibold'>
                <FaParking className='text-2xl'/>
                {listing.parking  ? 'Parking' : 'No Parking'}
                
            </li>
            <li className='flex gap-2 items-center text-green-900 font-semibold'>
                <FaChair className='text-2xl'/>
                {listing.furnished  ? 'Furnished' : 'Not Furnished'}
                
            </li>
            </ul>
            {
                currentUser && listing.userRef !== currentUser._id && !contact &&(
                    <button onClick={()=>setContact(true)} className='bg-slate-600 p-3 rounded-lg text-white  my-4 uppercase hover:opacity-95'>Contact landlord</button>

                )
            }
            {
                contact && <Contact listing={listing}/>
            }
           
            </div>

        </>
      )}
    </main>
  )
}

export default Listing