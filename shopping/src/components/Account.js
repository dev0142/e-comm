import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import maleIcon from "../photos/maleProfile.png";
import femaleIcon from "../photos/femaleProfile.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import profile from "../components/userprofile/Profile";
import { deleteAllAddress } from "../redux/actions/productActions";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CabinIcon from "@mui/icons-material/Cabin";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Address from "./userprofile/UserAddress";
import Orders from "./userprofile/Orders";

function Account({ setWishlistArray, setUserData ,userdata,setIsOpen}) {
  const [activeLink, setActiveLink] = useState("");

  const accountSidebar = useRef(null);
  const userDetails = useSelector((state) => state.user.user);
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

          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (accountSidebar.current !== null) {
        if (window.scrollY > 200 && document.body.scrollHeight > 1500) {
          accountSidebar.current.classList.add("stickyAccountSidebar");
        } else {
          accountSidebar.current.classList.remove("stickyAccountSidebar");
        }
      }
    });
  }, []);
  const location = useLocation();

  useEffect(() => {
    console.log("Location changed");
    const urlPath = window.location.href.split("/");
    setActiveLink(urlPath[urlPath.length - 1]);
  }, [location]);

  if(userdata===null || userdata===undefined) return (
    <>
    <div style={{display:`flex`,alignItems:`center`,justifyContent:`center`,flexDirection:`column`}}>

    <h2>
      Please login to continue
    </h2>
    <button onClick={()=>setIsOpen(true)} style={{width:`20%`}} className="button-36">Login</button>
    </div>
    </>
  )
  return (
    <>
      <SideNavigation ref={accountSidebar}>
        <Link
          to={"/account/orders"}
          style={{ textDecoration: `none`,borderRadius:`5px`, color: `black`}}
        >
          <li
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`,border:activeLink==="orders" ? `2px solid black` : null
            }}
          >
            <span style={{ display: `flex`, alignItems: `center` }}>
              <FolderOpenIcon />
              <span>My Orders</span>
            </span>
            <span>
              <ArrowForwardIosIcon style={{ fontSize: `18px` }} />
            </span>
          </li>
        </Link>

        <Link
          to={"/account/profile"}
          style={{ textDecoration: `none`, borderRadius:`5px`,color: `black`}}
        >
          <li
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`
              ,border:activeLink==="profile" ? `2px solid black` : null
            }}
          >
            <span style={{ display: `flex`, alignItems: `center` }}>
              <PermIdentityIcon />
              <span>My Profile</span>
            </span>
            <span>
              <ArrowForwardIosIcon style={{ fontSize: `18px` }} />
            </span>
          </li>
        </Link>

        <Link
          to={"/account/address"}
          style={{ textDecoration: `none`,borderRadius:`5px`, color: `black` }}
        >
          <li
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `space-between`
              ,border:activeLink==="address" ? `2px solid black` : null
            }}
          >
            <span style={{ display: `flex`, alignItems: `center` }}>
              <CabinIcon />
              <span>Saved Address</span>
            </span>
            <span>
              <ArrowForwardIosIcon style={{ fontSize: `18px` }} />
            </span>
          </li>
        </Link>
        <Link style={{ textDecoration: `none`, color: `black` }}>
          <li>
            <HelpOutlineIcon />
            <span>Need Help</span>
          </li>
        </Link>
        <Link
          onClick={handleSignOut}
          to={"#"}
          style={{ textDecoration: `none`, color: `black` }}
        >
          <li>
            <PowerSettingsNewIcon />
            <span>LogOut</span>
          </li>
        </Link>
      </SideNavigation>

      <div style={{ height: `160px`, backgroundColor: `#444448` }}>
        <div>
          <ul
            style={{ marginLeft: `60px`, color: `white` }}
            className="breadcrumb"
          >
            <li>
              <Link style={{ color: `white` }} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link style={{ color: `white` }} to="/account">
                My Account
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <AccountContainer>
        <ImageContainer>
          <img
            src={
              userDetails.gender === "Male" || userDetails.gender === undefined
                ? maleIcon
                : femaleIcon
            }
            height="100px"
          ></img>
        </ImageContainer>
        <h1
          style={{
            fontWeight: `500`,
            fontSize: `28px`,
            textAlign: `center`,
            marginTop: `48px`,
            marginBottom: `0px`,
            borderRadius: `10px`,
          }}
        >
          Hi, {userDetails.fname}
        </h1>
        <div style={{ display: `flex`, justifyContent: `stretch` }}>
          <MainNavigation>
            <Route>
              <Switch>
                <Route
                  exact
                  path="/account/profile"
                  component={profile}
                ></Route>
                <Route path="/account/address" component={Address}></Route>
                <Route path="/account/orders" component={Orders}></Route>
              </Switch>
            </Route>
          </MainNavigation>
        </div>
      </AccountContainer>
    </>
  );
}

export default Account;

const MainNavigation = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  width: 70%;
  margin: 10px auto 60px auto;
  background-color: #f8f8f8;
  height: auto;
`;

const SideNavigation = styled.ul`
  background-color: white;
  margin: 0;
  height: 65px;
  width: 100%;
  padding: 0px;
  list-style: none;
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 6px;
  li {
    display: flex;
    border-radius: 5px;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px;
    border: 1px solid #d9d9d9;
    span {
      margin-left: 10px;
    }
  }
`;
const ImageContainer = styled.div`
  width: 100px;
  position: absolute;
  left: 50%;
  top: -50px;
  border-radius: 50%;
  z-index: 9;
  background-color: white;
  transform: translateX(-50%);
`;
const AccountContainer = styled.div`
  width: 80%;
  margin: 10px auto;
  padding: 20px 0px;
  position: relative;
  top: -100px;
  border-radius: 6px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  height: 100%;
`;
