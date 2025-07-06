const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const posts = require('./data/Post');
const dotenv = require('dotenv');
dotenv.config();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URL);
const seedData=async()=>{
    try{
        await Post.deleteMany();
        await User.deleteMany();
        const createdUser=await User.create({
            name:'AdminUser',
            email:'admin@admin.com',
            password:'admin123',
        })
        const userId=createdUser._id
        const samplePosts = posts.map((post) => {
            return {
              ...post,
              author: createdUser._id,
              comments: post.comments.map((comment) => ({
                ...comment,
                user: createdUser._id,
              })),
            };
          });
       await Post.insertMany(samplePosts)
       console.log('Products inserted successfully')
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}
seedData()