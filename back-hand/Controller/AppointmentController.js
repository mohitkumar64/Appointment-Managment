const User = require('../Models/Users');
const Appointment = require('../Models/Appointment')
const Mongoose = require('mongoose')



async function getAppointments(req,res) {
      const {role , userId} = req.user ;
     
      
      let appointment;
      if(role === 'student'){
          appointment = await Appointment.find({ studentId: userId }).populate("TeacherId", "name subjects")
          .populate("studentId" , 'name email');
        
          
      }else if(role === 'Teacher'){
          appointment = await Appointment.find({ TeacherId: userId }).populate("TeacherId", "name subjects")
          .populate("studentId" , 'name email');
        
          
      }
      
      
      else if(role === 'Admin'){
               appointment = await Appointment.find();              
      }else{
          res.status(400).json('you are not authorised')
      }
     
    res.status(200).json(appointment);
}

async function PostAppointments(req,res) {
     console.log("post console" , req.body);
     
      try {
          const appointment = await Appointment.create(req.body);
       res.status(200).json({
            status : true
       })   
      } catch (error) {
           console.log("from postAppointment"+error);
           
      }
         
    
}
async function DeleteAppointment(req,res) {
    
    
}
async function updateAppointment(req,res) {
     try {
           const {_id , Status} = req.body;
           console.log("status" + Status);
           
          const appointment = await Appointment.findByIdAndUpdate(_id , {
              Status: Status
          } , {
          new : true , runValidators : true
     })
     console.log(appointment);
     
     if(appointment){
          res.status(200).json({output : "sucess"})
     }  
     } catch (error) {
          res.status(500).json({error : "error"})
         console.log("update appointment error --" , error);
          
     }
    
    
}

async function getTeacher(req,res) {
      const Teacher = (await User.find({role : "Teacher"}));
      

      const data = Teacher.map(({name , _id , TeacherInfo})=>{
           return( { "name" : name , "_id" : _id , "subjects" : TeacherInfo.Subjects , "TimeSlot"  :TeacherInfo.TimeSlot })
      })
     
      res.status(200).json(data);
      
    
}


module.exports = {getAppointments , PostAppointments , DeleteAppointment , getTeacher , updateAppointment}