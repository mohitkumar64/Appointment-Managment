import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const AuthContext = createContext({
  user : null , loading : true , appointments: [],
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

   useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/me",
          { withCredentials: true }
        );
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    restoreUser();
  }, []);

  useEffect(() => {
    if (!user?._id) return;
   
    

    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/Appointments",
          { withCredentials: true }
        );
       
        setAppointments(res.data);

      } catch {
        setAppointments([]);
      }
    };

    fetchAppointments();
  }, [user?._id]);

function updateAppointmentStatus(id, newStatus) {
  setAppointments(prev =>
    prev.map(a =>
      a._id === id ? { ...a, Status: newStatus } : a
    )
  );
}

  
  return (
    <AuthContext.Provider value={{ user, setUser, loading , appointments , updateAppointmentStatus }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
 