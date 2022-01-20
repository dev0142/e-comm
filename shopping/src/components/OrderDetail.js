import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  loadCurrentOrderDetails,
  removeCurrentOrderDetails,
} from "../redux/actions/productActions";

function OrderDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.allProducts.products);
  const order = useSelector((state) => state.user.selected_order);
  console.log(order);

  useEffect(() => {
    if (id && id !== "") {
      dispatch(loadCurrentOrderDetails(id));
    }
    return () => {
      dispatch(removeCurrentOrderDetails());
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainContainer>
      <div>
        <ul style={{ padding: `8px 8px` }} className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/account/orders">My Orders</Link>
          </li>
          <li>
            <Link to={`/orders/${id}`}>Order Details</Link>
          </li>
        </ul>
      </div>

        {Object.keys(order).length === 0 ? (
            <>Loading</>
            ) : 
            (
                <>
    <OrderSummary>
        <AddressSection>
                          <div>
                            <div
                              style={{
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `space-between`,
                              }}
                            >
                              <h3 style={{ margin: `0px`, fontWeight: `500` }}>
                                {order.contactname}
                              </h3>
                             
                            </div>
                            <p>
                              {order.address}
                            </p>
                            <h4
                              style={{
                                fontWeight: `500`,
                                fontSize: `14.5px`,
                                marginBottom: `0px`,
                              }}
                            >
                              Email: {order.contactemail}
                            </h4>
                            <h4
                              style={{
                                fontWeight: `500`,
                                margin: `0px`,
                                fontSize: `14.5px`,
                              }}
                            >
                              Mobile: {order.contactnumber}
                            </h4>
                            </div>

        </AddressSection>
<PriceSection>
<span
                  style={{
                    display: `flex`,
                    alignItems: `center`,
                    justifyContent: `space-between`,
                  }}
                >
                  <p style={{ margin: `0px` }}>Total MRP</p>
                  <p style={{ margin: `0px` }}>
                    ₹ {order.orderSummary.totalMrp}
                  </p>
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
                    ₹ -{order.orderSummary.totalMrp - order.orderSummary.subTotal}
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
                  <p style={{ margin: `0px` }}>
                    ₹ {order.orderSummary.subTotal}
                  </p>
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
                    {order.orderSummary.shippingCharges === 0
                      ? "Free"
                      : `₹   ${order.orderSummary.shippingCharges}`}
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
                  <h3 style={{ margin: `0px`, fontWeight: `600` }}>
                    Grand Total
                  </h3>
                  <h3 style={{ margin: `0px`, fontWeight: `600` }}>
                    ₹ {order.orderSummary.total}
                  </h3>
                </span>
                <span
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    justifyContent: `center`,
                    marginTop: `5px`,
                  }}
                ></span>

</PriceSection>
<OtherSection>
    <h3>Payment method</h3>
    <p>Razorpay or COD</p>

</OtherSection>
    </OrderSummary>
      <OrderDetails>
      <h3 style={{fontWeight:`600`}}>Items({order.items.length})</h3>
          {
            order.items.map((product, index) => {
            const productStatus = productList.find(
              (prod) => prod._id === product.productid
            );
            console.log(productStatus);
            const diff = (product.productprice * product.productdiscount) / 100;
            const originalPrice = Math.round(product.productprice - diff);

            if (productStatus !== undefined)
              return (
                <>
                  <OrderItems>
                    <div
                      style={{
                        display: `flex`,
                        alignItems: `start`,
                      
                      }}
                    >
                      <img
                        src={productStatus.images[0]}
                        height="120px"
                        width="130px"
                      ></img>
                      <div style={{ margin: `6px` }}>
                        <h4
                          style={{
                            fontWeight: `500`,
                            width: `200px`,
                            margin: `0`,
                            textTransform: `capitalize`,
                            wordWrap: `break-word`,
                            overflowWrap: `break-word`,
                            textOverflow: ` ellipsis`,
                            whiteSpace: `nowrap`,
                            overflow: `hidden`,
                          }}
                        >
                          {productStatus.name}
                        </h4>
                        <h5
                          style={{
                            fontWeight: `500`,
                            margin: `0`,
                            color: `#8c8c8c`,
                          }}
                        >
                          {productStatus.category}
                        </h5>

                        <p
                          style={{
                            marginBottom: `0px`,
                            color: `#595959`,
                            fontSize: `13px`,
                          }}
                        >
                          Size: {product.productsize}
                        </p>
                      </div>
                    </div>
                    <h3
                      style={{
                        fontWeight: `600`,
                        color: `#262626`,
                      
                      }}
                    >
                       x {product.productquantity}
                    </h3>
                    <button 
                    style={{
                        margin: `0px`,
                        height: `2px`,
                        width: `100px`,
                        borderColor: `#333333`,
                        padding: `3px`,
                        minHeight: `45px`,
                        borderRadius: `6px`,
                        fontSize: `15px`,
                      }}
                    className="button-28">
                        Track order
                    </button>
                  </OrderItems>
                </>
              );
            else {
              return <h4>Unable to fetch product Details</h4>;
            }
          })
        }
        </OrderDetails>
        </> )
    }
    </MainContainer>
  );
}

export default OrderDetail;

const MainContainer = styled.div`
  border: 1px solid #E7E7E7;
  margin: 20px auto;
  width: 70%;
  height: 100vh;
`;

const OrderDetails = styled.div`
margin: 10px auto;
width: 70%;

`;
const OrderSummary=styled.div`
display: flex;
border: 1px solid #E7E7E7;

`

const AddressSection=styled.div`
width: 33%;
  margin: 10px 20px 10px 0px;
  padding: 20px 10px 10px 10px;
  height: auto;
  background-color: white;
  
  p {
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 13.5px;
  }

 border-right:1px solid #E7E7E7;
`

const PriceSection=styled.div`

width: 30%;
  text-align: right;
  margin: 25px 10px 10px 10px;
  padding: 10px;
  border-right:1px solid #E7E7E7;
`
const OtherSection=styled.div`
width: 30%;

margin: 25px 5px 5px 10px;
`

const OrderItems = styled.div`
  display: flex;
  width: 100%;
  border-radius: 6px;
margin: 10px 0px;
  height: 120px;
  align-items: center;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  justify-content: space-between;
`;
