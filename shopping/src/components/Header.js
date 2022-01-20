import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import Herb from "../photos/herbs.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Drink from "../photos/drink.png";
import Dry from "../photos/dry.png";
import { Link } from "react-router-dom";
import Seed from "../photos/seed.png";
import Spices from "../photos/spices.png";
import Veggie from "../photos/vegetable.png";
import Wheat from "../photos/wheat.png";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Spread from "../photos/toast.png";
import Login from "../pages/Login";
import axios from "axios";
import logo from "../photos/logo.svg";
import EjectIcon from '@mui/icons-material/Eject';
import Cart from "./Cart";
import {
  deleteAllAddress,
  deleteSelectedAddress,
} from "../redux/actions/productActions";

function DropDownMenu() {
  return (
    <>
      <CategoryContainer>
        {/* <div style={{minHeight:`20px`,backgroundColor:`transparent`}}></div> */}
        <MenuItems>
          <img
            src={Herb}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Herbs</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Spices}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Species</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Drink}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Healthy Drink</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Dry}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Dry Fruits</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Wheat}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Pulses</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Spread}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Spreads</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Veggie}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Fresh Items</a>
        </MenuItems>
        <MenuItems>
          <img
            src={Seed}
            style={{ width: `25px`, height: `25px` }}
            alt="herb image"
          />
          <a href="#">Seeds</a>
        </MenuItems>
      </CategoryContainer>
    </>
  );
}
const MenuItems = styled.div`
  padding-left: 5px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px 7px 0px 7px;
  &:hover {
    filter: brightness(1.2);
  }
  a {
    font-size: 1.2rem;
    text-decoration: none;
    color: black;
    font-weight: 500;
    width: 90%;
    margin: 7px 7px 0px 7px;
  }
  @media (max-width: 480px) {
    a {
      font-size: 0.89rem;
    }
  }
`;
const enlarge = keyframes`
100% {
  height:330px;
  
}
`;
const CategoryContainer = styled.div`
  width: 200px;
  position: absolute;
  top: 65px;
  left: 50%;
  height: 0px;
  transform: translate(-50%);
  background: rgba(252, 252, 252);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

  border-radius: 7px;
  display: flex;
  z-index: 999999;
  flex-wrap: nowrap;
  animation: ${enlarge} 300ms ease-in-out forwards;

  flex-direction: column;

  @media (max-width: 480px) {
    position: fixed;
    top: initial;
    bottom: -60px;
  }
`;

function ProfileMenu({ setWishlistArray, setUserData, setOpenProfile }) {
  const dispatch = useDispatch();
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
          setOpenProfile(false);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <ProfileContainer>
        <ProfileItems>
          <Link onClick={() => setOpenProfile(false)} to={"/account"}>
            My Account
          </Link>
        </ProfileItems>
        <ProfileItems>
          <Link to={"/account"}>Orders</Link>
        </ProfileItems>
        <ProfileItems>
          <NavLink onClick={handleSignOut} to="#">
            LogOut
          </NavLink>
        </ProfileItems>
        <EjectIcon style={{color:`white`,position:`absolute`,top:`-16px`,left:`50%`,transform:`translate(-50%)`}} />
      </ProfileContainer>
    </>
  );
}
const ProfileItems = styled.div`
  padding-left: 5px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    font-size: 1rem;
    text-decoration: none;
    color: black;
    font-weight: 500;
    margin: 0 auto;
    width: 90%;
    margin: 7px;
  }
  @media (max-width: 480px) {
    a {
      font-size: 0.89rem;
    }
  }
`;
const ProfileContainer = styled.div`
  width: 170px;
  position: absolute;
  top: 90px;
  left: 50%;
  z-index: 99999;
  transform: translate(-50%);
  background: rgba(251, 251, 251);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 7px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: flex;
  transition: height 5000ms ease-in-out;
  flex-wrap: nowrap;
  flex-direction: column;

  @media (max-width: 480px) {
    position: fixed;
    top: initial;
    width: 120px;
    left: 71%;
    bottom: 20px;
  }
`;

function Header({
  setWishlistArray,
  isOpen,
  setIsOpen,
  userdata,
  setUserData,
  cartCount,
  cartOpen,
  setCartCount,
  setCartOpen,
}) {
  //const [cartCount,setCartCount]=useState(0);
  const cartItems = useSelector((state) => state.allProducts.cart);
  const navbar = useRef(null);
  const [open, setOpen] = useState(false); //Categories
  const userDetails = useSelector((state) => state.user.user);

  const [openProfile, setOpenProfile] = useState(false); //user profile

  const handleChange = () => {
    setOpenProfile(false);
    setOpen(!open);
  };
  const handleChangeForHover = () => {
    setOpenProfile(false);
    setOpen(true);
  };
  const handleProfileChange = () => {
    setOpen(false);

    setOpenProfile(!openProfile);
  };
  const handleProfileChangeOnHover = () => {
    setOpen(false);
    setOpenProfile(true);
  };
  const closeProfileBlock = () => {
    setOpen(false);

    setOpenProfile(false);
  };
  const handleOff = () => {
    setOpen(false);
    setOpenProfile(false);
  };
  const handleLogin = () => {
    setIsOpen(true);
    setOpen(false);
  };
  //cart open
  // const[cartOpen,setCartOpen]=useState(false);
  const handleCartState = () => {
    setOpen(false);
    setOpenProfile(false);
    setCartOpen(true);
  };
  const closeCategoryBlock = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (navbar.current !== null) {
        if (window.scrollY > 200  && document.body.scrollHeight>1000) {
          navbar.current.classList.add("sticky");
        } else {
          
          navbar.current.classList.remove("sticky");
        }
      }
    });
  }, []);

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
  }, [cartItems]);
  return (
    <>
      <MainHeader ref={navbar}>
        <LogoSection>
          <img height={130} src={logo}></img>
        </LogoSection>
        <NavigationSection>
          <span
            style={{
              margin: `0px 5px`,
              padding: `5px 2px`,
              position: `relative`,
            }}
          >
            <NavLink
              exact
              to="/"
              onClick={handleOff}
              className="nav_link"
              activeClassName="active_navLink"
            >
              <div>
                <HomeIcon />
                <span>HOME</span>
              </div>
            </NavLink>
          </span>
          <span
            style={{
              margin: `0px 5px`,
              padding: `5px 2px`,
              position: `relative`,
            }}
          >
            <NavLink
              onClick={handleOff}
              activeClassName="active_navLink"
              className="nav_link"
              exact
              to="/product"
            >
              <div>
                <StoreIcon />
                <span>SHOP</span>
              </div>
            </NavLink>
          </span>
          <span
            onClick={handleChange}
            onMouseOver={handleChangeForHover}
            onMouseLeave={closeCategoryBlock}
            style={{
              margin: `0px 5px`,
              padding: `28px 2px`,
              position: `relative`,
            }}
          >
            <NavLink
              activeClassName="active_navLink"
              className="nav_link"
              style={{ margin: `0px` }}
              to="#"
            >
              <div>
                <CategoryIcon />

                <span>CATEGORIES</span>
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>
            </NavLink>
            {open ? <DropDownMenu /> : null}
          </span>
        </NavigationSection>
        <SearchBar>
          <SearchIcon />
          <input type="text" placeholder="Search your favourite product" />
        </SearchBar>
        <RightHeader>
          {!userdata ? (
            <NavLink
              onClick={handleLogin}
              activeClassName="active_navLink"
              className="nav_link1"
              to="#"
            >
              <PersonIcon />
              <span>SIGN IN</span>
            </NavLink>
          ) : (
            <>
              <span
                onClick={handleProfileChange}
                onMouseOver={handleProfileChangeOnHover}
                onMouseLeave={closeProfileBlock}
                style={{
                  margin: `0px 5px`,
                  padding: `35px 0px`,
                  position: `relative`,
                }}
              >
                <NavLink
                  activeClassName="active_navLink"
                  className="nav_link1"
                  to="#"
                >
                 

                  <PersonIcon />
                  <span>{userDetails.fname}</span>

                </NavLink>
                  {openProfile ? (
        <ProfileMenu
          setWishlistArray={setWishlistArray}
          setUserData={setUserData}
          setOpenProfile={setOpenProfile}
        />
      ) : null}
              </span>
              <NavLink className="nav_link1" to="#">
                <FavoriteBorderIcon />
                <span>WishList</span>
              </NavLink>
            </>
          )}
          <NavLink onClick={handleCartState} className="nav_link1" to="#">
            <ShoppingBagIcon style={{ zIndex: `99999` }}></ShoppingBagIcon>
            <span style={{ position: `relative` }}>
              <span>CART</span>
              {Object.keys(cartItems).length > 0 ? (
                <CartCounter cartItems={cartItems}>
                  <span>
                    {Object.keys(cartItems).length === 0 ? "" : cartCount}
                  </span>
                </CartCounter>
              ) : null}
            </span>
          </NavLink>
        </RightHeader>
      </MainHeader>

      <Login
        userData={userdata}
        setUserData={setUserData}
        openLoginModal={isOpen}
        setWishlistArray={setWishlistArray}
        closeLoginModal={() => {
          setIsOpen(false);
        }}
      ></Login>
      
      <Cart
        cartCount={cartCount}
        cartOpen={cartOpen}
        cartClose={() => setCartOpen(false)}
      />
    </>
  );
}

export default Header;

const NavigationSection = styled.div`
  display: flex;

  padding: 0px 10px;
  width: 27%;
  height: 100%;
  align-items: center;
  justify-content: center;
  span {
    font-size: 13.5px;
    padding: 0px 2px;
  }
  div {
    display: flex;
    align-items: flex-end;
  }
`;

const LogoSection = styled.div`
  width: 10%;
  position: relative;
  height: 100%;
  z-index: 9999;

  img {
    position: absolute;
    top: -21px;
    left: 20px;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;
const SearchBar = styled.div`
  width: 36%;
  padding: 8px;
  border-radius: 7px;
  background-color: #f5f5f5;
  display: flex;

  align-items: center;
  input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    padding: 5px;
    font-size: 15px;
  }
`;

const RightHeader = styled.div`
  display: flex;
  width: 17%;
  align-items: center;
justify-content:center;
  span {
    font-size: 13px;
  }
`;

const CartCounter = styled.div`
  padding: 5px;
  height: 13px;
  width: 12px;
  background-color: #cccccc;

  color: black;
  border-radius: 50%;
  position: absolute;
  top: -32px;
  right: -9px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainHeader = styled.div`
  
  
  height: 75px;
  width: 100%;
  box-sizing: border-box;
 margin: 0px;
 padding: 0px 20px;
  z-index: 3;
  display: flex;
  align-items: center;


  
  }
  @media (max-width: 480px) {
    position: fixed;
    top: initial;
    bottom: -30px;
    width: 100%;
    height: 60px;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: center;
  }
`;
