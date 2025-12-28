const User = require('../Models/Users');
const QueryModel = require('../Models/Query')
const dayjs = require('dayjs')

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

async function getQuery(req , res) {
    try {
       
        const {userId}  = req.user;
        const query = await QueryModel.find({userId : userId});

        if(query){
            res.status(200).json(query);
        } 


    } catch (error) {
        res.status(404).json({error : "not find"})   
        console.log(error);
        
    }
    
    
}

async function postQuery(req , res) {
                
    try {
        let {query} = req.body;
        const expireAt = dayjs().add(3, "day").toDate();
        const createdAt = dayjs().toDate();
        
        body = { Reason : query , userId : req.user.userId , expireAt , createdAt}
        
        const querys =  await QueryModel.create(body);
        
        res.status(200).json(querys);


    }catch(error){
        res.status(400).json({error :  "psot query error"})
        console.log(error);
        
    }

    
}



module.exports = {UpdateUser , getQuery , postQuery}