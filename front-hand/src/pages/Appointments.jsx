import { useState } from "react";
import Navbar from "../component/Navbar";

function Appointments() {
  const [activeTab, setActiveTab] = useState("pending");

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-[#E9EDF5]">
      <Navbar />

      <div className="p-6 flex flex-col gap-6">
     
        <div className="flex flex-wrap gap-6">
       
          <div className="flex-1 min-w-[300px] bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <p className="text-xl font-semibold text-center mb-6">
              Teacher Available for Appointment
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Name", value: "Mohit" },
                { label: "Subjects", value: "Math, English" },
                { label: "Time Slots", value: "9–7" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-50 rounded-xl p-4"
                >
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

      
          <div className="flex-1 min-w-[300px] bg-white rounded-2xl border border-slate-200 shadow-lg p-6 max-h-[70vh] overflow-y-auto">
            <p className="text-2xl font-bold text-center mb-4">
              Create Appointment
            </p>

            <div className="flex flex-col gap-3">
              <label>Student Name</label>
              <input className={inputClass} />

              <label>Student ID</label>
              <input className={inputClass} />

              <label>Section</label>
              <input className={inputClass} />

              <label>Teacher</label>
              <select className={inputClass}>
                <option>Mohit</option>
              </select>

              <label>Subject</label>
              <input className={inputClass} />

              <label>Reason</label>
              <textarea rows={3} className={inputClass} />

              <label>Date</label>
              <input type="date" className={inputClass} />

              <label>Time Slot</label>
              <input type="time" className={inputClass} />

              <label>Mode</label>
              <select className={inputClass}>
                <option>In Person</option>
                <option>Online</option>
              </select>

              <button className="mt-4 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition">
                Create Appointment
              </button>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex gap-4 mb-4">
            {["pending", "approved", "rejected"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "pending" && (
            <p className="text-slate-600">No pending appointments</p>
          )}
          {activeTab === "approved" && (
            <p className="text-slate-600">No approved appointments</p>
          )}
          {activeTab === "rejected" && (
            <p className="text-slate-600">No rejected appointments</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
