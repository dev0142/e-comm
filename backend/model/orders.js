const mongoose = require('mongoose');
const orderData = new mongoose.Schema({
    userId:
    {
        type:String,
        ref:'User',

    },
    userType:{
        type:String
    },
        orderid:{
            type:String
        },
        items:{
            type:Array
        },
        address:{
            type:String
        },
    contactname:{type:String},
    contactemail:{type:String},
    contactnumber:{type:Number},
    orderSummary:{
        totalMrp:{type:Number},
              productDiscount:{type:Number},
              subTotal:{type:Number},
              shippingCharges:{type:Number},
              total:{type:Number}
    },
    orderDate:{
        type:String
    },
    orderStatus:{
        type:String
    }
}
)


const order=mongoose.model('Order',orderData);
module.exports=order;