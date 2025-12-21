import Navbar from "../component/Navbar";
import LottieAnimation from '../component/Lottie'
import file from './json/filewrite.json'
import calender from './json/Calendar.json'
import question from './json/Question mark.json'
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthProvider'
import dayjs from "dayjs";
import { useRef } from "react";

 function Info({ label, value }) {
 const  countRef = useRef(0);
 const timeoutRef = useRef(null);
 const nav = useNavigate();

  

 const handleDoubleClick = ()=>{
   countRef.current +=1 ;
  if(countRef.current === 1){
    timeoutRef.current = setTimeout(()=>{
      countRef.current = 0
    },2000);


  }

  if(countRef.current === 2){
    clearTimeout(timeoutRef);
    countRef.current = 0;
    nav('/editProfile')
  }
 }

  return (
    <div onClick={handleDoubleClick} className="flex flex-col wrap-anywhere bg-gray-100 rounded-lg p-4  hover:scale-90 duration-75">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-lg font-medium text-gray-800">
        {value ?? "Not added yet"}
      </span>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const {user , setUser} = useAuth();
 
  
  return (
    <div>
      <Navbar />
      <div className="  gap-x-5  gap-y-5 m-5 p-5 flex flex-wrap ">
        <div className="flex-1 border rounded-xl" >
            <div className=" flex rounded-t-xl flex-col bg-linear-to-b from-blue-600 to-blue-700 justify-center items-center ">
              <div className="rounded-full object-cover overflow-hidden w-50 h-50 border-2 border-blue-900">
                  <img  className=" h-50 w-55  bg-clip-content" src="https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg" alt="" />
              </div>
                
                <h1 className="text-2xl font-semibold ">{user.name || ""}</h1>
            </div>
           <div className="  bg-white rounded-b-xl shadow-md p-6 space-y-6">

           
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
                <Info label="Father Name" value={user.FatherName} />
                <Info label="Mother Name" value={user.MotherName} />
                <Info label="Date of Birth" value={dayjs(user.DateOfBirth).format('YYYY-MM-DD')} />
                <Info label="Email" value={user.email} />
                <Info label="College" value="NIT Surat" />
              </div>
            </div>

           
            {user.role === "student" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-700">
                  Student Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Info label="Course" value={user.studentInfo?.Course} />
                  <Info label="Branch" value={user.studentInfo?.Branch} />
                  <Info label="Year / Semester" value={user.studentInfo?.Year} />
                  <Info label="Roll Number" value={user.studentInfo?.RollNumber} />
                </div>
              </div>
            )}

           
            {user.role === "teacher" && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-green-700">
                  Teacher Details
                </h2>

                <Info
                  label="Subjects"
                  value={user.teacherInfo?.Subjects}
                />
              </div>
            )}
          </div> 

        </div>

        <div className="flex-2 rounded-xl bg-blue-600 p-5 flex flex-col gap-y-5 border ">
            <p className="text-4xl font-bold text-white mb-5">Modules</p>
            <div className=" border rounded-xl border-white p-5 flex flex-wrap justify-center  md:justify-start gap-x-10 gap-y-10">


                <div className=" h-50 w-50  flex flex-col justify-center border rounded-xl border-blue-900 hover:scale-90 transition-transform duration-75 items-center shadow-md shadow-blue-900"
                  onClick={()=>{
                  navigate('/editProfile')}}
                >

                      <LottieAnimation  animation={file} />
                      <p className="text-2xl font-semibold text-white ">Edit Profile</p>
                </div>
                <div className="  h-50 w-50 bg-transparent backdrop-blur-lg flex flex-col justify-center border rounded-xl border-blue-900 hover:scale-90 transition-transform duration-75 items-center shadow-md shadow-blue-900" onClick={()=>{
                  navigate('/appointments')
                }}   >
                      <LottieAnimation  animation={calender} />
                      <p className="text-2xl font-semibold text-white ">Appointments</p>
                </div>
                <div className=" h-50 w-50  flex flex-col justify-center border rounded-xl  border-blue-900 hover:scale-90 transition-transform duration-75 items-center shadow-md shadow-blue-900">
                    <div className="h-40  scale-60">
                        <LottieAnimation  animation={question} />
                    </div>
                      
                      <p className="text-2xl font-semibold z-10 text-white ">Query</p>
                </div>

            </div>
            <p className="text-4xl font-bold text-white mb-5">Appointments</p>

            <div className="overflow-y-scroll md:flex-grow scrollbar-hide"> 
                  <div className=" h-50 w-70  flex flex-col justify-center border rounded-xl border-blue-900 hover:scale-90 transition-transform duration-75 items-center shadow-md shadow-blue-900">     
                </div>
            </div>
            <div></div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;