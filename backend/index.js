const express = require("express");
const compression = require("compression");
const dotenv = require("dotenv");
const cors = require("cors");
const User = require("./model/userData");
const ProductData=require("./model/ProductData")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Order = require("./model/orders");


const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  compression({
    level: 6,
    threshold: 1 * 1000,
  })
);

dotenv.config({ path: "./config.env" });
require("./database/conn");

app.get('/', (req, res) => {
  
   res.send('Hello from Express!')});

var allowedDomains = [
  "http://localhost:3002",
  "http://localhost:3001",
  "http://localhost:3000",
  "https://bhoomihillsnaturalsfrontend.herokuapp.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

//registering the user
app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password) {
    return res.status(404).send({ message: "please fill all the details" });
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(403).send({ message: "User already exist" });
      } else {
        const newUser = new User({ fname:name.split(" ")[0],lname:name.split(" ")[1]===undefined || name.split(" ")[1]==="" ? "" :name.split(" ")[1], email, password });
        newUser
          .save()
          .then(() => {
            res.status(200).send({ message: "sign up sucessfull" });
          })
          .catch((err) => {
            res.status(500).send({ message: "Something went Wrong" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.get("/products",authenticateToken,(req,res)=>{
//     res.status(200).send(req.user);
// })

//login the user
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ message: "please fill all the details" });
  }
  User.findOne({ email: email })
    .then((userExist) => {
      if (!userExist) {
        return res.status(400).send({ message: "User doesn't exist" });
      }
      bcrypt.compare(password, userExist.password, (err, data) => {
        if (err) {
          res.status(500).send({ message: "Something went Wrong" });
        }
        if (data) {
          const user = {
            fname: userExist.fname,
            email: email,
            wishlist: userExist.wishlist,
          };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
          res.cookie("token", accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 599990000),
          });
          res.status(200).send(user);
        } else {
          res.status(401).send({ message: "Invalid credentials" });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ message: "Something went Wrong" });
    });
});

app.post("/wishlist", authenticateToken, (req, res) => {
  const { productId } = req.body;
  const { email } = req.user;
  User.updateOne(
    { email: email },
    {
      $push: { wishlist: productId },
    }
  )
    .then((user) => {
      if (user) {
        res.status(200).send({ message: "product added to wishlist" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/", (req, res) => {});
app.get("/getwishlist", authenticateToken, (req, res) => {
  const { email } = req.user;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.status(200).send(user.wishlist);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/remwishlist", authenticateToken, (req, res) => {
  const { productId } = req.body;

  const { email } = req.user;
  User.updateOne(
    { email: email },
    {
      $pull: { wishlist: productId },
    }
  )
    .then((user) => {
      if (user) {
        res.status(200).send({ message: "product deleted successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getcartlist", authenticateToken, async (req, res) => {
  try {
      if(req.user===null)
      {
        return res.sendStatus(205);
      }
    const { email } = req.user;
    const response = await User.find({ email: email }, "cart");

    const { _id, cart } = response[0];
    if (response && cart) {
      res.status(200).send(cart);
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/savetocart", authenticateToken, async (req, res) => {
  try {
      if(req.user===null)
      {
          console.log("do something useful here for guest");
      }
      else{
    const { email } = req.user;
    const itemsToBeAdded = [];
    req.body.map(async (item) => {
      const itemss = {
        productId: item._id,
        quantity: item.qty,
        size: item.size,
      };
      itemsToBeAdded.push(itemss);
    });

    if (email) {
      const updateCart = await User.findOneAndUpdate(
        { email: email },
        { cart: itemsToBeAdded }
      );
      if (updateCart) {
        res.status(200).send({ message: "added to cart" });
      } else {
        res.status(300).send({ message: "something went wrong" });
      }
    }
}
  } catch (error) {
    console.log(error.message);
  }
});
//fetching product Data
app.get("/fetch",async(req,res)=>{
  try {
      
      const allproduct=await ProductData.find({});
      res.status(200).send(allproduct);
  } catch (error) {
      console.log(error);
  }
})

//add address in user account
app.post("/address", authenticateToken, (req, res) => {
  try {
    if (req.user === null) {
         res.status(205).send();
        
    } else {
      const { email } = req.user;
      console.log("hehehehehehehee");
      const {
        contactname,
        contactemail,
        contactnumber,
        street1,
        street2,
        landmark,
        city,
        state,
        pincode,
        type,
      } = req.body;

      if (
        !contactname ||
        !contactemail ||
        !contactnumber ||
        !street1 ||
        !street2 ||
        !landmark ||
        !city ||
        !state ||
        !pincode ||
        !type
      ) {
        return res.status(301).send({ message: "please fill all the details" });
      }

      User.updateOne(
        { email: email },
        {
          $push: {
            addresses: {
              street1: street1,
              street2: street2,
              landmark: landmark,
              city: city,
              state: state,
              type: type,
              pincode: pincode,
              contactemail: contactemail,
              contactname: contactname,
              contactnumber: contactnumber,
            },
          },
        }
      )
        .then((saved) => {
          if (saved) {
            res.status(200).send({ message: "Address added successfully" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

// getting all address list
app.get("/addressdetails", authenticateToken, async (req, res) => {
try {
    
    if(req.user===null){
        
        
        return res.sendStatus(205);
    }else{
  const { email } = req.user;
  const userDetail = await User.findOne({ email, email });
  if (userDetail) {
console.log(userDetail.addresses);
    res.status(200).send(userDetail.addresses);
  }
}
} catch (error) {
    console.log(error);
}
});

//deleting user's addresss
app.delete("/deleteaddress", authenticateToken, async (req, res) => {
  try {
    if(req.user===null)
    {
        res.sendStatus(205);
    }
    else{
    const { email } = req.user;
    const { addToBeDeleted } = req.body;

    const updatedDetail = await User.updateOne(
      { email, email },
      {
        $pull: {
          addresses: { _id: addToBeDeleted },
        },
      }
    );
    console.log(updatedDetail);
    if (updatedDetail) {
      res.status(200).send({ message: "address deleted successfully" });
    }
}
  } catch (error) {
    console.log(error);
  }
});

//updating user's address
app.post("/updateaddress", authenticateToken, async (req, res) => {
  const {
    contactname,
    contactemail,
    contactnumber,
    street1,
    street2,
    landmark,
    city,
    state,
    pincode,
    type,
    id,
  } = req.body;

  if (
    !contactname ||
    !contactemail ||
    !contactnumber ||
    !street1 ||
    !street2 ||
    !landmark ||
    !city ||
    !state ||
    !pincode ||
    !type
  ) {
    return res.status(301).send({ message: "please fill all the details" });
  }
  const updatedDetail = await User.updateOne(
    { "addresses._id": id },
    {
      $set: {
        "addresses.$.type": type,
        "addresses.$.contactname": contactname,
        "addresses.$.contactemail": contactemail,
        "addresses.$.contactnumber": contactnumber,
        "addresses.$.street1": street1,
        "addresses.$.street2": street2,
        "addresses.$.landmark": landmark,
        "addresses.$.city": city,
        "addresses.$.pincode": pincode,
        "addresses.$.state": state,
      },
    }
  );
  if (updatedDetail) {
    res.status(200).send({ message: "address updated successfully" });
  }
});
//stock checking
app.post("/stockchecker",async(req,res)=>{
  try {
    
    const{productId}=req.body;
    const prod=await ProductData.findOne({_id:productId});
    console.log(prod.quantity);
    if(prod)
    {
        res.status(200).send({quantity:prod.quantity});
    }
  
  
  } catch (error) {
    console.log(error);
  }
  })

//for placing order
app.post("/order", authenticateToken, async(req, res) => {
try {

    if(req.user===null)
    {
       
  const { orderItems, addressDetails } = req.body;
  const{totalMrp,
    productDiscount,
    subTotal,
    shippingCharges,
    total}=req.body.orderSummary;
  const orderDetails = [];
  orderItems.map((item, index) => {
    const finalDetail = {
      productid: item._id,
      productquantity: item.qty,
      productsize: item.size,
      productname: item.name,
    };
    orderDetails.push(finalDetail);
  });
 
  const address =
    addressDetails.street1 +
    "," +
    addressDetails.street2 +
    "," +
    addressDetails.landmark +
    "," +
    addressDetails.city +
    "," +
    addressDetails.state +
    "," +
    addressDetails.pincode;
  const uniqueOrderNumber = Math.random()
    .toString()
    .replace(".", Math.random().toString().replace(".", ""))
    .substring(2, 10);

const saveOrder=await new Order({
    userId:addressDetails.contactemail,
    userType:"Guest",
    orderid: uniqueOrderNumber,
          address: address,
          items: orderDetails,
          contactemail: addressDetails.contactemail,
          contactname: addressDetails.contactname,
          contactnumber: addressDetails.contactnumber,
     orderSummary:{
            totalMrp:totalMrp,
                  productDiscount:productDiscount,
                  subTotal:subTotal,
                  shippingCharges:shippingCharges,
                  total:total
        }
});
const finalSave=await saveOrder.save();
    if(finalSave)
    {
    res.status(200).json({message:"Order placed successfully"});
    }
    else{
        res.status(400).json({error:"Something went wrong"});
    }
    }
    else{
        const { email } = req.user;
  const { orderItems, addressDetails } = req.body;
  const{totalMrp,
    productDiscount,
    subTotal,
    shippingCharges,
    total}=req.body.orderSummary;
    

  const orderDetails = [];
  orderItems.map((item, index) => {
    const finalDetail = {
      productid: item._id,
      productquantity: item.qty,
      productsize: item.size,
      productname: item.name,
      productprice:item.price,
      productdiscount:item.discount
    };
    orderDetails.push(finalDetail);
  });

  const address =
    addressDetails.street1 +
    "," +
    addressDetails.street2 +
    "," +
    addressDetails.landmark +
    "," +
    addressDetails.city +
    "," +
    addressDetails.state +
    "," +
    addressDetails.pincode;
  const uniqueOrderNumber = Math.random()
    .toString()
    .replace(".", Math.random().toString().replace(".", ""))
    .substring(2, 10);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1 ;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
 var myDate= dd + '-' + mm + '-' + yyyy;
const saveOrder=await new Order({
    userId:email,
    userType:"Registered",
    orderid: uniqueOrderNumber,
          address: address,
          items: orderDetails,
          contactemail: addressDetails.contactemail,
          contactname: addressDetails.contactname,
          contactnumber: addressDetails.contactnumber,
          orderSummary:{
            totalMrp:totalMrp,
                  productDiscount:productDiscount,
                  subTotal:subTotal,
                  shippingCharges:shippingCharges,
                  total:total
        },
        orderDate:myDate,
        orderStatus:"processing"
        
});
const finalSave=await saveOrder.save();
    if(finalSave)
    {
      orderItems.map(async(item, index)=>{
        const updateQuantity=await ProductData.findOneAndUpdate({_id:item._id},
          {quantity:item.quantity-item.qty})})
          
          res.status(200).json({orderId:uniqueOrderNumber});
          
        }
    else{
        res.status(400).json({error:"Something went wrong"});
    }
    }
} catch (error) {
    console.log(error);
}
    
});


app.get("/userdetails", authenticateToken, async(req, res) => {
  try {
    if(req.user===null)
    {
      return res.sendStatus(205);
    }
    else{
  
  const { email } = req.user;
  console.log(email);
  if (email) {
    const response=await User.findOne({email:email});
    if(response)
    {
      res.status(200).send({
        fname:response.fname,
        lname:response.lname,
        number:response.number,
        email:email,
        gender:response.gender
      })
    }
  }
}
} catch (error) {
    console.log(error);
}
});

//fetching particular order details
app.get("/orders/:id",async(req,res)=>{
  try {
    let orderId=req.params['id'];
    console.log(orderId);
    const details=await Order.findOne({orderid:orderId});
    if(details)
    {
      res.status(200).send(details);
    }
    
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
})



app.get("/orderdetails", authenticateToken, async(req, res) => {
  try {
    if(req.user===null)
    {
      return res.sendStatus(205);
    }
    else{
  
  const { email } = req.user;
  if (email) {
    const response=await Order.find({userId:email});
    
   
    if(response)
    {
      res.status(200).send(response);
    }
    else{
      res.status(401).send({message:"Something went wrong"});
    }
  }
}
} catch (error) {
    console.log(error);
    res.status(401).send({message:"Something went wrong"});
}
});

//authenticating the user
function authenticateToken(req, res, next) {

    try {
        
        const accessToken = req.cookies.token;
        
        if (accessToken === undefined || accessToken==="" || accessToken===null) {
          
          req.user = null;
          console.log("why am i here");
          next();
        }
        else{
        
        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user) => {
          if (err) {
            return res.status(403).send({ message: "Unauthorized" });
          }
          req.user = user;
          next();
        });
      }
    } catch (error) {
        console.log(error);
    }
}

app.get("/authenticateUser", authenticateToken, (req, res) => {
  const { email } = req.user;
  if (email) {
    res.status(200).send({ message: "User authorized" });
  }
});

app.post("/updateuserdetails", authenticateToken, async(req, res) => {
  try {
    const {fname,lname,number,gender}=req.body;
  const { email } = req.user;
  if (email) {
    const response=await User.updateOne({email:email},
      {
        fname:fname,
        lname:lname,
        number:number,
        gender:gender
      }
      );
      if(response)
      {
        res.status(200).send({message:"profile details updated"})
      }
    
  }
} catch (error) {
    console.log(error);
}
});

//logout the user
app.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(1),
  });
  return res.status(200).send("user logout");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`server running at port 3001`);
});
