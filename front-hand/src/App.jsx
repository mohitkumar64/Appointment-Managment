
import './App.css'
import {Routes , Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import EditProfile from './pages/EditProfile'
import { LoginPage } from './pages/LoginPages'
import ProtectedRoute from './Protectedroute'

function App() {
 

  return (
    <>
   
     
        <Routes>


        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/appointments" element={<Appointments />} />
        </Route>


        <Route  path='/login' element={<LoginPage />} />


     </Routes>
    </>
  )
}

export default App
