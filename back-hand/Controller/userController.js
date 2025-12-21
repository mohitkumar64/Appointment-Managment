const User = require('../Models/Users');

async function UpdateUser(req , res) {
    
    const{name,FatherName,MotherName,DateOfBirth,Course,Year,RollNumber,Branch} = req.body;
    const info = {
        "name" : name ,
        "FatherName" : FatherName, 
        "MotherName" : MotherName,
        "DateOfBirth" : DateOfBirth ,
        studentInfo:{
        "Course" : Course,
        "Year" : Year ,
        "RollNumber" : RollNumber,
        "Branch" : Branch,
        }
        
     

    }

    const user = await User.findByIdAndUpdate(req.user.userId , info , {
        new : true ,
        runValidators : true
    }); 

    console.log(user)
   if(!user){
    res.status(404);
   } 
   res.status(200).json(user);
    
}



module.exports = {UpdateUser}