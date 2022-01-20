import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShareIcon from "@mui/icons-material/Share";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Unique from './Unique.js'

import Share from "./Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCurrentItem,
  removeSelectedProduct,
  addToCart,
  setWishlistedProduct,
  removeWishlistedProduct,
} from "../redux/actions/productActions";
import { useParams } from "react-router-dom";
import HeaderProducts from "./HeaderProducts";
import free from "../photos/free-delivery.png";
import original from "../photos/original.png";
import money from "../photos/save-money.png";
import handpicked from "../photos/tea.png";
import Cart from "./Cart"
import { addButtonAnimation,removeButtonAnimation, removeCartButton } from "../admin/AnimateButton";

function ProductDetail({setCartOpen}) {

  const butt= useRef();
  const cartButt=useRef();
  const history=useHistory();
  const [wishlistArray, setWishlistArray] = useState(
    localStorage.getItem("wishlist")
  );

  const [wishlistButton, setWishlistButton] = useState(false);
  const product = useSelector((state) => state.allProducts.currentItem);

  const [productValue, setProductValue] = useState(1);

  const [currentSlide, setCurrentSlide] = useState(0);

const[selectedSize,setSelectedSize]=useState(30);

  const { productId } = useParams();
  const dispatch = useDispatch();
  const calculate = () => {
    const diff = (product.price * product.discount) / 100;
    return Math.round(product.price - diff);
  };

  // for sharing
  const [open, setOpen] = useState(false);

  const addToWishlist = () => {
    axios
      .post(
        "http://localhost:3001/wishlist",
        { productId },
        (axios.defaults.withCredentials = true)
      )
      .then((res) => {
        if (res.status === 200) {
          wishlistData();
          setWishlistButton(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login to continue");
        } else if (err.response.status === 403) {
          alert("Something went wrong...");
        }
      });
  };
  const removeFromWishlist = () => {
    axios
      .post(
        "http://localhost:3001/remwishlist",
        { productId },
        (axios.defaults.withCredentials = true)
      )
      .then((res) => {
        if (res.status === 200) {
          setWishlistButton(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Please login to continue");
        } else if (err.response.status === 403) {
          alert("Something went wrong...");
        }
      });
  };
  const wishlistData = async () => {
    try {
      const wishlistData = await axios.get(
        "http://localhost:3001/getwishlist",
        (axios.defaults.withCredentials = true)
      );
      setWishlistArray(wishlistData.data);
      window.localStorage.setItem("wishlist", wishlistData.data);
      var names = wishlistArray.includes(productId);
      if (names) {
        setWishlistButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId && productId !== "") {
      wishlistData();
      dispatch(loadCurrentItem(productId));
    }
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  const addToTheCart=(id,value,size)=>{
    
    if(!butt.current.classList.contains("isCartButt"))
    {
    if(selectedSize===30 || selectedSize===50)
    { 
    addButtonAnimation(butt);
    dispatch(addToCart(id,value,size))
    setTimeout(function(){removeButtonAnimation()},1900);
  
   
  }
}
  else{
    setCartOpen(true);
    removeCartButton();
  }
    
  }

  return (
    <>
    
      <div>
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Products</Link>
          </li>
          <li>{product.name}</li>
        </ul>
      </div>
      {Object.keys(product).length === 0 ? (
        <div>...loading</div>
      ) : (
        <>
          <MainContainer>
            <ImageContainer>
              <div
                style={{
                  position: `relative`,
                  display: `flex`,
                  flexWrap: `nowrap`,
                  overflowX: `hidden`,
                }}
              >
                {product.images.map((image, index) => {
                  return (
                    <Slider
                      key={index}
                      style={{
                        marginLeft:
                          index === 0 ? ` -${currentSlide * 100}%` : undefined,
                      }}
                    >
                      <img
                        style={{ width: `100%`, height: `500px` }}
                        src={image}
                        alt={product.name}
                      />
                    </Slider>
                  );
                })}
              </div>
              <ImageSliderWrapper>
                {product.images.map((item, index) => {
                  return (
                    <ImageSlider
                      style={{ margin: `5px` }}
                      isActive={currentSlide === index}
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <img
                        style={{ width: `100px`, height: `100px` }}
                        src={item}
                        alt={product.name}
                      />
                    </ImageSlider>
                  );
                })}
              </ImageSliderWrapper>
            </ImageContainer>
            <ProductCont>
              <div
                style={{
                  display: `flex`,
                  alignItems: `center`,
                  justifyContent: `space-between`,
                  width: `90%`,
                }}
              >
                <span
                  style={{
                    fontSize: `33px`,
                    fontWeight: `600`,
                    textTransform: `capitalize`,
                  }}
                >
                  {product.name}
                </span>
                <div>
                  {
                  wishlistArray!==null && wishlistArray.includes(product._id) ? (
                    <FavoriteIcon
                      className="wishlistIcon"
                      onClick={removeFromWishlist}
                      style={{
                        color: `#cc0000`,
                        fontSize: `29px`,
                        marginRight: `10px`,
                        cursor: `pointer`,
                      }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      className="wishlistIcon"
                      onClick={addToWishlist}
                      style={{
                        fontSize: `29px`,
                        marginRight: `10px`,
                        cursor: `pointer`,
                      }}
                    />
                  )}
                  <ShareIcon
                    onClick={() => setOpen(true)}
                    style={{ fontSize: `29px`, cursor: `pointer` }}
                  />
                </div>
              </div>
              <div className="sep">
                <div className="line"></div>

                <div className="line"></div>
              </div>
              <ProductPrice>
                <ProductMrp>₹{product.price}</ProductMrp>
                <span>₹{calculate()}</span>
                <ProductDiscount>{product.discount}% OFF</ProductDiscount>
              </ProductPrice>
              <span style={{ color: `#bfbfbf`, marginTop: `10px` }}>
                Inclusive of all taxes
              </span>
              <div style={{ borderRadius:`6px`,marginTop: `20px`, display: `flex`,backgroundColor:`#F8F8F8`,padding:`0px 6px`,width:`88%` }}>
                <WeightTeller selected={selectedSize}>
                  <p style={{fontSize:`17.5px`}}>Select your size</p>
                  <div onClick={()=>setSelectedSize(30)} style={{border:selectedSize===30? `2px solid #01447E` : undefined ,color:selectedSize===30 ? `#013665` : undefined}}><span>30 g</span>

                  {selectedSize===30 ?
                  <CheckCircleIcon style={{fontSize:`20px`,marginTop:`2px`}} />
                  :
                  <CheckCircleOutlineIcon style={{fontSize:`20px`,marginTop:`2px`}} />
}
                   </div>
                  <div onClick={()=>setSelectedSize(50)} style={{border:selectedSize===50? `2px solid #01447E` : undefined ,color:selectedSize===50 ? `#013665` : undefined}}><span>50 g</span> 
                  {selectedSize==50 ?
                  <CheckCircleIcon style={{fontSize:`20px`,marginTop:`2px`}} />
                  :
                  <CheckCircleOutlineIcon style={{fontSize:`20px`,marginTop:`2px`}} />
}
                  
                  </div>
                  
                </WeightTeller>
              </div>
              <div class="quantity buttons_added">
                <span style={{ fontSize: `17px` }}>Quantity</span>
                <div>
                  <input
                    onClick={() =>
                      productValue === 1
                        ? undefined
                        : setProductValue(productValue - 1)
                    }
                    type="button"
                    value="-"
                    class="minus"
                  />
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max=""
                    name="quantity"
                    value={productValue}
                    title="Qty"
                    className="input-text qty text "
                    size="4"
                    pattern=""
                    inputmode=""
                  />
                  <input
                    type="button"
                    onClick={() => setProductValue(productValue + 1)}
                    value="+"
                    class="plus"
                  />
                </div>
              </div>
              <span style={{ color: `#a6a6a6`, marginTop: `15px` }}>
                Estimated delivery: 5 - 12 days
              </span>
              <button
              ref={butt}
                className="button-36"
                onClick={()=>{
                  addToTheCart(product._id,productValue,selectedSize)
                
                }}
              >
                Add to cart
              </button>
              <button
              ref={cartButt}
                className="button-36-after"
                
              >
                View your Cart
              </button>
              <button className="button-37">Buy Now</button>
            </ProductCont>
          </MainContainer>
          <Unique />

          <DescriptionCont>
            <h2 style={{ textAlign: `center` }}>Description</h2>
          </DescriptionCont>
        </>
      )}
      <Share open={open} close={() => setOpen(false)} />
      
    </>
  );
}

export default ProductDetail;

const MainContainer = styled.div`
  height: auto;
  display: flex;
  justify-content: stretch;
  width: 70%;
  margin: 0 auto;
`;

const WeightTeller = styled.div`

  
  
  cursor: pointer;
  height: 45px;
       
       border-radius: 5px;
       width: 80%;
      display: flex;
      background-color: #F8F8F8;
      align-items: center;
      justify-content: space-between;
  
  div{
    width: 65px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  
    padding: 2px 5px;
    border-radius:5px;
  border: 2px solid #a6a6a6;
  color: #a6a6a6;
  }
`;



const ProductCont = styled.div`
  width: 45%;

  padding-left: 30px;
  display: flex;
  flex-direction: column;
`;

const DescriptionCont = styled.div`
  height: 50vh;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  width: 70%;
  margin: 0 auto;
`;

const ImageContainer = styled.div`
  width: 55%;
  transition: 0.45s;

  position: relative;
  &:hover {
    transition: 0.45s;
    z-index: 99999;
  }
`;

const ImageSliderWrapper = styled.div`
  position: absolute;
  display: flex;
  top: -5px;
  left: -120px;
  flex-direction: column;
`;
const Slider = styled.div`
  height: 500px;
  width: 100%;
  transition: 750ms all ease-in-out;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  @media (max-width: 480px) {
    height: 50vh;
    -webkit-background-size: 100%;
    -moz-background-size: 100%;
    -o-background-size: 100%;
    background-size: 100%;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;

const ImageSlider = styled.div`
  opacity: ${(props) => (props.isActive ? 1 : 0.6)};
  transition: 750ms all ease-in-out;
  &:hover {
    cursor: pointer;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  span {
    margin-left: 15px;
    padding: 0 10px;
    font-weight: 700;
    font-size: 21px;
    color: #1859b0;
  }
`;

const ProductMrp = styled.div`
  text-decoration: line-through;
  color: #bfbfbf;

  font-size: 19px;
`;

const ProductDiscount = styled.div`
  padding: 3px 8px 3px 8px;
  margin-left: 50px;
  border-radius: 4px;
  background-color: #cf2929;
  font-size: 19px;
  color: white;
  font-weight: 500;
`;
