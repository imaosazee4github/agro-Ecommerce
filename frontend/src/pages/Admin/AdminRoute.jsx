import { Navigate, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const AdminRoute = () => {
    const {userInfo} = useSelector(state => state.auth)

  return  userInfo && userInfo.isAdmin ? (<Outlet />) : (<Navigate to="/login" replace />)
}

export default AdminRoute


// import { Navigate, Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// const AdminRoute = () => {
//   const { userInfo } = useSelector((state) => state.auth)

//   if (!userInfo) return <Navigate to="/login" replace />
//   if (!userInfo.isAdmin) return <Navigate to="/" replace />

//   return <Outlet />
// }

// export default AdminRoute
