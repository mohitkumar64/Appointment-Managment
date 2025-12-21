import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

import "../index.css"


function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

 async function handlelogout(){
  try {
      await axios.post('http://localhost:5000/auth/logout' , {} , {
        withCredentials:true
      })

  } catch (error) {
    console.log(error)
  }finally{
      console.log("navbar")
      navigate('/login');
      
  }
      

      
  }

  return (
    <div className="sticky top-0 z-50">

     
      <nav className=" relative  bg-linear-to-b from-blue-600 to-blue-700 flex justify-between items-center px-6 h-[60px] shadow shadow-gray-400   ">
        
      
        <button onClick={() => setIsVisible(!isVisible)} className="z-30">
          <motion.div
            className="flex flex-col gap-1"
            animate={
              isVisible
                ? { rotate: 90,  }
                : { rotate: 0,   }
            }
          >
            <div className="h-[5px] w-10 bg-black"></div>
            <div className="h-[5px] w-10 bg-black"></div>
            <div className="h-[5px] w-10 bg-black"></div>
          </motion.div>
        </button>

        
        <div className="flex gap-10 text-2xl">
          <NavLink to="/admin/dashboard">Admin Panel</NavLink>
           <button onClick={handlelogout}>Logout</button>
        </div>

      </nav>


      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: 0.3 }}
            className="fixed  left-0 h-screen w-[250px] bg-linear-to-b from-blue-600 to-blue-600 border-r border-[#4E71FF] z-10 shadow-xl"
          >
           
            <div className="flex flex-col gap-y-3  py-4 px-2 text-xl">
                <NavLink className={"p-2 pl-5 rounded-md  shadow-md shadow-blue-950 text-white transition-all hover:-translate-y-2 hover:shadow-xl "} to="/"> Dashboard</NavLink>
                <NavLink className={"p-2  rounded-md  shadow-md shadow-blue-950 text-white transition-all hover:-translate-y-2 hover:shadow-xl "} to="/editProfile"> Edit Profile</NavLink>
                <NavLink className={"p-2  rounded-md  shadow-md shadow-blue-950 text-white transition-all hover:-translate-y-2 hover:shadow-xl "} to="/appointments"> Appointments</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Navbar;
