import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ListingCard from '../components/ListingCard'

function Search() {
    const[slideBarData,setSlideBarData]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc'
    })

    const navigate = useNavigate()

    const[listing,setListing] =useState([])
    const[showMore,setShowMore] = useState(false)


    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished')
        const offerFromUrl = urlParams.get('offer')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')

        if(searchTermFromUrl||typeFromUrl||parkingFromUrl||furnishedFromUrl||offerFromUrl||sortFromUrl||orderFromUrl){
            setSlideBarData({
                searchTerm:searchTermFromUrl||'',
                type:typeFromUrl||'all',
                parking:parkingFromUrl==='true' ? true : false,
                furnished:furnishedFromUrl==='true' ? true : false,
                offer:offerFromUrl==='true' ? true : false,
                sort:sortFromUrl || 'created_at',
                order:orderFromUrl || 'desc'
            })
        }

        const fetchListing = async()=>{
            const searchQuery = urlParams.toString() 
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json();
            if(data.length>8){
                setShowMore(true)
            }
            else{
                setShowMore(false)
            }
            setListing(data)


        }

        fetchListing();
    
    },[location.search])

  



    const handleChange =(e)=>{

        if(e.target.id==='all'||e.target.id==='rent'||e.target.id==='sale'){
            setSlideBarData({...slideBarData,type:e.target.id})
        }
        if(e.target.id==='searchTerm'){
            setSlideBarData({...slideBarData,searchTerm:e.target.value})
        }

        if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
            setSlideBarData({...slideBarData, 
                [e.target.id]:e.target.checked || e.target.checked==='true' ? true : false })
        }
        if(e.target.id==='sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'
            setSlideBarData({...slideBarData,sort,order})
        }

    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', slideBarData.searchTerm)
        urlParams.set('type', slideBarData.type)
        urlParams.set('parking', slideBarData.parking)
        urlParams.set('furnished', slideBarData.furnished)
        urlParams.set('offer', slideBarData.offer)
        urlParams.set('sort', slideBarData.sort)
        urlParams.set('order', slideBarData.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const showMoreClick=async()=>{
        setShowMore(false)
        const numberOfListing = listing.length;
        const startIndex = numberOfListing;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex)
        const searchQuery = urlParams.toString();

        const res= await fetch(`api/listing/get?${searchQuery}`)
        const data =await  res.json();
        if(data.length < 9){
            setShowMore(false)
        }
        setListing([...listing, ...data])

    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className=' p-8 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex gap-3 items-center'>
                        <label className='whitespace-nowrap font-semibold' >Search Term:</label>
                        <input
                        type='text'
                        id='searchTerm'
                        placeholder='search'
                        className='border p-3 w-full rounded-lg ' 
                        onChange={handleChange}
                        value={slideBarData.searchTerm}
                        />
                    </div>
                    <div className='flex gap-2 items-center flex-wrap '>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={slideBarData.type==='all'}/>
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={slideBarData.type==='rent'}/>
                            <span>Rent </span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={slideBarData.type==='sale'}/>
                            <span> Sale</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={slideBarData.offer===true}/>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center flex-wrap '>
                        <label className='font-semibold'>Amedities:</label>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={slideBarData.parking===true} />
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2 '>
                            <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={slideBarData.furnished===true}/>
                            <span>Furnished </span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort: </label>
                        <select id='sort_order' className='border p-3 rounded-lg' onChange={handleChange} defaultValue={'created_at_desc'}>
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Price latest</option>
                            <option value='createdAt_asc'>Price oldest</option>

                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-xl hover:opacity-95 my-10'>Search</button>
                </form>
            
        </div>
        <div className=' flex-1'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700'>Results</h1>

            <div className='p-6 flex flex-wrap gap-4' >
                {listing.length === 0 &&(
                    <p className='text-center semi-bold text-2xl w-full'>No listing found!!</p>
                )}

                {
                    listing && listing.map((list)=>(
                        <ListingCard 
                        key={list._id}
                        listing={list}
                        />
                    ))

                }

                {showMore &&(
                    <button onClick={showMoreClick} className='text-blue-600 hover:underline'>Show More</button>
                )}
            </div>
        </div>

    </div>
  )
}

export default Search