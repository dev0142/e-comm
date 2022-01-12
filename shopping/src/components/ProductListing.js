import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { setProducts } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import ProductComponent from "./ProductComponent";
import axios from "axios";
import Header from "../components/Header";
import back from "../photos/Images/productBackground.jpg";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import AppsIcon from "@mui/icons-material/Apps";
import { useParams,useLocation } from "react-router-dom";

function ProductListing({wishlistArray,setWishlistArray}) {
  const products = useSelector((state) => state.allProducts.products);
  const [grid, setGrid] = useState(true); //false==4 and true==3
  const sidebar = useRef(null);
  const productId  = useLocation().pathname;
  console.log(productId);
  const dispatch = useDispatch();

  
  const fetchProducts = async () => {
    const res = await axios
      .get("https://bhoomihillsnaturals-backend.herokuapp.com/fetch")
      .catch((err) => {
        console.log(err);
      });
    dispatch(setProducts(res.data));
  };
  useEffect(() => {
    
    window.addEventListener("scroll", () => {
     
      if (sidebar.current !== null) {
        if (window.scrollY > 470) {
          sidebar.current.classList.add("stickysidebar");
        } else {
     
          sidebar.current.classList.remove("stickysidebar");
        }
      }
    });
  }, []);




  return (
    <>
      <PageBackground></PageBackground>
      <AllProductListing>
        <SideBar ref={sidebar} />
        <div style={{ marginLeft: `17%`, width: `85%`, height: `100%` }}>
          <ul className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>PRODUCTS</li>
          </ul>
          <div
            style={{
              display: `flex`,
              justifyContent: `space-between`,
              alignItems: `center`,
              width: `92%`,
            }}
          >
            <span className="listingHeading">ALL PRODUCTS</span>
            <span style={{ cursor: `pointer` }}>
              <AppsIcon
                onClick={() => setGrid(false)}
                style={{
                  color: grid ? `#cccccc` : `black`,
                  border: `1px solid black`,
                  padding: `3px`,
                  fontSize: `30px`,
                }}
              />
              <ViewComfyIcon
                onClick={() => setGrid(true)}
                style={{
                  color: grid ? `black` : `#cccccc`,
                  padding: `3px`,
                  fontSize: `30px`,
                  border: `1px solid black`,
                }}
              />
            </span>
            <span style={{ color: `#cccccc` }}>
              Showing all {products.length} results
            </span>
          </div>
          <ProductComponents>
            <ProductComponent wishlistArray={wishlistArray} setWishlistArray={setWishlistArray}  grid={grid} />
          </ProductComponents>
        </div>
      </AllProductListing>
    </>
  );
}

export default ProductListing;

const Overlay = styled.div`
  position: absolute;
  width: 100%; /* Full width (cover the whole page) */
  height: 60vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #272735;
  opacity: 0.7;
`;

const ProductComponents = styled.div`
  width: 100%;
  /* background-color:#FAF9F8; */
  display: flex;
  flex-wrap: wrap;
`;

const PageBackground = styled.div`
  width: 100%;
  height: 60vh;
  background: url(${back});
  background-repeat: no-repeat;
  background-size: cover;
  background-clip: border-box;
  background-position: 0 -210px;
`;

const SideBar = styled.div`
  position: absolute;
  top: 10px;
  width: 15%;

  height: 80vh;
`;

const AllProductListing = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  align-items: center;
  width: 100%;
  /* border: 1px solid black; */
`;
