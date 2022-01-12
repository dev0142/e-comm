import React from 'react'
import styled from 'styled-components';
import maleIcon from "../photos/maleProfile.png"
import femaleIcon from "../photos/femaleProfile.png"
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
import profile from '../components/userprofile/Profile'
import { deleteAllAddress } from '../redux/actions/productActions';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import {Link} from 'react-router-dom'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CabinIcon from '@mui/icons-material/Cabin';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Address from './userprofile/UserAddress';
import Orders from './userprofile/Orders';

function Account({setWishlistArray,setUserData}) {
  const userDetails = useSelector(state => state.user.user);
  const dispatch=useDispatch();
  const handleSignOut = () => {
    axios
      .get("/logout", (axios.defaults.withCredentials = true))
      .then((res) => {
        if (res.status === 200) {
          
          
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("wishlist");
          setWishlistArray(null);
          setUserData(null);
          dispatch(deleteAllAddress());
        
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
    return (
        <>
        <div>
        <div style={{ height: `110px`}}></div>
      </div>
        <div style={{ height: `160px`, backgroundColor:`#444444`,position:`relative` }}>
        
        <div>
        <ul style={{marginLeft:`60px`,color:`white`}} className="breadcrumb">
          <li>
            <Link style={{color:`white`}} to="/">Home</Link>
          </li>
          <li>
            <Link  style={{color:`white`}}  to="/account">My Account</Link>
          </li>
         
        </ul>
      </div>
      
      <AccountContainer>
        <ImageContainer>
            <img src={userDetails.gender==="Male" || userDetails.gender===undefined ? maleIcon : femaleIcon} height='100px'></img>
        </ImageContainer>
        <h1 style={{fontWeight:`500`,fontSize:`28px`,textAlign:`center`,marginTop:`48px`,marginBottom:`0px`,borderRadius:`10px`}}>
            Hi,     {userDetails.fname}
        </h1>
        <div style={{display:`flex`,justifyContent:`stretch`}}>
        <SideNavigation>
			<Link to={'/account/orders'} style={{textDecoration:`none`,color:`black`}}><li style={{display:`flex`,alignItems:`center`,justifyContent:`space-between`}}><span style={{display:`flex`,alignItems:`center`}}><FolderOpenIcon /><span>My Orders</span></span><span><ArrowForwardIosIcon style={{fontSize:`18px`}} /></span></li></Link>
			
			<Link to={'/account/profile'} style={{textDecoration:`none`,color:`black`}}><li style={{display:`flex`,alignItems:`center`,justifyContent:`space-between`}}><span style={{display:`flex`,alignItems:`center`}}><PermIdentityIcon /><span>My Profile</span></span><span><ArrowForwardIosIcon style={{fontSize:`18px`}} /></span></li></Link>

			<Link to={'/account/address'} style={{textDecoration:`none`,color:`black`}}><li style={{display:`flex`,alignItems:`center`,justifyContent:`space-between`}}><span style={{display:`flex`,alignItems:`center`}}><CabinIcon /><span>Saved Address</span></span><span><ArrowForwardIosIcon style={{fontSize:`18px`}} /></span></li></Link>
			<Link style={{textDecoration:`none`,color:`black`}}><li><HelpOutlineIcon /><span>Need Help</span></li></Link>
			<Link onClick={handleSignOut}to={'#'} style={{textDecoration:`none`,color:`black`}}><li><PowerSettingsNewIcon/><span>LogOut</span></li></Link>
			
	
			
		</SideNavigation>
        <MainNavigation>
          <Route>
            <Switch>
            <Route exact path="/account/profile" component={profile}></Route>
          <Route path="/account/address" component={Address}></Route>
          <Route path="/account/orders" component={Orders}></Route>
            </Switch>
          </Route>

        </MainNavigation>
        </div>
      </AccountContainer>
      </div>
      </>
    )
}

export default Account

const MainNavigation=styled.div`
 border:1px solid 	 #d9d9d9;
 border-radius:5px;
width: 70%;
margin: 0 auto;
background-color:#F8F8F8;
height:auto;
`

const SideNavigation=styled.ul`
background-color:	#F8F8F8;
margin: 0;
margin-left:15px;
height:330px;
width: 25%;
padding: 0px;
list-style:none;
text-decoration:none;
border-radius:6px;
li{

  display: flex;
  border-radius:3px;
  align-items:center;
  justify-content:flex-start;
  padding:20px;
  border:1px solid 	 #d9d9d9;
  span{
    margin-left:10px;
  }
}

`
const ImageContainer=styled.div`

width: 100px;
position: absolute;
left: 50%;
top: -50px;
border-radius:50%;
z-index:9;
background-color:white;
transform: translateX(-50%);
`
const AccountContainer=styled.div`
width:80%;
position: absolute;
top:70px;

border-radius:6px;
background-color:white;
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
height:auto;
left: 50%;
transform: translateX(-50%);
transform: translate();

z-index:9;
`
