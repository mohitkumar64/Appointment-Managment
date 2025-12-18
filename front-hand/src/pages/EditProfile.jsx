import Navbar from "../component/Navbar";

function EditProfile() {
  return (
    <div>
        <Navbar />
        <div className=" m-5 flex shadow-xl shadow-gray-500/30 rounded-xl p-10 ">
                <div className="flex-1 flex justify-center  ">
                        <div className="w-60 h-60 rounded-full border-2 object-cover overflow-hidden ">
                            <img src="https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg" alt="img" />
                        </div>
                </div>
                <div className="flex-3">
                    <div className="grid grid-cols-2  gap-x-10 md:gap-x-20 gap-y-7">
                     <div  className=" flex flex-col   ">
                        <label htmlFor="name">Name</label>
                        <input className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="name" />
                    </div>   
                    <div  className=" flex flex-col   ">
                        <label htmlFor="fathername">Father Name</label>
                        <input className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="Fathername" />
                    </div>
                    <div  className=" flex flex-col  ">
                        <label htmlFor="mothername">Mother Name</label>
                        <input className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="mothername" />
                    </div>
                    <div  className=" flex flex-col  ">
                         <label htmlFor="dob">D.O.B</label>
                        <input className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="date" name="dob" />
                    </div>
                    <div  className=" flex flex-col       ">
                         <label htmlFor="rollno">Roll number</label>
                        <input className="px-3 outline-none border-b-2 border-gray-400 hover:border-black  focus:border-black" type="text" name="rollno" />
                    </div>
                       
                       <div className="flex justify-end items-end">
                            <button className="bg-green-700 px-5 text-2xl font-semibold text-white rounded-xl py-2">Update</button>
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