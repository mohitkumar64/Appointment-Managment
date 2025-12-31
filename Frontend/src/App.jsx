
import './App.css'
import {Routes , Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import EditProfile from './pages/EditProfile'
import { LoginPage } from './pages/LoginPages'
import ProtectedRoute from './Protectedroute'
import AdminRoute from './AdminRoute'
import AdminPanel from './AdminPanel/AdminPanel'
import Users from './AdminPanel/Users'
import AdminEditProfile from './AdminPanel/AdminEditProfile'
import PostQuery from './pages/Query'
import AdminQuery from './AdminPanel/AdminQuery'
import {NotFound} from './pages/NotFound'


function App() {
 

  return (
    <>
   
     
        <Routes>


        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path='/query' element={<PostQuery />} />
           <Route element= {<AdminRoute />}>
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/adminpanel/allusers" element={<Users />} />
            <Route path="/queries" element={<AdminQuery />} />

            <Route path="/adminpanel/editProfile/:userId/:role"  element={<AdminEditProfile />} />
          </Route>
        </Route>

       

        <Route  path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFound />} />

     </Routes>
    </>
  )
}

export default App
