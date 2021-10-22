const express=require('express');
const dotenv=require('dotenv');
const User=require("./model/userData");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser =require('cookie-parser');

const app=express();
app.use(express.json());
app.use(cookieParser());
dotenv.config({path:'./config.env'});
require('./database/conn');
// app.get('/', (req, res) => { res.send('Hello from Express!')});



//registering the user
app.post('/register',(req,res)=>{

    
        const{email,name,password}=req.body;
        if(!name|| !email|| !password)
        {
            return res.status(404).send({message:"please fill all the details"});  
        }
        User.findOne({email:email}).then((userExist)=>{
            if(userExist)
            {
                return res.status(403).send({message:"User already exist"});
            }
            else{
                const newUser=new User({name,email,password});
                newUser.save().then(()=>{
                    res.status(200).send({message:"sign up sucessfull"});

                }).catch((err)=>{
                    res.status(500).send({message:"Something went Wrong"});

                })
            }
        }).catch(err=>{console.log(err.response)})

        
    })

// app.get("/products",authenticateToken,(req,res)=>{
//     res.status(200).send(req.user);
// })


//login the user
app.post("/login",(req,res)=>{
    const {email,password}=req.body;
    console.log(req.cookies.token);
    if(!email || !password)
    {
        return res.status(404).send({message:"please fill all the details"});  
    }
    User.findOne({email:email}).then((userExist)=>{
        if(!userExist)
        {
            return  res.status(400).send({message:"User doesn't exist"});
        }
        bcrypt.compare(password,userExist.password,(err,data)=>{
                if(err)
                {
                    res.status(500).send({message:"Something went Wrong"});
                }
                if(data)
                {
                    const user={name:userExist.name,email:email};
                    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN);
                    res.cookie('token', accessToken, { 
                        httpOnly: true ,
                        expires:new Date(Date.now()+599990000)
                    });
                    res.status(200).send(user);
                    
                }
                else{
                    res.status(401).send({message:"Invalid credentials"});
                }
            })
                
        }).catch(err=>{
            res.status(500).send({message:"Something went Wrong"});
        })
    })



//authenticating the user
function authenticateToken(req,res,next){
    const accessToken=req.cookies.token;
    if(accessToken===null) return res.sendStatus(401);//invalid user

    jwt.verify(accessToken,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err) return res.sendStatus(403)//you dont have the access
        req.user=user
        next();
    })
}

//logout the user
app.get('/logout',(req,res)=>{
    res.cookie("token", "", { 
        httpOnly: true,  
        expires: new Date(1)
    });
    return res.status(200).send('user logout');
    
})

app.listen(process.env.PORT || 3001,()=>{
    console.log(`server running at port 3001`);
})