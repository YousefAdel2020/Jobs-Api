const mongoose = require("mongoose");
const bycrypt= require('bcryptjs');
const jwt=require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type:String,
    required: [true, "please provide name"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type:String,
    required: [true, "please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide valid email"
    ],
    unique: true,
  },
  password: {
    type:String,
    required: [true, "please provide password"],
    minlength: 6,
  },
});

//middleware in mongoose for user schema
userSchema.pre('save',async function(next){
    const salt=await bycrypt.genSalt(10);
    this.password=await bycrypt.hash(this.password,salt);
    next();
});


// instance method
// function which can invoke it in our controllers

userSchema.methods.createJWT=function(){
  return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
}

userSchema.methods.comparePassword=async function(canditatePassword){
  const ismatch=await bycrypt.compare(canditatePassword,this.password)
  return ismatch;
}


module.exports=mongoose.model('User',userSchema);