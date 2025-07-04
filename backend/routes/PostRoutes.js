const express=require('express');
const Post=require('../models/Post');
const router=express.Router();
const mongoose=require('mongoose');
const protect=require('../middleware/authMiddleware');
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
// write post
router.post('/',protect,async(req,res)=>{
    const {title,content,image}=req.body;
    const post=new Post({title,content,image,author:req.user.id});
    const savedPost=await post.save();
    res.status(201).json(savedPost);
})

// get post
router.get('/',async(req,res)=>{
    try{
        const posts=await Post.find().sort({ createdAt: -1 }).populate('author');
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})



// get post by id
router.get('/:id',protect,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id).populate('author');
        if(!post){
            res.status(404).json({message:'Post not found'});
        }
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}
)

// post comment
router.post('/:id/comment',protect,async(req,res)=>{
    try{
        const {content}=req.body
        const post=await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({message:'Post not found'});
        }
        const comment = {
            content,
            user: req.user.id,
          };
      
          post.comments.push(comment);
          await post.save();
        res.status(201).json(comment);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// get post comments
router.get('/:id/comment',protect,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id).populate('comments.user');
        if(!post){
            res.status(404).json({message:'Post not found'});
        }
        res.status(200).json(post.comments);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// increment likes
router.post('/:id/like',protect,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({message:'Post not found'});
        }
        post.likes++;
        await post.save();
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})
// decrement likes
router.delete('/:id/like',protect,async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({message:'Post not found'});
        }
        post.likes--;
        await post.save();
        res.status(200).json(post);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

// generate titles for posts
router.post('/generateTitle', protect, async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: 'Content is required' });
      }
  
      const prompt = `Write a catchy, SEO-friendly blog title for the following content:\n\n"${content}.The title should not be very long and should be under 80 characters."`;
  
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 20,
        temperature: 0.7,
      });
  
      const title = completion.choices[0]?.message?.content?.trim();
  
      res.status(200).json({ title });
    } catch (error) {
      console.error('OpenAI Error:', error);
      res.status(500).json({ message: 'Failed to generate title' });
    }
  });

module.exports=router;