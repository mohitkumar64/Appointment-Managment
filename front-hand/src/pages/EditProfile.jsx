import axios from "axios";
import Navbar from "../component/Navbar";
import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import dayjs from 'dayjs'

function EditProfile() {
  const {user , setUser} = useAuth();
    
    const {role} = user;
 const [value, setValue] = useState(() => ({
  name: user?.name ?? "",
  FatherName: user?.FatherName ?? "",
  MotherName: user?.MotherName ?? "",
  DateOfBirth: user?.DateOfBirth ?? "",
  RollNumber: user?.studentInfo?.RollNumber ?? "",
  Course: user?.studentInfo?.Course ?? "",
  Branch: user?.studentInfo?.Branch ?? "",
  Year: user?.studentInfo?.Year ?? ""
}));

  function handleChange(e){

  
    const {name , value}  = e.target;
    setValue(prev =>({
      ...prev ,
        [name] : value
    }))
  }

 async function handleUpdate() {
    const res = await axios.put('http://localhost:5000/api/user/updateUser' , value , {withCredentials : true});
    
    setUser(res.data)
  }
  return (
    <div className=" min-h-screen  bg-[#E9EDF5]">
        <Navbar />
      <div className=" m-5 flex  bg-white rounded-2xl border border-slate-200 shadow-sm p-10 ">
              <div className="flex-1 flex justify-center  ">
                      <div className="w-60 h-60 rounded-full border-2 object-cover overflow-hidden ">
                          <img src="https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg" alt="img" />
                      </div>
              </div>
              <div className="flex-3">
                  <div className="grid grid-cols-2  gap-x-10 md:gap-x-20 gap-y-7">
                    <div  className=" flex flex-col   ">
                      <label htmlFor="name">Name</label>
                      <input 
                        value={value.name}
                        onChange={(e)=>{handleChange(e);}}
                        name="name"
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text"  />
                  </div>   
                  <div  className=" flex flex-col   ">
                      <label htmlFor="FatherName">Father Name</label>
                      <input 
                        value={value.FatherName}
                        onChange={(e)=>{handleChange(e);}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="FatherName" />
                  </div>
                  <div  className=" flex flex-col  ">
                      <label htmlFor="MotherName">Mother Name</label>
                      <input 
                        value={value.MotherName}
                        onChange={(e)=>{handleChange(e);}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="MotherName" />
                  </div>
                  <div  className=" flex flex-col  ">
                        <label htmlFor="dob">D.O.B</label>
                      <input 
                        value={dayjs(value.DateOfBirth).format('YYYY-MM-DD')}
                        onChange={(e)=>{handleChange(e);}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="date" name="DateOfBirth" />
                  </div>



                 { role === "student" && <>
                     <div  className=" flex flex-col       ">
                        <label htmlFor="rollno">Roll number</label>
                      <input 
                        value={value.RollNumber}
                        onChange={(e)=>{handleChange(e);}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="RollNumber" />
                  </div>
                  <div  className=" flex flex-col       ">
                        <label htmlFor="Course">Course</label>
                      <input 
                        value={value.Course}
                        onChange={(e)=>{handleChange(e);}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="Course" />
                  </div>
                  <div  className=" flex flex-col       ">
                        <label htmlFor="Branch">Branch</label>
                      <input 
                        value={value.Branch}
                        onChange={(e)=>{handleChange(e);}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="Branch" />
                  </div>
                  <div  className=" flex flex-col       ">
                        <label htmlFor="Year/Sem">Year/sem</label>
                      <input 
                        value={value.Year}
                        onChange={(e)=>{handleChange(e)}}
                      className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="Year" />
                  </div>
                  
                  
                 </>}
                 
                      
                      <div className="flex justify-end items-end">
                          <button className="bg-green-600 px-5 text-2xl font-semibold text-white rounded-xl py-2
                            hover:cursor-pointer hover:bg-green-700
                          
                          "
                            onClick={
                              handleUpdate
                            }
                          >Update</button>
                      </div>
                      

                  </div>
              </div>
      </div>
      <div>
        <div className="p-5 flex ">
            <div className="bg-red-500 w-5 h-10">

            </div>
            <p className="text-2xl text-black bg-green-400 px-4 max-w-fit border-green-500 border-2  ">
                
                <span className="font-bold text-black">Note</span>  : Any change in other details has to be resloved by a Admin pls contact them</p>
        </div>
        
      </div>
    </div>
  );
}

export default EditProfile;