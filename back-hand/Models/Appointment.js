const mongoose = require('mongoose');


const AppointmentSchema = mongoose.Schema({
     studentId :{
            type : mongoose.Schema.Types.ObjectId ,
            ref : "User",
            required : true
        },
      TeacherId:{
        type : mongoose.Schema.Types.ObjectId ,
            ref : "User",
            required : true
      },  
      date : Date,
      subject : String ,
      reason : String ,
      TimeSlot : String ,
      Mode : {
        type : String ,
        enum : ["In Person" , "Online"],
        default  :"Online"

      },
      Status : {
        type : String ,
        enum : ["pending" , "approved" , "rejected"],
        default : "pending"
      }

} ,{ timestamps: true }
)

module.exports = mongoose.model('Appointment' , AppointmentSchema);