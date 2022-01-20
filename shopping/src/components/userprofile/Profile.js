import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import male from '../../photos/male.png'
import female from '../../photos/female.png'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';
import { setUserList } from '../../redux/actions/productActions';

function Profile() {
    
    const dispatch=useDispatch();
   const userDetails = useSelector(state => state.user.user);
   
    const[profileDetails,setProfileDetails]=useState({
        fname:"",lname:"",email:"",number:undefined,gender:""
    })

let items;
let value;
    const handleInput = (e) => {
        items = e.target.name;
        value = e.target.value;
        setProfileDetails({ ...profileDetails, [items]: value });
      };


      const updateUserDetails=async(e)=>{
          e.preventDefault();

          const res=await axios.post("http://localhost:3001/updateuserdetails",profileDetails,
          (axios.defaults.withCredentials = true));

          if(res.status===200)
          {
              dispatch(setUserList())
              alert("profile updated");
          }
      }
    useEffect(() => {
        
        setProfileDetails({
            fname:userDetails.fname,
            lname:userDetails.lname,
            email:userDetails.email,
            number:userDetails.number===0 ? undefined : userDetails.number,
            gender:userDetails.gender
        });
    }, [userDetails])
    return (
        <>
        <h1 style={{marginLeft:`15px`,fontWeight:`500`,fontSize:`23px`}}>My Account</h1>
        <ProfileContainer>
            <form>
                <div >
                <label>First Name</label>
                <input autoComplete="none" onChange={handleInput} value={profileDetails.fname} type="text" name="fname" />
                </div>
                <div>
                <label>Last Name</label>
                <input autoComplete="none" onChange={handleInput} value={profileDetails.lname} name="lname"   type="text" />
                </div>
                <div>
                <label>Email ID</label>
                <input disabled={true} autoComplete="none" onChange={handleInput} value={profileDetails.email} name="email"  type="text" />
                </div>
                <div>
                <label>Phone Number</label>
                <input autoComplete="none" onChange={handleInput} value={profileDetails.number} name="number"  type="number" />
                </div>
                <div>
                <label>Gender</label>
                <div style={{display:'flex',margin:`15px`,flexDirection:`row`,width:`75%`,alignItems:`center`,justifyContent:`space-between`}}>
                <div onClick={()=>setProfileDetails({...profileDetails,gender:"Male"})} style={{display:'flex',cursor:'pointer',borderRadius:`6px`,width:`40%`,flexDirection:`row`,alignItems:`center`,border:profileDetails.gender==="Male" ? `3px solid #01447E`:`1px solid black`,padding:`3px`}}>
                    <img src={male} height="28px" alt="male.png"></img>
                    <span>Male</span>
                </div>
                <div onClick={()=>setProfileDetails({...profileDetails,gender:"Female"})} style={{display:'flex',cursor:'pointer',borderRadius:`6px`,width:`40%`,flexDirection:`row`,alignItems:`center`,border:profileDetails.gender==="Female" ? `3px solid #01447E`:`1px solid black`,padding:`3px`}}>
                    <img src={female} height="28px" alt="male.png"></img>
                    <span>Female</span>
                </div>

                </div>
                </div>
                
                <button className="button-28" onClick={(e)=>updateUserDetails(e)}>Update</button>
                   
            </form>
        </ProfileContainer>
        </>
    )
}

export default Profile

const ProfileContainer=styled.div`

width: 80%;
margin:20px auto;
height: auto;
div{
    position: relative;
    display: flex;
    margin: 5px 15px 15px 0px ;
    flex-direction:column;
    width: 45%;
    div{
        -webkit-tap-highlight-color: transparent;
    }
    
    input{
        border: none;
        border-bottom:1px solid #bfbfbf;
        background-color:#f8f8f8;
        padding:10px;
        font-size:15px;
        &:-webkit-autofill,
        &:-webkit-autofill:focus {
          transition: background-color 600000s 0s, color 600000s 0s;
        }
        input[data-autocompleted] {
          background-color: transparent !important;
        }
        
        
    }
    label{
        position: absolute;
        top:-12px;
        background-color:#f9f9f9 ;
        color: #333333;
        left: 5px;
        font-size:13.5px;
    }
}

form{
    margin-top:50px;
    display: flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap:wrap;
   
}

`
