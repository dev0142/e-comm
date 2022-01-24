import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from 'axios';

function SearchResults({setWishlistArray,wishlistArray}) {
  const location = useLocation();
  const allProducts = useSelector((state) => state.allProducts.products);
  const[searchedFor,setSearchedFor] = useState("");
  
  const [searchedProducts,setSearchedProducts] =useState([]);

  const mainResults=()=>{
   
    console.log("yesss i am running for god sk")
    const hehe=allProducts.filter((product) => {
      let toBeSearched = Object.values(product).slice(0, 5);
      let exp1 = toBeSearched.join(" ");
      let finalexp = "";
      for (let i = 0; i < exp1.length; i++) {
        if (exp1.charAt(i) !== " ") {
          finalexp += exp1.charAt(i);
        }
      }

      return finalexp.toLowerCase().includes(searchedFor.toLowerCase());
      
      // const regex=new RegExp(`${searchTerm}`,"g");
      // return product.match(regex)
    });
    setSearchedProducts(hehe);
    
  }
  useEffect(() => {
    setSearchedFor(location.pathname.split("/").pop().replace(" ",""));
   
  }, [location]);

  // useEffect(() => {
  //   setSearchedFor(location.pathname.split("/").pop().replace(" ",""));
   
  // }, [allProducts]);

  useEffect(()=>{
      mainResults();
  },[searchedFor,allProducts])
  
  const wishlistData = async () => {
    try {
      const wishlistData = await axios.get(
        "http://localhost:3001/getwishlist",
        (axios.defaults.withCredentials = true)
      );
      setWishlistArray(wishlistData.data);
      window.localStorage.setItem("wishlist", wishlistData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    wishlistData();
    
    setSearchedFor(location.pathname.split("/").pop().replace(" ",""));
  }, []);

  const renderList = searchedProducts.map((product, index) => {
    const changeImg = (e) => {
      e.target.src = product.images[1];
    };
    const changeImgBack = (e) => {
      e.target.src = product.images[0];
    };

    const calculate = () => {
      const diff = (product.price * product.discount) / 100;
      return Math.round(product.price - diff);
    };

    const addToWishlist = (productId) => {
      axios
        .post(
          "http://localhost:3001/wishlist",
          { productId },
          (axios.defaults.withCredentials = true)
        )
        .then((res) => {
          if (res.status === 200) {
            wishlistData();
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
    const removeFromWishlist = (productId) => {

      axios
        .post(
          "http://localhost:3001/remwishlist",
          { productId },
          (axios.defaults.withCredentials = true)
        )
        .then((res) => {
          if (res.status === 200) {
            wishlistData();
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

    return (
      <ProductCard key={index}>
        {wishlistArray!==null && wishlistArray.includes(product._id)  ? (
          <FavoriteIcon
            onClick={() => removeFromWishlist(product._id)}
            style={{
              borderRadius: `20px`,
              backgroundColor: `#F0F0F0`,
              color: `#CC0000`,
              cursor: `pointer`,
              padding: `5px`,
              position: `absolute`,
              right: `-5px`,
              top: `-10px`,
            }}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => addToWishlist(product._id)}
            style={{
              borderRadius: `20px`,
              backgroundColor: `#F0F0F0`,
              color: `black`,
              cursor: `pointer`,
              padding: `5px`,
              position: `absolute`,
              right: `-5px`,
              top: `-10px`,
            }}
          />
        )}
        <Link style={{ textDecoration: `none` }} to={`/product/${product._id}`}>
          <div>
            <ImageContainer>
              <img
                onMouseOver={(e) => changeImg(e)}
                onMouseLeave={(e) => changeImgBack(e)}
                src={product.images[0]}
                alt={product.name}
              />
            </ImageContainer>
            <ProductTitle>
              <p style={{ margin: `0` }}>{product.name}</p>
            </ProductTitle>
            <ProductCompany>
              <p>Bhoomi Hills Naturals</p>
            </ProductCompany>
            <ProductPrice>
              <span>₹{calculate()}</span>
              <ProductMrp>₹{product.price}</ProductMrp>
              <ProductDiscount>{product.discount}% OFF</ProductDiscount>
            </ProductPrice>
          </div>
        </Link>
        <ProductAddtocart>
          <ShoppingCartIcon
            style={{
              padding: `8px`,
              color: `#0d0d0d`,
              margin: `4px`,
              borderRadius: `50%`,
              backgroundColor: `#f2f2f2`,
            }}
          />
          <InfoIcon
            style={{
              padding: `8px`,
              margin: `4px`,
              color: `#0d0d0d`,
              borderRadius: `50%`,
              backgroundColor: `#f2f2f2`,
            }}
          />
        </ProductAddtocart>
      </ProductCard>
    );
  });

  if(searchedProducts.length===0)
  {
  return(
    <>
    Loading...........................please wait
    </>
  )
  }
  else{
  return (
    <>
<MainContainer>
<div>
        <ul style={{ padding: `8px 0px`,marginLeft:`0px` }} className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={`/search/${searchedFor}`}>My Orders</Link>
          </li>
        </ul>
      </div>
<h4>Your Search Results for</h4>
<h2>"{searchedFor}"</h2>

<ProductSearched>
  <div style={{margin:`10px 0px`,color:`#333333`}}>{searchedProducts.length}    Results Found</div>
  <ProductListing>
{renderList}

  </ProductListing>


</ProductSearched>


</MainContainer>

    </>
  
  )}
}

export default SearchResults;

const MainContainer=styled.div`
width: 70%;
margin: 15px auto;
padding: 10px;
height: auto;

h2{
  font-size:35px;
  font-weight:600;
 
}
h4{
  font-weight:500;
  font-size:18px;
}
`
const ProductListing=styled.div`
display: flex;
flex-wrap:wrap;

`

const ProductSearched=styled.div`
width: 100%;
div{
  text-align:center;
}
`
const ProductAddtocart = styled.div`
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.4s ease, opacity 0.4s ease;
`;

const ProductCard = styled.div`
  margin: 6px 15px 6px 15px;
  width: 21.5%;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  background-color: white;
  height: 440px;
  transition: all 0.4s ease;
  padding: 0px 0px 2px 0px;
  
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    ${ProductAddtocart} {
      visibility: visible;
      opacity: 1;
      cursor: pointer;
    }
  }
`;

const ImageContainer = styled.div`
  height: 280px;
  transition: all 0.4s ease;

  margin-bottom: 5px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ProductTitle = styled.div`
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #39378a;
    font-size: 17.5px;
  }
  text-align: center;
`;

const ProductCompany = styled.div`
  text-align: center;
  color: #cccccc;
  p {
    font-size: 14px;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  span {
    padding: 0 10px;
    font-weight: bold;
    color: #1859b0;
  }
`;

const ProductMrp = styled.div`
  text-decoration: line-through;
  color: #bfbfbf;
`;

const ProductDiscount = styled.div`
  padding: 3px 4px 3px 4px;
  margin-left: 10px;
  border-radius: 4px;
  background-color: red;
  font-size: 13px;
  color: white;
  font-weight: 600;
`;