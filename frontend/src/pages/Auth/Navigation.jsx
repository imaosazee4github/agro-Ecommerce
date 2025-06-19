import React, { useState } from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShop } from "react-icons/fa6";

import { FaRegUser } from "react-icons/fa";
import { LuFolderHeart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import '../Auth/Navigation.css'
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../redux/api/userSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { RiArrowDropDownLine } from "react-icons/ri";


const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth)
    const[dropdownOpen, setDropDownOpen] = useState(false);
    const[showSideBar, setShowSideBar] = useState(false);

    const toggleDropdown = () => {
        setDropDownOpen(!dropdownOpen)
    }

    const toggleSidebar = () => {
        setShowSideBar(!showSideBar)
    }

    const closeSideBar =() => {
        setShowSideBar(false)
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall]  = useLogoutMutation()

    const logoutHandler = async() => {
      try{
        await logoutApiCall().unwrap()
        dispatch(logout())
        navigate("/")

    }catch(error){
      console.error(error)
    }

    }

    

  return (
    <div className='flex flex-col justify-between'>
    <div style={{zindex:999}} 
    className={`${showSideBar ? "hidden" : "flex"}   
    xl:flex lg:flex md:hidden sm:hidden flex flex-col p-4 justify-between
    text-white bg-black w-[4%] hover:w-[15%] h-[100vh]  fixed`} id='navigation-container'>
      <div className='space-y-6 mb-4'>


           <div className='flex flex-col justify-center'>
            <Link to="/" className='flex items-center transition-transform transform hover:translate-x-2'>
               <IoHomeOutline className='mr-3 mt-[3px]'  size="26"/>
               <span className='hidden nav-item-name mt-[3px]'>HOME</span>
            </Link>
           </div>
           <div className='flex flex-col justify-center  space-y-4'>
            <Link to="/shop" className='flex items-center transition-transform transform hover:translate-x-2'>
               <FaShop className='mr-2 '  size="26"/>
               <span className='hidden nav-item-name'>SHOP</span>
            </Link>
           </div>
           <div className='flex flex-col justify-center  space-y-4'>
            <Link to="/cart" className='flex items-center transition-transform transform hover:translate-x-2'>
               < AiOutlineShoppingCart className='mr-2 '  size="26"/>
               <span className='hidden nav-item-name '>CART</span>
            </Link>
           </div>
           <div className='flex flex-col justify-center   space-y-4'>
            <Link to="/favourite" className='flex items-center transition-transform transform hover:translate-x-2'>
               <LuFolderHeart className='mr-2 '  size="26"/>
               <span className='hidden nav-item-name '>FAVOURITE</span>
            </Link>
           </div>
           </div>
              <div className='relative'>
            <button onClick={toggleDropdown} className='flex items-center text-gray-800 focus:outline-none'>
               {userInfo ? (<span className='text-white text-xs'>{userInfo.name}</span>) : (<></>)}
               {userInfo && (<RiArrowDropDownLine  
                  className={`h-8 w-8 ml-1 text-white ${dropdownOpen ? "transform rotate-180" : ""}`}/>
               )}
            </button>
            {dropdownOpen && userInfo &&(
               <ul className={`absolute right-0 mt-4 ml-14 space-y-2  text-white text-xs  ${!userInfo.isAdmin ? '-top-20' : "-top-80 "}`}>
                  {userInfo.isAdmin && (
                     <>
                     <li>
                        <Link to="/admin/dashboard" className='block px-4 py-2 hover:bg-gray-200 '>
                        Dashboard
                        </Link>
                        </li>

                         <li>
                        <Link to="/admin/productList" className='block px-4 py-2 hover:bg-gray-200'>
                        Products
                        </Link>
                     </li>

                      <li>
                        <Link to="/admin/categoriesList" className='block px-4 py-2 hover:bg-gray-200'>
                        Category
                        </Link>
                     </li>
                      <li>
                        <Link to="/admin/orderList" className='block px-4 py-2 hover:bg-gray-200'>
                        Orders
                        </Link>
                     </li>

                      <li>
                        <Link to="/admin/userList" className='block px-4 py-2 hover:bg-gray-200'>
                        Users
                        </Link>
                     </li>

                     </>
                     )}
                           <li>
                        <Link to="/profile" className='block px-4 py-2 hover:bg-gray-200'>
                        Profile
                        </Link>
                     </li>

                      <li>
                        <button to="/logout" 
                        onClick={logoutHandler}
                        className='block  w-full px-4 py-2 text-left hover:bg-gray-200'>
                        Logout
                        </button>
                     </li>
                     
               </ul>
            )}
           </div>
          

          {!userInfo && (
             <div>
             <ul>
            <li>
               <Link to="/login" className='flex items-center transition-transform transform hover:translate-x-2'>
               <AiOutlineLogin className='mr-2 '  size="26"/>
               <span className='hidden nav-item-name'>LOGIN</span>
            </Link>
            </li>
            <li>
               <Link to="/sign-up" className='flex items-center transition-transform transform hover:translate-x-2'>
               <FaRegUser className='mr-2 mt-[1rem]'  size="26"/>
               <span className='hidden nav-item-name mt-[1rem]'>REGISTER</span>
            </Link>
            </li>
           
           </ul>
           </div>

          )}
          
          
    </div>
    </div>
  )
}

export default Navigation