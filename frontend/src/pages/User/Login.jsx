import {useEffect, useState} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/api/userSlice'
import { setCredentials } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

   const  handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const res = await login({email, password}).unwrap()
      console.log(res)
      dispatch(setCredentials({...res}))

    }catch(error){
        toast.error(error?.data?.message || error.message)
    }

   }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector(state => state.auth)

    const {search} = useLocation()

    const sp = new URLSearchParams(search)

    const redirect = sp.get("redirect") || '/';

    useEffect(() => {
        if(userInfo){
        navigate(redirect)

        }
    }, [navigate, redirect, userInfo])
   
  return (
    <div className='max-w-[50vw] h-[90vh]  m-auto bg-slate-100 rounded-lg my-20'>
            <h3 className='text-center text-xl font-bold p-4'>LOGIN
            </h3>
            
            <form onSubmit={handleSubmit}>
                <div className='my-10 mx-10 flex flex-col font-semibold '>
                    <label htmlFor='email' className='mx-4'>Email Address:</label>
                    <input 
                    id="email"
                    value={email}
                    type='text' 
                    placeholder='Enter Email' 
                    onChange={e => setEmail(e.target.value)}
                    className='w-[95%] h-10 outline-none p-4'/>
                </div>
                  <div className='my-10 mx-10 flex flex-col font-semibold'>
                    <label htmlFor='password' className='mx-4'>Password:</label>
                    <input 
                    type='password' 
                    id="password"
                    value={password}
                    placeholder='Enter Password' 
                    onChange={e => setPassword(e.target.value)}
                    className='w-[95%] h-10 outline-none p-4'/>
                    <Link className='text-sm text-end mr-7 underline hover:text-red-500'>Forget Password</Link>
                </div> 
                <div className='relative  flex flex-col items-center justify-center'>
                <button disabled={isLoading} type="submit" className='w-40 h-10 bg-red-500 text-white rounded-full font-bold cursor-pointer'>
                    {isLoading ? "Login...." : "Login"}
                    </button>
                     <span className='absolute  -top-6 '>{isLoading && <Loader/>}</span>
                </div>
               
            </form>
            <div>
            <p className='my-10 mx-10 font-semibold'>
                Don't have an account? {" "} <Link className='underline hover:text-red-900' to={redirect ? `/sign-up?redirect=${redirect}` : '/sign-up'}>Register here</Link>
            </p>
            </div>
   
    </div>
  )
}

export default Login