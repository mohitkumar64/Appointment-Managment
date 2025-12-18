import Navbar from "../component/Navbar";
import LottieAnimation from '../component/Lottie'
import file from './json/filewrite.json'
import calender from './json/Calendar.json'
import question from './json/Question mark.json'
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className=" h-[90vh] gap-x-5  gap-y-5 m-5 p-5 flex flex-wrap ">
        <div className="flex-1 border rounded-xl" >
            <div className="h-60  flex rounded-t-xl flex-col bg-linear-to-b from-blue-600 to-blue-700 justify-center items-center ">
              <div className="rounded-full object-cover overflow-hidden w-50 h-50 border-2 border-blue-900">
                  <img  className=" h-50 w-55  bg-clip-content" src="https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg" alt="" />
              </div>
                
                <h1 className="text-2xl font-semibold ">Tushar Sharma</h1>
            </div>
            <div className="mt-5 border  mx-5 rounded-md flex grow flex-col bg-[#F3E5AB] justify-center  gap-y-5   items-center">
                <p className="border-b   w-full text-center">Father Name : Govind </p>
                <p className="border-b   w-full text-center">Mother Name : Sheetal </p>
                <p className="border-b   w-full text-center">D.O.B : 2/5/2006 </p>
                <p className="border-b   w-full text-center">College  : NIT surat</p>
                <p className="border-b   w-full text-center">Course : Btech </p>
                <p className="border-b   w-full text-center">Brach : cse </p>
                <p className="border-b   w-full text-center">Year/sem :3 </p>
                <p className="border-b   w-full text-center"> College Roll No: 24024010114 </p>

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