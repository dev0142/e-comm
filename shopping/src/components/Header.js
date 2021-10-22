import React,{useState,useEffect} from 'react'
import "../App.css"
import styled from 'styled-components'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { NavLink } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import Herb from "../photos/herbs.png"
import Drink from "../photos/drink.png"
import Dry from "../photos/dry.png"
import Seed from "../photos/seed.png"
import Spices from "../photos/spices.png"
import Veggie from "../photos/vegetable.png"
import Wheat from "../photos/wheat.png"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Spread from "../photos/toast.png"
import Login from '../pages/Login';
import axios from 'axios'


function DropDownMenu()
{
    return(
        <>
        <CategoryContainer>
        <MenuItems>
        <img src={Herb} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Herbs</a>
         </MenuItems>
         <MenuItems>
        <img src={Spices} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Species</a>
         </MenuItems>
         <MenuItems>
        <img src={Drink} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Healthy Drink</a>
         </MenuItems>
         <MenuItems>
        <img src={Dry} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Dry Fruits</a>
         </MenuItems>
         <MenuItems>
        <img src={Wheat} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Pulses</a>
         </MenuItems>
         <MenuItems>
        <img src={Spread} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Spreads</a>
         </MenuItems>
         <MenuItems>
        <img src={Veggie} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Fresh Items</a>
         </MenuItems>
         <MenuItems>
        <img src={Seed} style={{width:`25px`,height:`25px`}} alt="herb image"/>
        <a href="#">Seeds</a>
         </MenuItems>
        </CategoryContainer>
        </>
    )
}
const MenuItems=styled.div`
padding-left:5px;
width:90%;
display:flex;
align-items:center;
justify-content:center;
&:hover{
    filter: brightness(1.2);
}a{
    font-size:1.2rem;
    text-decoration:none;
    color:black;
    font-weight:500;
    margin:0 auto;
    width:90%;
    margin:7px;
}
@media (max-width : 480px) {
    a{
        font-size:0.89rem;
    }
    }
`
const CategoryContainer=styled.div`
width:200px;
position:absolute;
top:250px;
left:51%;
transform:translate(-50%,-50%);
background: rgba( 255, 255, 255, 0.3 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 15px );
-webkit-backdrop-filter: blur( 15px );
border-radius: 7px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
display:flex;
transition: height 5000ms ease-in-out;
flex-wrap:nowrap;
flex-direction:column;

@media (max-width : 480px) {
    position:fixed;
    top:initial;
    bottom:-60px;
    }
`
function ProfileMenu({setUserData,setOpenProfile})
{
    const handleSignOut=()=>{
        axios.get("/logout",axios.defaults.withCredentials = true
        ).then(res=>{
            if(res.status===200)
            {
            window.localStorage.removeItem('user');
            window.localStorage.clear();
            setUserData(null);
            setOpenProfile(false);
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <>
        <ProfileContainer>
        <ProfileItems>
        
        <a href="#">My Account</a>
         </ProfileItems>
         <ProfileItems>
        
        <a href="#">Orders</a>
         </ProfileItems>
         <ProfileItems>

        <NavLink onClick={handleSignOut} to="/">LogOut</NavLink>
         </ProfileItems>
        </ProfileContainer>
        </>
    )
}
const ProfileItems=styled.div`
padding-left:5px;
width:90%;
display:flex;
align-items:center;
justify-content:center;
a{
    font-size:1rem;
    text-decoration:none;
    color:black;
    font-weight:500;
    margin:0 auto;
    width:90%;
    margin:7px;
}
@media (max-width : 480px) {
    a{
        font-size:0.89rem;
    }
    }
`
const ProfileContainer=styled.div`
width:170px;
position:absolute;
top:145px;
left:76%;
transform:translate(-50%,-50%);
background: rgba( 255, 255, 255, 0.3 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 15px );
-webkit-backdrop-filter: blur( 15px );
border-radius: 7px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
display:flex;
transition: height 5000ms ease-in-out;
flex-wrap:nowrap;
flex-direction:column;

@media (max-width : 480px) {
    position:fixed;
    top:initial;
    width:120px;
    left:71%;
    bottom:20px;
    }
`

function Header() {

   const [userdata,setUserData]=useState(JSON.parse(localStorage.getItem('user')));

   const[open,setOpen]=useState(false);     //Categories
   const [isOpen, setIsOpen] = useState(false);  //login modal

   const[openProfile,setOpenProfile]=useState(false);       //user profile

   const handleChange=()=>{
    setOpenProfile(false);
    setOpen(!open);
   }
   const handleProfileChange=()=>{
    setOpen(false);
    setOpenProfile(!openProfile);
   }
   const handleOff=()=>{
       setOpen(false);
       setOpenProfile(false);
   }
   const handleLogin=()=>{
       setIsOpen(true);
       setOpen(false);
   }
    return (
        <>
    <MainHeader>
        <LeftHeader>
            <NavLink className="icon-button instagram" to="#"><InstagramIcon/></NavLink>
            <NavLink className="icon-button facebook" to="#"><FacebookIcon/></NavLink>
            <NavLink className="icon-button whatsapp" to="#"><WhatsAppIcon/></NavLink>
        </LeftHeader>
        <MiddleHeader>
        <NavLink exact to="/" onClick={handleOff}  className="nav_link" activeClassName="active_navLink" >
            <HomeIcon  />HOME
            </NavLink>
            <NavLink onClick={handleOff} activeClassName="active_navLink" className="nav_link"  to="/shop">
            <StoreIcon />SHOP
            </NavLink>
           
            <NavLink onClick={handleChange} activeClassName="active_navLink" className="nav_link" style={{margin:`7px`}} to="/categories">
            <CategoryIcon />
            <div style={{display:`flex`,alignItems:`center`, margin:`0px`,padding:`0px`}}>CATEGORIES
            {
                open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
            }
            </div>
            
            </NavLink>
            <PartialActive>
            <NavLink onClick={handleOff} activeClassName="active_navLink" className="nav_link" to="/why-us">WHY US?</NavLink>
            </PartialActive>
        </MiddleHeader>
        <RightHeader>
            {
                !userdata ?
        <NavLink onClick={handleLogin} activeClassName="active_navLink" className="nav_link1" to="/"><PersonIcon />SIGN IN</NavLink>
        :
        <NavLink onClick={handleProfileChange} activeClassName="active_navLink" className="nav_link1" to="/profile"><PersonIcon />{userdata.name.split(" ")[0]}</NavLink>

            }
        <NavLink onClick={handleOff} activeClassName="active_navLink" className="nav_link1" to="/cart"><ShoppingBagIcon />CART</NavLink>
        </RightHeader>
    </MainHeader>
        {
         open ? <DropDownMenu /> : null
        }
        
        <Login userData={userdata} setUserData={setUserData} openLoginModal={isOpen} closeLoginModal={()=>{setIsOpen(false)}} >
        </Login>
        {
         openProfile ? <ProfileMenu setUserData={setUserData}setOpenProfile={setOpenProfile} /> : null
        }
        
    </>
    )
}

export default Header


const MiddleHeader =styled.div`
display:flex;
align-items:center;
`
const PartialActive=styled.div`
@media (max-width : 480px) {
    display:none;
    }
`
const LeftHeader=styled.div`
display:flex;
width:12%;
align-items:center;
justify-content:space-evenly;
padding-left:7px;
@media (max-width : 480px) {
    display:none;
}
`


const RightHeader=styled.div`
display:flex;
align-items:center;
`

const MainHeader=styled.div`
position:absolute;
top:55px;
left:50%;
transform: translate(-50%, -50%);
height:55px;
width:70%;
margin:0 auto;
background: rgba( 255, 255, 255, 0.3 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 11px );
-webkit-backdrop-filter: blur( 11px );
border-radius: 7px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
display:flex;
align-items:center;
justify-content:space-between;
@media (max-width : 480px) {
    position:fixed;
    top:initial;
    bottom:-30px;
    width:100%;
    height:60px;
    overflow-x:auto;
    overflow-y:hidden;
    justify-content:center;
    
    }
`

