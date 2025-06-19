import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/User/Login.jsx';
import Signup from './pages/User/Signup.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/User/Profile.jsx';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoriesList from './pages/Admin/CategoriesList.jsx';


 
const router = createBrowserRouter(
  createRoutesFromElements(

     <Route path='/' element={<App />}>

      <Route path='login' element={<Login />} />
       <Route path='sign-up' element={<Signup />} />

      <Route path=''  element={<PrivateRoute/>}>
      <Route path='/profile'  element={<Profile />} />
      </Route>

      <Route path='/admin'  element={<AdminRoute />}>
      <Route path='userList'  element={<UserList />}/>
      <Route path='categoriesList' element={<CategoriesList />} />
      </Route>
      
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>

  </Provider>
  
);