import { useState , useRef } from "react";
import Navbar from "./AdminNavbar";
import Sidebar from "./AdminSidebar";
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Users() {
const [active , setActive] = useState('Users')
 const [show , setShow] = useState(false);
  const hover = useRef(null)
 const {allUsers} = useOutletContext(); 

    const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");
  const [search, setSearch] = useState("");


  
function handleEdit(userId , role){
   
    if(userId && role){
     navigate(  `/adminPanel/editProfile/${userId}/${role}`)
    }

}

  const filteredUsers = activeTab === ""  ?  allUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )  :  allUsers.filter(u =>
  
   
    u.role === activeTab &&
    u.name.toLowerCase().includes(search.toLowerCase())
  
    
  );

  return (
     <div className="h-screen flex flex-col bg-white">
        <Navbar />
        

        <div className="flex flex-1 overflow-hidden">
            <Sidebar active={active} setActive={setActive}  />
             <div  className="flex-1 p-6 space-y-6  bg-white">

            
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex gap-3">
                    <button
                        onClick={() => setActiveTab("")}
                        className={`px-5 py-2 rounded-md font-medium border transition ${
                        activeTab === ""
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-blue-600 border-blue-300"
                        }`}
                    >
                        Users
                    </button>

                    <button
                        onClick={() => setActiveTab("Teacher")}
                        className={`px-5 py-2 rounded-md font-medium border transition ${
                        activeTab === "Teacher"
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-blue-600 border-blue-300"
                        }`}
                    >
                        Teachers
                    </button>
                    </div>

                    <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="border border-blue-300 rounded-md px-4 py-2 w-full md:w-64
                                focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className={`border border-blue-200 rounded-lg divide-y `}
                    onMouseEnter={()=> {
                        hover.current = setTimeout(() => {
                            setShow(true)
                        }, 2000);
                    }}
                        
                    onMouseLeave={()=>{
                        clearTimeout(hover.current);
                        setShow(false);
                    }}

                    onClick={()=>{
                        setShow(true);
                        setTimeout(()=>{
                            setShow(false)
                        }, 5000)

                    }}
                
                >
                    {filteredUsers.length === 0 && (
                    <p className="p-6 text-blue-500 text-center">
                        No results found
                    </p>
                    )}

                    {filteredUsers.map(user => (
                    <div
                        key={user._id}
                        className="p-4 flex justify-between items-center
                                hover:bg-blue-50 transition"
                    >
                        <div>
                        <p className="font-semibold text-blue-900">
                            {user.name}
                        </p>
                        <p className="text-sm text-blue-500">
                            {user.email}
                        </p>
                        </div>

                        <span className="text-sm flex items-center gap-4 font-medium text-blue-600">
                        {user.role}
                         {
                            show &&
                            <button className="p-3 text-md text-white bg-blue-500 hover:to-blue-700 rounded-xl " 
                                onClick={()=>{
                                    handleEdit(user._id , user.role)
                                }}
                            >
                                edit
                            </button> 
                        }
                        </span>

                       
                    </div>
                    ))}
                </div>

            </div>    
        </div>
    
     </div>

   
  );
}


export default Users;
