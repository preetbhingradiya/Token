const express=require("express")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User = require("../model/user.schema")


const user=express()

user.post('/register',async(req,res)=>{
    try {
        let {username,email,password}=req.body

        let confirmUser=await User.findOne({email:email})

        if(confirmUser){
            res.status(400).json({message:"This Email is alredy sing up , plase login this email"})
        }
        else{
            let hashPassword=await bcrypt.hash(password,10)
        
            let user=await User.create({
                username:username,
                email:email,
                password:hashPassword
            })
            res.send(user)
        }
    } catch (error) {
        res.send(error.message)
    }
})

user.post('/login',async(req,res)=>{
    let {email,password}=req.body

    let user=await User.findOne({email:email})

    if(!user){
       return res.status(400).json({message:"User Not Found"})
    }

    let comparePassword=await bcrypt.compare(password,user.password)

    if(!comparePassword || user.email!==email){
       return res.status(400).json({message:"Wrong Email Or Password, please check and Try Again"})
    }
    else{
        const token=jwt.sign({id:user.id},"ergegrey")
        res.cookie("token",token,{httpOnly:true,maxAge:2*60*1000}).send(user)
    }
})

user.get("/profile",async(req,res)=>{
    try {

        let token=req.cookies['token']

        let verifyToken=jwt.verify(token,"ergegrey")

        if(!verifyToken){
            return res.status(401).json({message:"You can't not access this route So please login first and try agian"})
        }

        let verify=await User.findById(verifyToken.id)
        res.send(verify)
        
    } catch (error) {
            return res.status(401).json({message:"You can't not access this route So please login first and try agian"})
    }
})

user.get('/logout',(req,res)=>{
    res.cookie("token",{maxAge:0})

    res.status(200).json({message:"User can loggout successfull"})
})


user.post('/login',async(req,res)=>{

})

module.exports=user