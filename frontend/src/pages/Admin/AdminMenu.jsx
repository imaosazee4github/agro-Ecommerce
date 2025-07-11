import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import { FaTimes } from "react-icons/fa";


const AdminMenu = () => {
  const[menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
    <button 
    className={`${menuOpen ? "top-2 right-2" : "top-5 right-7"} bg-[#151515] p-2 fixed rounded-lg `}
    onClick={toggleMenu}
    >
      {
        menuOpen ? (
          <FaTimes color='white' />
        ) : (
          <>
          <div className='w-6 h-0.5 bg-black my-1 '></div>
          <div className='w-6 h-0.5 bg-black my-1 '></div>
          <div className='w-6 h-0.5 bg-black my-1 '></div>
          </>

        )

      }

    </button>
    {
      menuOpen && (
        <section className='bg-[#151515] p-4 fixed right-7 top-5'>
          <ul className='list-none mt-2'>
            <li>
              <NavLink to='/admin/dashboard'
               className='list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm' style={({isActive}) => ({
                color : isActive ? "greenyellow" : "white"
               })} >
              Admin Dashboard
              </NavLink>
               <NavLink to='/admin/categoriesList'
               className='list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm' style={({isActive}) => ({
                color : isActive ? "greenyellow" : "white"
               })} >
              Create Category
              </NavLink>

               <NavLink to='/admin/productlist'
               className='list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm' style={({isActive}) => ({
                color : isActive ? "greenyellow" : "white"
               })} >
              Create Product
              </NavLink>

               <NavLink to='/admin/allproductslist'
               className='list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm' style={({isActive}) => ({
                color : isActive ? "greenyellow" : "white"
               })} >
              All Products
              </NavLink>

               <NavLink to='/admin/userList'
               className='list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm' style={({isActive}) => ({
                color : isActive ? "greenyellow" : "white"
               })} >
              Manage Users
              </NavLink>
              
               <NavLink to='/admin/orderlists'
               className='list-item py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm' style={({isActive}) => ({
                color : isActive ? "greenyellow" : "white"
               })} >
              Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )
    }
    
    </>
  )
}

export default AdminMenu