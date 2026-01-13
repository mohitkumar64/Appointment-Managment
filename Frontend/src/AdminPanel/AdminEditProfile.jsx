import axios from "axios";
import Navbar from "./AdminNavbar";
import Sidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { API_URL } from "../config";
import Popup from "../pages/function/Popup";

function AdminEditProfile() {
  const { userId, role } = useParams();
  const [active, setActive] = useState("Users");
  const [popupMessage, setPopupMessage] = useState("");

  const [value, setValue] = useState({
    name: "",
    FatherName: "",
    MotherName: "",
    DateOfBirth: "",
    RollNumber: "",
    Course: "",
    Branch: "",
    Year: "",
    role: role || "student",
    subject: []
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValue(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    async function getuserData() {
      const res = await axios.post(
        `${API_URL}/api/v1/admin/getuserdata`,
        { _id: userId },
        { withCredentials: true }
      );
      setValue(res.data);
    }
    getuserData();
  }, []);

  function handleSubjectChange(e) {
    setValue(prev => ({
      ...prev,
      subject: e.target.value
        .split(",")
        .map(s => s.trim())
        .filter(Boolean)
    }));
  }

  async function handleUpdate() {
    try {
      console.log(value);
      
      await axios.put(
        `${API_URL}/api/v1/admin/getallusers`,
        { _id: userId, value },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      setPopupMessage("something went wrong");
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#E9EDF5]">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={active} setActive={setActive} />
        {popupMessage && (
          <Popup message={popupMessage} setPopupMessage={setPopupMessage} />
        )}

        <div className="m-3 sm:m-5 flex flex-1 bg-white rounded-2xl
                        border border-slate-200 shadow-sm
                        p-4 sm:p-10">

          <div className="flex flex-col overflow-y-auto lg:flex-row gap-8 w-full">

            {/* Profile image */}
            <div className="flex justify-center lg:w-1/3">
              <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full border-2 overflow-hidden">
                <img
                  src="https://i.pinimg.com/1200x/f9/b0/6e/f9b06eea4f4f576ca92fa2f35e6206f7.jpg"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Form */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2
                              gap-x-6 lg:gap-x-20 gap-y-7">

                <Field label="Name" name="name" value={value?.name} onChange={handleChange} />
                <Field label="Father Name" name="FatherName" value={value?.FatherName} onChange={handleChange} />
                <Field label="Mother Name" name="MotherName" value={value?.MotherName} onChange={handleChange} />

                <div className="flex flex-col">
                  <label>D.O.B</label>
                  <input
                    type="date"
                    name="DateOfBirth"
                    value={value.DateOfBirth ? dayjs(value.DateOfBirth).format("YYYY-MM-DD") : ""}
                    onChange={handleChange}
                    className="px-3 py-1 outline-none border-b-2 border-gray-400
                               hover:border-black focus:border-black"
                  />
                </div>

                <div className="flex flex-col">
                  <label>Role</label>
                  <select
                    name="role"
                    value={value?.role}
                    onChange={handleChange}
                    className="px-3 py-1 outline-none border-b-2 border-gray-400
                               hover:border-black focus:border-black"
                  >
                    <option value="student">Student</option>
                    <option value="Admin">Admin</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>

                {value?.role === "Student" && (
                  <>
                    <Field label="Roll Number" name="RollNumber" value={value?.RollNumber} onChange={handleChange} />
                    <Field label="Course" name="Course" value={value?.Course} onChange={handleChange} />
                    <Field label="Branch" name="Branch" value={value?.Branch} onChange={handleChange} />
                    <Field label="Year / Sem" name="Year" value={value?.Year} onChange={handleChange} />
                  </>
                )}

                {value?.role === "Teacher" && (
                  <div className="flex flex-col md:col-span-2">
                    <label>Subjects (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Math, Physics, Chemistry"
                      onChange={handleSubjectChange}
                      className="px-3 py-1 outline-none border-b-2 border-gray-400
                                 hover:border-black focus:border-black"
                    />
                  </div>
                )}

                <div className="md:col-span-2 flex justify-end">
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-700 px-6 py-2 text-lg
                               font-semibold text-white rounded-xl"
                  >
                    Update
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        {...props}
        className="px-3 py-1 outline-none border-b-2 border-gray-400
                   hover:border-black focus:border-black"
      />
    </div>
  );
}

export default AdminEditProfile;
