const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userData = new mongoose.Schema({
    fname:{
        type:String,
        requires:true
    },
    lname:{
        type:String,
        requires:true
    },
    email:{
        type:String,
        lowercase:true,
        unique:true,
        required:true
    },
    number:{
        type:Number,
        default:0
    },
    gender:{type:String,
    default:"undefined"},
    password:{
        type:String,
        required:true
    },
    wishlist:{
        type:Array,
    },
    addresses:[{
    street1:{type:String},
    street2:{type:String},
    landmark:{type:String},
    city:{type:String},
    state:{type:String},
    pincode:{type:Number},
    type:{type:String},
    contactname:{type:String},
    contactemail:{type:String},
    contactnumber:{type:Number},
    }],
    cart:{type:Array}
}
)

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