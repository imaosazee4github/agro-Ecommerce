import {useEffect, useState} from 'react'
import Loader from '../../components/Loader'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials} from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/api/userSlice'


const Signup = () => {
  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmedPassword, setConfirmedPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [register, {isLoading}] = useRegisterMutation()
  const{ userInfo } = useSelector(state => state.auth)

  const {search} = useLocation()

  const sp = new URLSearchParams(search)

 const redirect = sp.get("redirect") || '/';

useEffect(() => {
  if(userInfo){
    navigate(redirect)
  }

},[navigate, redirect, userInfo])

const submitHandler = async(e) => {
e.preventDefault()

if (password !== confirmedPassword){
  toast.error("Password do not match")
}else{
  try{
    const res = await register({ name, email, password}).unwrap()
     dispatch(setCredentials({ ...res }));
    navigate(redirect);
    toast.success("User successfully registered");
  }catch(error){
    console.error("Registration error:", error);
    toast.error(error?.data?.message || "Registration failed");
  }
}
}
  return (
    <div className='max-w-[50vw] h-full m-auto bg-slate-100 rounded-lg my-20'>
        <div>
            <h3 className='text-center text-xl font-bold p-4'>GET REGISTERED</h3>
            <form onSubmit={submitHandler}>
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
                <div className='my-10 mx-10 flex flex-col font-semibold'>
                    <label htmlFor='comfirmedPassword' className='mx-4'>Confirmed Password:</label>
                    <input 
                    type='password' 
                    id='comfirmedPassword'
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    placeholder='Enter Password' 
                    className='w-[95%] h-10 outline-none p-4'/>
                </div> 
                <div 
                className='relative  flex flex-col items-center justify-center'>
                <button 
                disabled={isLoading} 
                type="submit" 
                className='w-40 h-10 bg-red-500 text-white rounded-full font-bold cursor-pointer'>
                    {isLoading ? "Registering..." : "Register"}
                    </button>
                     <span 
                     className='absolute  -top-6 '>
                      {isLoading && <Loader/>}
                      </span>
                </div>
            </form>
             <p className='my-10 mx-10 font-semibold py-6'>
                Already have an account? {" "}
                 <Link 
                 className='underline hover:text-red-900' 
                 to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Login here
                  </Link>
            </p>
        </div>
   
    </div>
  )
}


export default Signup