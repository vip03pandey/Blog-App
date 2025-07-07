const express = require('express');
const jwt = require('jsonwebtoken');
const User=require('../models/User');
const router = express.Router();
const protect=require('../middleware/authMiddleware');

router.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        user=new User({name,email,password});
        await user.save();
        const payload={user:user._id};
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
            if(err) return res.status(500).json({message:"Server Error"});
            res.status(201).json({user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },token});
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const payload={user:user._id};
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
            if(err) return res.status(500).json({message:"Server Error"});
            res.status(200).json({user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },token});
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.get('/profile',protect,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
    }
})


const bcrypt = require('bcryptjs');

router.put('/profile', protect, async (req, res) => {
    try {
      const { name, bio, avatar, password } = req.body;
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.avatar = avatar || user.avatar;
  
      if (password && password.trim() !== "") {
        user.password = password; 
      }
  
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  


module.exports=router;