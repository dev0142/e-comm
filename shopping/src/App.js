import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./App.scss";
import {
  setProducts,
  setAddressList,
  setCartList,
  setUserList,
  setOrdersList,
} from "./redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductDetail from "./components/ProductDetail";
import ProductListing from "./components/ProductListing";
import Home from "./pages/Home";
import Header from "./components/Header.js";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Address from "./components/Address";
import Account from "./components/Account";
import StockChecker from "./components/StockChecker";
import OrderSuccess from "./components/OrderSuccess";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";

import OrderDetail from "./components/OrderDetail";
import SearchResults from "./components/SearchResults.js";
import AdminPanel from "./admin/AdminPanel";

function App() {
  const dispatch = useDispatch();
  const[searchTerm,setSearchTerm]=useState("");
  console.log(searchTerm);
  const[searchResult,setSearchResult]=useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [outOfStockChecker, setOutOfStockChecker] = useState(false); //out of stock checker
  const [userdata, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [isOpen, setIsOpen] = useState(false); //login modal
  const [wishlistArray, setWishlistArray] = useState(
    localStorage.getItem("wishlist")
  );
 

  const wishlistData = async () => {
    try {
      const wishlistData = await axios.get(
        "http://localhost:3001/getwishlist",
        (axios.defaults.withCredentials = true)
      );
      if (wishlistData.data !== null) {
        setWishlistArray(wishlistData.data);
        window.localStorage.setItem("wishlist", wishlistData.data);
      } else {
        window.localStorage.setItem("wishlist", null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(setUserList());
    dispatch(setProducts()).then(()=>{
     
      dispatch(setCartList());
      dispatch(setOrdersList());
    });
    // fetchProducts();
    wishlistData();
  }, []);
  return (
    <>
      <Router>
        <TopBar />
        
        <Header
          userdata={userdata}
          setUserData={setUserData}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          setWishlistArray={setWishlistArray}
          setCartCount={setCartCount}
          cartCount={cartCount}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Switch>
          <Route exact path="/product">
            <ProductListing
              wishlistArray={wishlistArray}
              setWishlistArray={setWishlistArray}
            />
          </Route>
          <Route exact path="/product/:productId">
            <ProductDetail setCartOpen={setCartOpen} />
          </Route>
          <Route exact path="/" component={Home}></Route>
          <Route path="/admin">


            <AdminPanel />
          </Route>
          <Route path="/cart">
            <Checkout
              outOfStockChecker={outOfStockChecker}
              setOutOfStockChecker={setOutOfStockChecker}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </Route>
          <Route path="/account">
            <Account
              userdata={userdata}
              setWishlistArray={setWishlistArray}
              setUserData={setUserData}
              setIsOpen={setIsOpen}
            />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path="/address">
            <Address
              outOfStockChecker={outOfStockChecker}
              setOutOfStockChecker={setOutOfStockChecker}
            />
          </Route>
          <Route path="/order-success">
            <OrderSuccess />
          </Route>
          <Route path="/orders/:id">
            <OrderDetail />
          </Route>
          <Route path="/search/:name">
            <SearchResults wishlistArray={wishlistArray} setWishlistArray={setWishlistArray} />
          </Route>
        </Switch>
        <Footer />
      </Router>

    </>
  );
}

export default App;
