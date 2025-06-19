import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
// import { setCredentials } from '../../redux/features/auth/authSlice'
import { useProfileMutation } from '../../redux/api/userSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'


const Profile = () => {
    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmedPassword, setConfirmedPassword] = useState("")

    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile }] = useProfileMutation()

    useEffect(() => {
        setName(userInfo.name),
        setEmail(userInfo.email)

    },[userInfo.name, userInfo.email])

    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(password !== confirmedPassword){
            toast.error("Password do not match")
        }else{
            try{

                const res = await updateProfile({
                    _id : userInfo._id, name, email, password }).unwrap()
                    dispatch(setCredentials({...res}))
                     toast.success("User profile updated successfully");

            }catch(error){
                toast.error(error?.data?.message || error.message)

            }
        }

    }

    



   return (
    <div className='max-w-[50vw] h-full m-auto bg-slate-100 rounded-lg my-20'>
        <div>
            <h3 className='text-center text-xl font-bold p-4'>Update Profile</h3>
            <form onSubmit={handleSubmit}>
                 <div className='my-10 mx-10 flex flex-col font-semibold'>
                    <label htmlFor='name' className='mx-4'>Name:</label>
                    <input 
                    type='text' 
                    id = "name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter Complete Name'
                    className='w-[95%] h-10 outline-none p-4'/>
                </div>
                <div className='my-10 mx-10 flex flex-col font-semibold'>
                    <label htmlFor='email' className='mx-4'>Email Address:</label>
                    <input
                     type='text' 
                     id="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder='Enter Email' 
                     className='w-[95%] h-10 outline-none p-4'/>
                </div>
                  <div className='my-10 mx-10 flex flex-col font-semibold'>
                    <label htmlFor='password' className='mx-4'>Password:</label>
                    <input
                    type='password' 
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password' 
                    className='w-[95%] h-10 outline-none p-4'/>
                </div> 
                <div className=' mx-10 flex flex-col font-semibold'>
                    <label htmlFor='comfirmedPassword' className='mx-4'>Confirmed Password:</label>
                    <input 
                    type='password' 
                    id='comfirmedPassword'
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    placeholder='Enter Password' 
                    className='w-[95%] h-10 outline-none p-4'/>
                </div> 
                <div className='flex align-center justify-center my-8 gap-20 py-4 '>
                <div className='relative'>
                <button 
                disabled={loadingUpdateProfile} 
                type="submit" 
                className='w-40 h-10 bg-red-500 text-white rounded-full font-bold cursor-pointer'>
                    {loadingUpdateProfile ? "Updating..." : "Update"}
                    </button>

                     <span 
                     className='absolute  -top-6 right-6'>
                      {loadingUpdateProfile && <Loader/>}
                      </span>
                      
                </div>
                <div className='mt-2 relative'>
                 <Link to="/user-order" className=' bg-red-500 text-white rounded-full font-bold cursor-pointer  px-10 py-2'
                      >My order
                      </Link>
                      </div>
                      </div>
            </form>
        </div>
   
    </div>
  )
}

export default Profile