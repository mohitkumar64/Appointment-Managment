
import './App.css'
import {Routes , Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import EditProfile from './pages/EditProfile'

function App() {
 

  return (
    <>
     <Routes>
        <Route  path='/' element={<Dashboard />} />
        <Route  path='/appointments' element={<Appointments />} />
        <Route  path='/editProfile' element={<EditProfile />} />


     </Routes>
    </>
  )
}

export default App
