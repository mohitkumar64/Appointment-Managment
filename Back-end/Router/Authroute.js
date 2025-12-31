const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const auth = require('../middleware/auth')

const User = require('../Models/Users');
const OAuthAccount  = require('../Models/oAuth')

const client = new OAuth2Client(process.env.Google_Client_Id);

Router.get("/google/callback" , async(req , res)=>{
    console.log('hit ')
    try {
        const {credential , role} = req.query;
        if(!credential){
            return res.status(400).json({error:"missing credential"})
        }
        
        
        const ticket  = await client.verifyIdToken({
          idToken :   credential ,
          audience : process.env.Google_Client_Id
        });

        const payload = ticket.getPayload();
        const googleSub = payload.sub;
        const email = payload.email;
        const name = payload.name;


        let account  = await OAuthAccount.findOne({
            provider : "google" ,
            providerUserId : googleSub
        });

        let user;
        if(account){
            user = await User.findById(account.userId);
            if(!user) throw new Error('user Missing');
        }else{
            if(!role){
                return res.status(400).json({
                    error : "role is missing"
                })
            }

             user = await User.create({
                name , email , role
             });
             
             await OAuthAccount.create({
                userId : user._id,
                provider : "google",
                providerUserId : googleSub

             })}

             let token = jwt.sign({
                userId : user._id , role: user.role
             }, process.env.Secret,{
                expiresIn : '7d'
             });

             res.cookie("token", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                        });
             console.log('res send');
             
             res.status(200).json({               
                status : "sucess"
             }) 
        

    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Authentication failed" });
    }
})

Router.post('/logout',auth , (req,res)=>{
    console.log("logout  route hit")
    res.clearCookie("token", {
            httpOnly: true,
             secure: true,
            sameSite: "none",
            path: "/"
})

    res.status(200).json({sucess : "sucess"})
})

module.exports = Router;