const User = require('../Models/Users');
const Appointment = require('../Models/Appointment');
const Mongoose = require('mongoose');
const QueryModel = require('../Models/Query')


async function getallusers(req ,res) {
    try {
        const users = await User.find();
        if(res){
            res.status(200).json(users)
        }

    } catch (error) {
        res.status(400).json({error : "something is wrong"})
        console.log({admincontroller : error});
        
    }

}

async function UpdateUser(req , res) {
    console.log(req.body);
    
    
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

   
   if(!user){
    res.status(404);
   } 
   res.status(200).json(user);
    
} 
async function getuserdata(req,res) {
    try {
    const {_id} = req.body;
    const user = await User.findById(_id);
    console.log(user);
    
    res.status(200).json(user)
    } catch (error) {
        res.status(400);
        console.log(error);
        
    }
    
}

async function getQuery(req , res) {
    try {
        
        const query = await QueryModel.find();
            res.status(200).json(query);
        


    } catch (error) {
        res.status(404).json({error : "not find"})   
        console.log(error);
        
    }
    

    
}

async function delQuery(req , res) {
    try {
        const {id} = req.body
     const del = QueryModel.findByIdAndDelete(id);

     res.status(200).json({
        message : true
     })
        


    } catch (error) {
        res.status(404).json({error : "not find"})   
        console.log(error);
        
    }
    
    
}


module.exports = {getallusers , UpdateUser , getuserdata , getQuery , delQuery}