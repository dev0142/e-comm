import React,{useState}from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import loginImage from "../photos/loginImage.jpg"
import {CSSTransition} from "react-transition-group"
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
// import api from "../api/users";
import '../App.css'

function Login({openLoginModal,closeLoginModal,userData,setUserData}) {
    const history=useHistory();
    // const notify = () => toast("Wow so easy!");

    const[login,setLogin]=useState(false);

    //details for signing the user
    const[user,setUser]=useState({name:"",email:"",password:""});

    let name,value;

    const handleInput=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value});
    }

    const handlePostData=(e)=>{
        e.preventDefault();
        axios.post('/register', {
                name:user.name,
                email:user.email,
                password:user.password
              }).then(res=>{
                if(res.status===200)
                {
                    alert("user registered successfully");
              }
              }).catch(err=>{
                    if(err.response.status===404)
                    {
                        alert("please fill all the details");
                    }
                    else if(err.response.status===403)
                    {
                        alert("User already exist");
                    }
                    else if(err.response.status===500)
                    {
                        alert("Something went wrong");
                    }
                    
              })
        
        
            
    }

    const closeBothModal=()=>{
        closeLoginModal();
        setLogin(false);
    }

    //login the user
    const[loginEmail,setLoginEmail]=useState("");
    const[loginPassword,setLoginPassword]=useState("");

    const handleLogin=(e)=>{
        e.preventDefault();
        const loginDetails={email:loginEmail,password:loginPassword};
        axios.post("/login",loginDetails,
        
            axios.defaults.withCredentials = true
        ).then(res=>{
            if(res.status===200)
            {
                setUserData(res.data);
                window.localStorage.setItem('user',JSON.stringify(res.data));
                closeLoginModal();
                history.push("/");
            }
        }).catch(err=>{
            if(err.response.status===400)
            {
                alert("User doesn't exist");
            }
            else if(err.response.status===401)
            {
                alert("Invalid credentials");
            }
            else if(err.response.status===500)
            {
                alert("Something went wrong!! Try Again");
            }
            else if(err.response.status===404)
            {
                alert("Please fill all the details");
            }
        })
    }
    


    if(!openLoginModal) return null;
    return (
        <>
        <Overlay onClick={closeBothModal}></Overlay>

        <CSSTransition
        in={openLoginModal}
        appear={true}
        timeout={450}
        classNames="fade"
        >
        <LoginContainer>
            <CloseIcon className="loginModalCloseIcon" style={{borderRadius:`22px`,padding:`4px`, backgroundColor:`#476b6b`,color:`white`,cursor:`pointer`,position:`absolute`,right:`-40px`,top:`-3px`,fontSize: `23px`}} onClick={closeBothModal} />
            <div className="mainContainer">
                {!login ?
            <div className='subcontainer-1'>
            <div className="heading">
                Log in to your Account
            </div>

            <div className='buttongroup'>
                    <div className="bt-area">
                    <NavLink to='#' className='bt-google'>
                    <GoogleIcon /></NavLink><span style={{color:`#d44c37`}}>Google</span>
                    </div>
                    <div className="bt-area">
                    <NavLink to='#' className='bt-facebook'>
                       <FacebookIcon /></NavLink><span style={{color:`#3C5374`}}>Facebook</span>
                    
                    </div>
                    <div className="bt-area">
                    <NavLink to='#' className='bt-apple'>
                       <AppleIcon /></NavLink><span>Apple</span>
                    </div>
                </div>

            <div className="sep">
                <div className='line'></div>
                <h5 className='text'>OR</h5>
                <div className='line'></div>
            </div>
            
            <form className='details'>
                <div className='labeltext'>Email/Mobile</div>
                <input value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} type='text' className='text' placeholder='Email or Mobile'></input>

                <div className='labeltext'>Password</div>
                <input value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} type='password' className='text' placeholder='**********'></input>

                <input type='submit' value='Log in' onClick={handleLogin} className='text-submit'/>
            </form>

            <div className="last-1">
                <div className="last-items"> <NavLink className="last-nav-link" to="#">Forget Password?</NavLink></div>
             <div className="last-items">
                <span className="bt-text">New User?</span><NavLink onClick={()=>setLogin(true)} className="last-nav-link" to='#'> Sign Up</NavLink></div>
            </div>

            </div>
            :
            <div className='subcontainer-1'>
                <div className='heading'>
                    Create your account
                </div>
                
                <div className='buttongroup'>
                    <div className="bt-area">
                    <NavLink to='#' className='bt-google'>
                    <GoogleIcon /></NavLink><span style={{color:`#d44c37`}}>Google</span>
                    </div>
                    <div className="bt-area">
                    <NavLink to='#' className='bt-facebook'>
                       <FacebookIcon /></NavLink><span style={{color:`#3C5374`}}>Facebook</span>
                    
                    </div>
                    <div className="bt-area">
                    <NavLink to='#' className='bt-apple'>
                       <AppleIcon /></NavLink><span>Apple</span>
                    </div>
                </div>

            <div className="sep">
                <div className='line'></div>
                <h5 className='text'>OR</h5>
                <div className='line'></div>
            </div>
            
            <form className='details'>

                <div className='labeltext'>Name</div>
                <input name="name" type='text' value={user.name}  onChange={handleInput} className='text' placeholder='Enter your Name'></input>

                <div className='labeltext'>Email/Mobile</div>
                <input name="email" type='text' value={user.email}  onChange={handleInput} className='text' placeholder='Email or Mobile'></input>

                <div className='labeltext'>Password</div>
                <input name="password" type='password' value={user.password}  onChange={handleInput} className='text' placeholder='**********'></input>

                <input type='submit' onClick={handlePostData} value='Sign in' className='text-submit'/>
            </form>

            <div className="last-1">
                <span className="bt-text">Existing User?  </span><NavLink  className="last-nav-link" onClick={()=>setLogin(false)} to='#'>Login here!</NavLink>
            </div>
            </div>
            }
            <div className='subcontainer-2'>
            
                <img style={{height:`auto`,width:`100%`}} src={loginImage} alt="login Image"></img>

            </div>                
        </div>
        
            
        </LoginContainer>
        </CSSTransition>
    </>
    )
}




const Overlay=styled.div`
position:fixed;
top:0;
bottom:0;
right:0;
left:0;
background: rgba( 255, 255, 255, 0.05 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 5px );
-webkit-backdrop-filter: blur( 5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const LoginContainer=styled.div`
position:fixed;
width:55%;
height:70vh;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color:#FFF;
border:1px solid black;
padding:35px 15px;
display:flex;
align-items:center;
border-radius:7px;
z-index:1000;
@media (max-width : 480px) {
    width:80%;
    height:65vh;
    padding:20px 10px;
    }
`

export default Login
