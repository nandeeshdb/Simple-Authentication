import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  list,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut
} from '../redux/user/userSlice';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError,setShowListingError] = useState(false)
  const[userListing,setUserListing] = useState([])

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };


  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };


  const handleSignOut=async()=>{
    try {
      dispatch(signOut())
      await fetch('api/auth/signout')
      
    } catch (error) {
      console.log(error)
      
    }
  }

  const handleShowListing=async(e)=>{
    

    try {
      setShowListingError(false)

      const res = await fetch(`api/user/listing/${currentUser._id}`)
      const data = await res.json();
      if(data.success === false){

        setShowListingError(true)
      }

      setUserListing(data)
      
    } catch (error) {
      setShowListingError(true)
      
    }

   
  }


  const handleDeleteListing=async(listingId)=>{


    try {
      const res = await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE'
      })

      const data = res.json();
      if(data.success===false){
        console.log(data.message)
      }

      setUserListing((prev)=>prev.filter((listing)=>listing._id !== listingId));
      
    } catch (error) {
      console.log(error.message)
      
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
      
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>

        <Link to='/create-listing' className='bg-green-800 p-3 rounded-xl uppercase text-white text-center hover:opacity-70'>
          Create Listing
          </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
      <button className='w-full text-green-700' onClick={handleShowListing}>Show Your Listings</button>
      <p className='w-full text-red-700'>{
        showListingError && 'Error while showing your listing' 
      }</p>

      
    
    {
        userListing && userListing.length > 0 &&

        
          userListing.map((listing)=>(
          
          <div key={listing._id} className='border gap-6 p-3 flex justify-between items-center' > 
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="no" 
            className='h-20 w-25 object-contain '/>
          </Link>

          <Link className='flex-1' to={`/listing/${listing._id}`}>
          <p className=' font-semibold hover:underline truncate'>{listing.name}</p>
          </Link>

            <div className='flex flex-col gap-3'>
              <button className='text-red-700' onClick={()=>handleDeleteListing(listing._id)}>Delete</button>
              
              <Link to={`/update-listing/${listing._id}`}>
                <button className='text-green-700'>Edit</button>
                </Link>
            </div>
          
          </div> 

         ))
        
        }

       
          

        
  

      

  

    </div>

    
  );
}