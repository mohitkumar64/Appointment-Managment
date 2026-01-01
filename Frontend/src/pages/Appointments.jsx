import { useEffect, useRef, useState } from "react";
import Navbar from "../component/Navbar";
import {useAuth} from "../context/AuthProvider"
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import Popup from "./function/Popup";
import { API_URL } from "../config";



function Appointments() {

  const [activeTab, setActiveTab] = useState("pending");
  const [popupMessage, setPopupMessage] = useState("");
  const [subjects , setSubjects]  = useState([]);

  const [Teacher , setTeacher] = useState([]);
  const {user , appointments , setAppointments} = useAuth();
  const [value , setValue] = useState({
    "studentId" : user._id ,
    "TeacherId" : "",
    "subject" : "",
    "reason" : "",
    "date" : "",
    "mode" : "" ,
    "TimeSlot" : ""      

  })

  const filterappointment = appointments?.filter((a)=> a.Status === activeTab);
  // console.log("Appointments in UI:", appointments);
 
  function handleChange(e){
    const {name , value} = e.target;
    setValue(prev=>({
      ...prev ,
      [name] : value   
    }))
  }
async  function handlePost(){
  try {
    
    const res = await axios.post(`${API_URL}/api/v1/Appointments` , value , {withCredentials  :true});
    if(res.data.status){
        
        setAppointments(prev => [...prev, res.data.appointment]);
        setPopupMessage("Appointment created successfully");
        console.log(value);
        
        setValue({
           "studentId" : user._id ,
          "TeacherId" : "",
          "subject" : "",
          "reason" : "",
          "date" : "",
          "mode" : "" ,
          "TimeSlot" : ""
        })
      
    }
  } catch (error) {
    console.log(error)
    setPopupMessage("something went wrong");
  }
     
  }

  useEffect(()=>{
    const getTeacher =async()=>{
      const res = await axios.get(`${API_URL}/api/v1/Teacher`, {withCredentials  :true})
      setTeacher(res.data)
    }
    getTeacher();
  },[])


  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-[#E9EDF5]">

      <Navbar />
      {popupMessage && <Popup message={popupMessage}  setPopupMessage={setPopupMessage}/>}

      <div className="p-6 flex flex-col gap-6">
     
        <div className="flex flex-wrap gap-6">
       
          <div className="flex-1 min-w-[300px] bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-2xl font-semibold text-center mb-6 heading">
              Teacher Available for Appointment
            </p>

            <div className="grid grid-cols-1 bg-slate-200 rounded-xl text-center">
              
                <div className="  grid grid-cols-4 gap-3  border-b border-zinc-700 text-center text-md md:text-xl font-semibold  p-4">
                  <p className=" text-zinc-700">S.No</p> 
                  <p className=" text-zinc-700">Name</p> 
                  <p className=" text-zinc-700">Subjects</p> 
                  <p className=" text-zinc-700">Time-slot</p> 
                </div>

                {
                  Teacher.map((data , i)=>(
                <div key={i} className="  grid grid-cols-4 gap-4 text-center  p-4">
                  <p className="text-sm text-slate-500">{i+1}</p>
                  <p className="text-sm text-slate-500">{data.name}</p> 
                  <p className="text-sm text-slate-500">{(data.subjects.join(' , '))
                  }</p> 
                  <p className="text-sm text-slate-500">{data.TimeSlot}</p> 
                </div>
                  ))
                    
                  
                }
                
             
            </div>
          </div>

      
          <div className="flex-1 min-w-[300px] bg-white rounded-2xl border border-slate-200 shadow-lg p-6 max-h-[70vh] overflow-y-auto">
            <p className=" text-2xl md:text-3xl font-bold text-center mb-4 heading">
              Create Appointment
            </p>

            <div className="flex flex-col gap-3">
             
              <label>Teacher</label>
             <select
                  className={inputClass}
                  name="TeacherId"
                  onChange={(e) =>  {              
                    setValue((prev) => ({
                      ...prev,
                      TeacherId: e.target.value,
                    }))

                    if(e.target.value){
                   setSubjects( Teacher.filter((t)=> t._id === e.target.value)[0]?.subjects);
                  }else{
                      setSubjects([]);
                    }
                    
                  }}
                >
                  <option value="">Select Teacher</option>

                  {Teacher.map((t) => (
                    <option key={t._id} value={t._id}     > 
                      {t.name}
                    </option>
                  ))}
              </select>

              <label>Subject</label>
              
              <select
                  className={inputClass}
                  name="subject"
                  onChange={(e) =>
                    setValue((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                >
                 

                  { subjects.length>0 ? subjects.map((t , i) => (
                    <option key={t+i} value={t}>
                      {t}
                    </option>
                  )) : <option>
                        Select the teacher first
                    </option>}
              </select>

              <label>Reason</label>
              <textarea rows={3}  value={value.reason} className={inputClass}
                 onChange={handleChange} 
                name="reason"
              />

              <label>Date</label>
              <input type="date"  value={value.date} className={inputClass}
                 onChange={handleChange}
                name="date"
              />

              <label>Time Slot</label>
              <input type="time"  value={value.TimeSlot} className={inputClass}
                 onChange={handleChange}
                  name="TimeSlot"
              />

              <label>Mode</label>
              <select  value={value.mode} className={inputClass}
                 onChange={handleChange}
                name="mode"
              >
                <option value={'In person'} >In Person</option>
                <option value={'Online'}>Online</option>
              </select>

              <button className="mt-4 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition"
                onClick={handlePost}
              >
                Create Appointment
              </button>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 overflow-hidden md:p-6">
          <div className="flex gap-4 mb-4">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={` px-2  md:px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
              <div>
                  {
                    filterappointment.length > 0 ?                    
                        (<div  className="grid  gap-5  grid-cols-1 md:grid-cols-3 ">
                        {
                          filterappointment.map((v)=>{
                          return ( 
                              <AppointmentCard  appointment={v} key={v._id} user={user}/> 
                          )
                        })
                      
                        }
                      </div>) :  <p className="text-slate-600">No {activeTab} appointments</p>

                  }
              </div>
         
        </div>
      </div>
    </div>
  );
}





export default Appointments;
