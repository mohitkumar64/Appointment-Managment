
import axios from "axios";
import FormatDate from "./function/FormatDate";
import { useAuth } from "../context/AuthProvider";

function AppointmentCard({ appointment, user }) {
  const {updateAppointmentStatus} = useAuth();
  const {
    studentId,
    TeacherId,
    subject,
    reason,
    date,
    TimeSlot, _id
  } = appointment;
  
  const isTeacher = user?.role === "Teacher";

  async function handleUpadte(status) {
  try {
    const res = await axios.put(
      "http://localhost:5000/api/v1/Appointments",
      { _id, Status: status },
      { withCredentials: true }
    );

    if (res.status === 200) {
      updateAppointmentStatus(_id, status);
    }
  } catch (err) {
    console.error("Update failed", err);
    alert("Failed to update appointment");
  }
}


  return (
    <div  className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-3">
      
      <div className="flex justify-between">
        <p className="font-semibold">
          Student: <span className="font-normal">{studentId.name}</span>
        </p>
        <p className="text-sm text-gray-500">{FormatDate(date)}</p>
      </div>

      <p>
        To: <span className="font-medium">{TeacherId.name}</span>
      </p>

      <p>
        Subject: <span className="font-medium">{subject}</span>
      </p>

      <p className="text-gray-700">
        Reason: {reason}
      </p>

      <p className="text-sm">
        Time Slot: <span className="font-medium">{TimeSlot}</span>
      </p>

      {isTeacher && (
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={()=>{
              handleUpadte("approved")}}
          
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Accept
          </button>
          <button 
            onClick={() =>{
              handleUpadte('rejected')}}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
            Decline
          </button>
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
