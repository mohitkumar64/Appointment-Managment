const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String ,
    email : {
        type : String ,
        index  :true
    },
    role : {
        type : String ,
        default : "student"
    },
    FatherName : String ,
    MotherName : String ,
    DateOfBirth : Date ,
    ProfileImage : {
        type : String
        
    },
    College : {
        type : String ,
        default : "....",
    },

    studentInfo : {
        RollNumber: Number ,
        Course : String ,
        Branch : String ,
        Year : String ,    
    },
   TeacherInfo : {
     Subjects : [String] ,
     TimeSlot : String

   }
   

});


module.exports = mongoose.model('User' , UserSchema);