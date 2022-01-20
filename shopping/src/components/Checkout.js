import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import empty from "../photos/empty.jpg";
import ClearIcon from "@mui/icons-material/Clear";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  deleteSelectedAddress,
  removeFromCart,
  setProducts,
  updateProductQuantity,
} from "../redux/actions/productActions";
import axios from "axios";
import Loading from "./Loading";

function Checkout({
  isOpen,
  setIsOpen,
  setOutOfStockChecker,
  outOfStockChecker,
}) {
  const location = useLocation();
  const [loadingOpen, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [shippingCharges, setCharges] = useState(49);
  const calculateShipping = (price) => {
    
    if (price >= 1000) {
      setCharges(0);
    } else {
      setCharges(49);
    }
  };

  const cart = useSelector((state) => state.allProducts.cart);

  // const allProducts = useSelector((state) => state.allProducts.products);

  useEffect(() => {
    let total = 0;
    let totalMrp = 0;
    
    cart.forEach((item) => {
      totalMrp += item.price * item.qty;
      const diff = (item.price * item.discount) / 100;
      const finalPice = Math.round(item.price - diff);
      total += finalPice * item.qty;

    });
    setOrderTotal(total);
    setTotalMrp(totalMrp);

    calculateShipping(total);
    
  }, [cart]);
 

  const authenticateUser = async () => {
    try {
      const authenticateUser = await axios.get(
        "http://localhost:3001/authenticateUser",
        (axios.defaults.withCredentials = true)
      );
      if (authenticateUser.status === 200) {
        setButtonStatus(true);
      } else if (authenticateUser.status === 401) {
        setButtonStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAndUpdateQuantity=async(itemId)=>{

    const productStockValue = await axios.post("http://localhost:3001/stockchecker", {
          productId: itemId,
        });
    const quan=dispatch(updateProductQuantity(itemId,productStockValue.data.quantity)).then(()=>{
        return productStockValue.data.quantity;
      })
return quan;
  }
  const latestStockData =async (callback)=> {
    console.log("first inside fucntion");
    let checker=false;

      for(let i=0;i<cart.length;i++)
      {
        const product = cart[i];
     const productLatestStock= await getAndUpdateQuantity(product._id);
    if(productLatestStock===0 || productLatestStock<product.qty)
    {
      checker=true;
      setOutOfStockChecker(true);
    }
  
      }
      if(checker===false)
      {
        setOutOfStockChecker(false);
      }
   callback();
  };
  const checkingFunction=()=>{
    if(outOfStockChecker===false)
    {
      history.push("/address");
    }
    else{
    
      alert("Some items in your cart might be out of stock");
    }
  }

  useEffect(() => {
    authenticateUser();
    latestStockData(function(){
      console.log("data fetched");
    });
    // dispatch(setProducts());
  }, []);
  const stockChecker =() => {
    try {
      latestStockData(function(){

        console.log("running after");
        checkingFunction();
      });

    } catch (error) {
      console.log(error);
      if (error.response) {
      }
    }
  };

  const guestCheckout = () => {
    dispatch(deleteSelectedAddress());
  };

  return (
    <>
      {Object.keys(cart).length === 0 ? (
        <EmptyContainer>
          <h1 style={{ fontWeight: `500` }}>Shopping Cart Is Empty!</h1>
          <img src={empty} width="300px"></img>
          <h2 style={{ fontWeight: `500` }}>Fill it with some goodies</h2>
          <Link to="/product">
            <button
              style={{
                height: `39px`,
                marginTop: `5px`,
                fontSize: `15px`,
                width: `100%`,
              }}
              className="button-36"
            >
              Shop Now
            </button>
          </Link>
        </EmptyContainer>
      ) : (
        <Wow>
          <Container>
            <CheckoutContainer>
              <CheckoutHeading>
                <h4 style={{ margin: `0px` }}>
                  My Shopping Cart ({Object.keys(cart).length})
                </h4>
                <h4 style={{ margin: `0px` }}>Total Price: ₹ {orderTotal} </h4>
              </CheckoutHeading>
              <Loading open={loadingOpen} />
              {cart.map((item, index) => {
                const calculate = () => {
                  const diff = (item.price * item.discount) / 100;
                  const finalPice = Math.round(item.price - diff);
                  return finalPice * item.qty;
                };
                return (
                  <CartDetails key={item._id}>
                    {item.quantity === 0 || item.quantity < item.qty ? (
                      <h5 className="outofstock">
                        This product is out of Stock!!!
                      </h5>
                    ) : undefined}
                    <div
                      style={{
                        display: `flex`,
                        alignItems: `center`,
                        marginBottom: `30px`,
                        width: `100%`,
                      }}
                      key={index}
                    >
                      <div>
                        <Link to={`/product/${item._id}`}>
                          <img
                            style={{ borderRadius: `10px` }}
                            src={item.images[0]}
                            width="170px"
                            height="170px"
                          ></img>
                        </Link>
                      </div>
                      <div className="cartDetails">
                        <div style={{ position: `relative` }}>
                          {item.name}

                          <ClearIcon
                            onClick={() =>
                              dispatch(removeFromCart(item._id, item.size))
                            }
                            style={{ fontSize: `14px`, cursor: `pointer` }}
                            className="deleteItemFromCart"
                          />
                        </div>
                        <div style={{ color: `#bfbfbf` }}>{item.category}</div>

                        <div className="quantity buttons_added">
                          <div>
                            <h5 style={{ color: `#757779` }}>Qty </h5>
                          </div>
                          <div>
                            <input
                              onClick={
                                item.qty === 1
                                  ? null
                                  : () =>
                                      dispatch(
                                        decreaseCartQuantity(
                                          item._id,
                                          item.size
                                        )
                                      )
                              }
                              type="button"
                              value="-"
                              className="minus"
                            />
                            <input
                              type="number"
                              step="1"
                              min="1"
                              max=""
                              name="quantity"
                              value={item.qty}
                              title="Qty"
                              className="input-text qty text"
                              size="2"
                              pattern=""
                              inputmode=""
                            />
                            <input
                              type="button"
                              onClick={() =>
                                dispatch(
                                  increaseCartQuantity(item._id, item.size)
                                )
                              }
                              value="+"
                              className="plus"
                            />
                          </div>
                        </div>
                        <div style={{ color: `#bfbfbf`, fontSize: `14px` }}>
                          Size: {item.size}
                        </div>
                        <div
                          style={{
                            marginTop: `15px`,
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `space-between`,
                          }}
                        >
                          <div style={{ fontSize: `16px`, fontWeight: `600` }}>
                            <span>₹ {calculate()}</span>
                            <span
                              style={{
                                textDecoration: `line-through`,
                                color: `#bfbfbf`,
                                marginLeft: `15px`,
                              }}
                            >
                              ₹ {item.price * item.qty}
                            </span>
                          </div>
                          <div
                            style={{
                              fontSize: `13px`,
                              fontWeight: `500`,
                              color: `#673FD7`,
                            }}
                          >
                            Move to wishlist
                          </div>
                        </div>
                      </div>
                    </div>
                  </CartDetails>
                );
              })}
            </CheckoutContainer>
            <OrderSummary>
              <OrderDetails>
                <CouponSection>
                  <h4>Discount Coupon</h4>
                  <button
                    style={{
                      height: `30px`,
                      padding: `4px`,
                      marginTop: `5px`,
                      fontSize: `14px`,
                      width: `30%`,
                    }}
                    className="button-36"
                  >
                    APPLY
                  </button>
                </CouponSection>
                <h4>Order Summary</h4>
                <PriceSection>
                  <span
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <p style={{ margin: `0px` }}>Total MRP</p>
                    <p style={{ margin: `0px` }}>₹ {totalMrp}</p>
                  </span>
                  <span
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <p style={{ margin: `0px` }}>Product Discount</p>
                    <p style={{ margin: `0px`, color: `#673FD7` }}>
                      ₹ -{totalMrp - orderTotal}
                    </p>
                  </span>
                  <span
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <p style={{ margin: `0px` }}>Subtotal</p>
                    <p style={{ margin: `0px` }}>₹ {orderTotal}</p>
                  </span>
                  <span
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                    }}
                  >
                    <p style={{ margin: `0px` }}>Shipping Charges</p>
                    <p style={{ margin: `0px`, color: `#673FD7` }}>
                      {shippingCharges === 0
                        ? "Free"
                        : `₹   ${shippingCharges}`}
                    </p>
                  </span>
                  <span
                    style={{
                      display: `flex`,
                      alignItems: `center`,
                      justifyContent: `space-between`,
                      marginTop: `10px`,
                    }}
                  >
                    <h4 style={{ margin: `0px`, fontWeight: `500` }}>Total</h4>
                    <h4 style={{ margin: `0px`, fontWeight: `500` }}>
                      ₹ {orderTotal + shippingCharges}
                    </h4>
                  </span>
                  <span
                    style={{
                      display: `flex`,
                      flexDirection: `column`,
                      alignItems: `center`,
                      justifyContent: `center`,
                      marginTop: `5px`,
                    }}
                  >
                    {buttonStatus ? (
                      <Link
                        onClick={stockChecker}
                        className="button-36"
                        style={{
                          height: `38px`,
                          padding: `4px`,
                          fontSize: `17px`,
                          width: `70%`,
                          textDecoration: `none`,
                        }}
                        to="#"
                      >
                        Continue Checkout
                      </Link>
                    ) : (
                      <button
                        onClick={() => setIsOpen(true)}
                        style={{
                          height: `38px`,
                          padding: `4px`,
                          fontSize: `17px`,
                          width: `70%`,
                        }}
                        className="button-36"
                      >
                        Login & Checkout
                      </button>
                    )}
                    {outOfStockChecker ? (
                      <Link
                        onClick={() =>
                          alert("Some items in your cart is out of stock")
                        }
                        className="button-36"
                        style={{
                          height: `38px`,
                          padding: `4px`,
                          fontSize: `17px`,
                          width: `70%`,
                          textDecoration: `none`,
                        }}
                        to="#"
                      >
                        Guest Checkout
                      </Link>
                    ) : (
                      <Link
                        onClick={guestCheckout}
                        className="button-36"
                        style={{
                          height: `38px`,
                          padding: `4px`,
                          fontSize: `17px`,
                          width: `70%`,
                          textDecoration: `none`,
                        }}
                        to="/address"
                      >
                        Guest Checkout
                      </Link>
                    )}
                  </span>
                </PriceSection>
              </OrderDetails>
            </OrderSummary>
          </Container>
        </Wow>
      )}
    </>
  );
}

export default Checkout;

const CheckoutContainer = styled.div`
  border-right: 1px solid #999999;

  padding: 5px;
  width: 70%;
  position: relative;
`;
const EmptyContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const CouponSection = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #999999;
`;
const PriceSection = styled.div``;
const CartDetails = styled.div`
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 94%;
  position: relative;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  height: 180px;
  background-color: white;
`;
const OrderDetails = styled.div`
  border-radius: 8px;
  margin: 10px;
  padding: 10px;
  width: 90%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  height: 400px;
  background-color: white;
`;
const CheckoutHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 15px;
  margin-left: 15px;
`;

const OrderSummary = styled.div`
  margin-top: 15px;
  padding: 10px;
  width: 30%;
`;

const Container = styled.div`
  width: 75%;
  min-height: 80vh;
  margin: 10px auto;
  padding: 20px 0px;
  display: flex;
`;

const Wow = styled.body`
  background-color: #f6f7f8;
  height: 100%;
`;
