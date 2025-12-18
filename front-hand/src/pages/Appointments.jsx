import { useState } from "react";
import Navbar from "../component/Navbar";
import "./appointment.css";

function Appointments() {
  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div className="relative">
      <Navbar />

      <div className="h-[90vh] relative    p-4 box-border flex flex-col gap-4">
        <div className="flex-2 flex flex-wrap gap-4">
        
          <div className="flex-1 shadow-xl shadow-gray-600/50   min-h-fit bg-amber-400 border-2 border-amber-600  min-w-[300px] rounded-xl p-4">
            <p className="text-2xl font-semibold text-center mb-4">
              Teacher Available for Appointment
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="border p-2">
                <p>Name</p>
                <p>Mohit</p>
              </div>
              <div className="border p-2">
                <p>Subjects</p>
                <p>Math, English</p>
              </div>
              <div className="border p-2">
                <p>Time Slots</p>
                <p>9–7</p>
              </div>
            </div>
          </div>

        
          <div className="flex-1 shadow-xl shadow-gray-600/50 rounded-xl bg-white   min-w-[300px] max-h-[60vh] overflow-scroll scrollbar-hide p-4 flex flex-col gap-3">
            <p className="text-3xl font-bold text-center">Create Appointment</p>

            <label>Student Name</label>
            <input className="border border-black rounded-md p-2" />

            <label>Student ID</label>
            <input className="border border-black rounded-md p-2" />

            <label>Section</label>
            <input className="border border-black rounded-md p-2" />

            <label>Teacher</label>
            <select className="border border-black rounded-md p-2">
              <option>Mohit</option>
            </select>

            <label>Subject</label>
            <input className="border border-black rounded-md p-2" />

            <label>Reason</label>
            <textarea className="border  border-black rounded-md p-5" rows={3} />

            <label>Date</label>
            <input type="date" className="border border-black rounded-md p-2" />

            <label>Time Slot</label>
            <input type="time" className="border border-black rounded-md p-2" />

            <label>Mode</label>
            <select className="border border-black rounded-md p-2">
              <option>In Person</option>
              <option>Online</option>
            </select>

            <button className="mt-2 p-2 bg-blue-600 border-2 border-indigo-700 text-white font-semibold rounded">
              Create Appointment
            </button>
          </div>
        </div>

      
        <div className="flex-1 bg-linear-to-b   rounded-xl p-4">
      
          <div className="flex gap-4 mb-4">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === "pending" && (
            <div>
              <p className="font-semibold">Pending Requests</p>
              <p>No pending appointments</p>
            </div>
          )}

          {activeTab === "approved" && (
            <div>
              <p className="font-semibold">Approved Appointments</p>
              <p>No approved appointments</p>
            </div>
          )}

          {activeTab === "rejected" && (
            <div>
              <p className="font-semibold">Rejected Appointments</p>
              <p>No rejected appointments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
