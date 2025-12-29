
import {  Navigate , Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";


export default function AdminRoute() {
  const [submittedQueries, setSubmittedQueries] = useState([]);
  const [allUsers , setAllUsers] = useState([]);
  const {user } = useAuth();
  
 async function getAllUser(){
  try {
    const res = await axios.get('http://localhost:5000/api/v1/admin/getAllusers' , {withCredentials : true});

    setAllUsers(res.data);
  } catch (error) {
    console.log(error);
  }
  
  }

  getAllUser();
  
  
useEffect(()=>{
  const getQuery = async()=>{
      const res = await axios.get('http://localhost:5000/api/v1/admin/getquery' , {withCredentials : true});
      setSubmittedQueries(res.data);
      }
      
      

  getQuery();
},[submittedQueries])

  if (user.role != "Admin"){
    return <Navigate to='/' />;
  }
  
 
  

  return <Outlet context={{  allUsers , submittedQueries , setSubmittedQueries }} />;
}


