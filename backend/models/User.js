const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trime:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/.+\@.+\..+/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    bio:{
        type:String,
        default:"I am a blogger"
    },
})


userSchema.pre("save",async function(next){
    if (!this.isModified('password')) return next();
    const salt=await bcrypt.genSaltSync(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports=mongoose.model('User',userSchema)