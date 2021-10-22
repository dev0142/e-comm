const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userData = new mongoose.Schema({
    name:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//encrypting the password
userData.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});

const user=mongoose.model('User',userData);
module.exports=user;