const express=require('express');
const Post=require('../models/Post');
const router=express.Router();
const mongoose=require('mongoose');
const protect=require('../middleware/authMiddleware');

router.post('/',protect,async(req,res)=>{
    const {title,content,image}=req.body;
    const post=new Post({title,content,image,author:req.user.id});
    const savedPost=await post.save();
    res.status(201).json(savedPost);
})

module.exports=router;