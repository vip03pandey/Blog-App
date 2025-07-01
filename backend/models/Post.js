const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    image:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        required:true,
    },
    likes:{
        type:Number,
        default:0,
    },
    comments: [{
        user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        createdAt: { type: Date, default: Date.now }
      }],
    
},{timestamps:true})

module.exports=mongoose.model('Post',postSchema);