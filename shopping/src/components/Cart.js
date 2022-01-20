import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from 'axios'
import styled, { keyframes } from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import {Link} from "react-router-dom"
import empty from "../photos/empty.jpg"
import { CSSTransition } from "react-transition-group";
import {
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart,
} from "../redux/actions/productActions";
import { style } from "@mui/system";

function Cart({ cartCount, cartOpen, cartClose }) {
  const dispatch = useDispatch();
  const [orderTotal, setOrderTotal] = useState(0);
  const cart = useSelector((state) => state.allProducts.cart);

  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      const diff = (item.price * item.discount) / 100;
      const finalPice = Math.round(item.price - diff);
      total += finalPice * item.qty;
    });
    setOrderTotal(total);
    updateItemsInCart();
  }, [cart]);

  const updateItemsInCart=async()=>{
 const res=await axios.post("http://localhost:3001/savetocart",cart);
  }
  

  if (!cartOpen) return null;
  return (
    <>
      <Overlay onClick={cartClose}></Overlay>
    
        
    
      <CartContainer>
        <Close>
          <CancelIcon fontSize="large" onClick={cartClose} />
        </Close>
        {
            Object.keys(cart).length===0 ?
            <EmptyContainer>
                <h3>Your cart is empty</h3>
                <img src={empty} width="300px"></img>
                <h3>Fill it with some goodies</h3>
                <Link to="/product"><button style={{height:`39px`,marginTop:`5px`,fontSize:`15px`,width:`100%`}} className="button-36">Shop Now</button></Link>
            </EmptyContainer>
            :
            <>
        <h3>CART ITEMS: {cartCount}</h3>
        <InsideContainer>
          {cart.map((item, index) => {
            const calculate = () => {
              const diff = (item.price * item.discount) / 100;
              const finalPice = Math.round(item.price - diff);
              return finalPice * item.qty;
            };
            return (
              <>
              
              <div
                style={{ display: `flex`,alignItems:`center`, marginBottom: `30px`, width: `100%`,position:`relative` }}
                key={index}
              >
                {
                          (item.quantity===0 || item.quantity<item.qty) ?
                          <h5 className="outofstockincart">This product is out of Stock!!!</h5>
                        :
                        undefined}
                <div>
                  <Link onClick={cartClose} to={`/product/${item._id}`}>
                  <img
                    style={{ borderRadius: `10px` }}
                    src={item.images[0]}
                    width="150px"
                    height="150px"
                  ></img>
                  </Link>
                </div>
                <div className="cartDetails">
                  <div style={{ position: `relative` }}>
                    {item.name}

                    <ClearIcon
                    onClick={()=>dispatch(removeFromCart(item._id,item.size))}
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
                            : () => dispatch(decreaseCartQuantity(item._id,item.size))
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
                        onClick={() => dispatch(increaseCartQuantity(item._id,item.size))}
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
                      Rs.      {calculate()}
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
              </>
            );
          })}
        </InsideContainer>

        <OrderSubtotal>
          <h3 style={{ color: `#262626`, margin: `0px` }}>Subtotal :</h3>
          <h4>Rs. {orderTotal}</h4>
        </OrderSubtotal>
        <Link onClick={cartClose} to='/cart'>
          <button style={{height:`39px`,margin:`0px 0px`,fontSize:`15px`,width:`100%`}} className="button-36">Checkout</button></Link>
        </>
}
      </CartContainer>
    </>
  );
}

export default Cart;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99999;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  `;

  const slideInRight = keyframes`
    from {
      transform: translateX(400px);
    }
  
    to {
      transform:translateX(0px);
    }
  `;
const EmptyContainer=styled.div`
display: flex;
height: 100%;
align-items: center;
flex-direction: column;
justify-content: center;
`


const OrderSubtotal = styled.div`
  position: relative;
  top: -10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  height: 25px;
  background-color: #f8f8f8;
  
`;
const InsideContainer = styled.div`
  height: 550px;
  padding:20px 0px;

  width: 100%;
  
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;
const CartContainer = styled.div`
  z-index: 999999;
  position: fixed;
  padding: 10px;
  top: 0;
  right: 0;
  height: 100%;
  width: 370px;
  background-color: white;
  animation: ${slideInRight} 0.2s ease;
  border-left: 1px solid black;
`;

const Close = styled.div`
  position: absolute;
  z-index: 999999;
  top: 50%;
  left: -40px;
  cursor: pointer;
`;
