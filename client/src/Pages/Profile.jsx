import  { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'

function Profile() {
  const {currentUser} = useSelector((state)=>state.user)
  const fileRef = useRef(null)
  const [image,setImage] = useState(undefined);
  const[imagePercentage,setImagePercentage] = useState(0)
  const[imageError,setImageError] = useState(false);
  const[formData,setFormData] = useState({})
  console.log(formData)
 
  

  useEffect(()=>{
    if(image){
    handleFileUpload(image)}
  },[image])

  const handleFileUpload =async (image)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName)

    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress))

      },
   

    (error)=>{
      setImageError(true);
    },

    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadUrl)=>{
        setFormData({...formData,profilePicture:downloadUrl})

      })
    }
    );


  }
  return (
    <div className='p-20 max-w-lg mx-auto'>
      <h1 className='font-bold text-center  text-xl'>Profile</h1>
      <form className='flex flex-col gap-3'>
      <input
          onChange={(e) => setImage(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img src={currentUser.profilePicture} onClick={()=>fileRef.current.click()}  alt='no' className='w-28 h-28 rounded-full self-center cursor-pointer '/>
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className='text-slate-700'>{` Uploading ${imagePercentage} % `}</span>
          ) : imagePercentage === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input defaultValue={currentUser.username} type="text" placeholder='Username' id='username' className='bg-slate-100 rounded-lg p-2 '/>
        <input defaultValue={currentUser.email} type="email" placeholder='Email' id='email' className='bg-slate-100 rounded-lg p-2 '/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 rounded-lg p-2 '/>
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