import React,{useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import accept from "../../photos/accept.png";
import shipped from "../../photos/fast-delivery.png";
import delivery from "../../photos/delivery.png";
import delivered from "../../photos/delivered.png";
import { setOrdersList } from "../../redux/actions/productActions";

function Orders() {
  const history = useHistory();
  const dispatch=useDispatch();
  const status=useRef(null);
  const ordersList = useSelector((state) => state.user.orders);
  const productList = useSelector((state) => state.allProducts.products);
  const urlPath = window.location.href.split("/");
  

  const showOrderDetails = (id) => {
    history.push(`/orders/${id}`);
  };

  useEffect(() => {
   dispatch(setOrdersList())
  }, []);
  

  return (
    <>
      {ordersList.map((item, index) => {
        
        if(index===1)
        {
          console.log("i am running");
          console.log(status.current);
         
        }
        
        return (
          <OrdersContainer key={index} index={index}>
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
              }}
            >
              <h5 style={{ margin: `10px` }}>#Payment Mode: COD</h5>
              <h5 style={{ margin: `10px` }}> #Order-No: {item.orderid}</h5>
            </div>
            <OrderTracker>
              <div className="orderline-cont">
                <div className="info">Ordered</div>
                <div className={item.orderStatus==="processing" ? "request-loader" : "before-request-loader"}>
                  <img src={accept} width="40px" height="40px"></img>
                </div>
                <div className="info">{item.orderDate}</div>
              
              </div>
              <div ref={status} className={item.orderStatus==="shipped" || item.orderStatus==="out" || item.orderStatus==="delivered" ? 'orderline' : 'before-orderline'}></div>
              <div className="orderline-cont">
                <div className="info">Shipped</div>
                <div className={item.orderStatus==="shipped" ? 'request-loader':"before-request-loader"}>
                  <img src={shipped} width="45px" height="45px"></img>
                </div>
                <div className="info">
                  <span></span>
                </div>
              </div>

              <div className={ item.orderStatus==="out" || item.orderStatus==="delivered" ? 'orderline' : 'before-orderline'}></div>
              <div className="orderline-cont">
                <div className="info">Out for Delivery</div>
                <div className={item.orderStatus==="out" ? 'request-loader':"before-request-loader"}>
                  <img src={delivery} width="45px" height="45px"></img>
                </div>
                <div className="info">
                  <span></span>
                </div>
              </div>
              <div className={item.orderStatus==="delivered" ? 'orderline' : 'before-orderline'}></div>

              <div className="orderline-cont">
                <div className="info">Delivered</div>
                <div className={ item.orderStatus==="delivered" ? 'before-request-loader':"before-request-loader"}>
                  <img src={delivered} width="45px" height="45px"></img>
                </div>
                <div className="info">
                  <span></span>
                </div>
              </div>
            </OrderTracker>
            {item.items.map((product, index) => {
              const productStatus = productList.find(
                (prod) => prod._id === product.productid
              );
             
              const diff =
                (product.productprice * product.productdiscount) / 100;
              const originalPrice = Math.round(product.productprice - diff);

              if (productStatus !== undefined)
                return (
                  <>
                    <OrderItems>
                      <div style={{ display: `flex`, alignItems: `start` }}>
                        <img
                          src={productStatus.images[0]}
                          height="100px"
                          width="130px"
                        ></img>
                        <div style={{ margin: `6px` }}>
                          <h4
                            style={{
                              fontWeight: `500`,
                              width: `120px`,
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
                      <h4 style={{ fontWeight: `700`, color: `#262626` }}>
                        Rs. {originalPrice} x {product.productquantity}
                      </h4>

                      <button
                        onClick={() => showOrderDetails(item.orderid)}
                        style={{
                          margin: `0px`,
                          height: `2px`,
                          width: `80px`,
                          borderColor: `#333333`,
                          padding: `2px`,
                          minHeight: `35px`,
                          borderRadius: `6px`,
                          fontSize: `12px`,
                        }}
                        className="button-28"
                      >
                        <span style={{ height: `8px`, fontSize: `12px` }}>
                          View Details
                        </span>
                      </button>
                    </OrderItems>
                  </>
                );
              else {
                return <h4>Unable to fetch product Details</h4>;
              }
            })}
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `space-between`,
                width: `83%`,
                margin: `0 auto`,
              }}
            >
              <div>
                <p style={{ margin: `9px` }}>
                  Loved the product? Help us write review
                </p>
                <p style={{ margin: `9px` }}>Track your Order</p>
                <p style={{ margin: `9px` }}>Need help?</p>
              </div>
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
                    ₹ {item.orderSummary.totalMrp}
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
                    ₹ -{item.orderSummary.totalMrp - item.orderSummary.subTotal}
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
                    ₹ {item.orderSummary.subTotal}
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
                    {item.orderSummary.shippingCharges === 0
                      ? "Free"
                      : `₹   ${item.orderSummary.shippingCharges}`}
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
                    ₹ {item.orderSummary.total}
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
            </div>
          </OrdersContainer>
        );
      })}
    </>
  );
}

export default Orders;

const OrdersContainer = styled.div`
  width: 90%;
  height: auto;
  padding: 10px;
  background-color: white;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  margin: 20px auto;
  border-radius: 6px;
`;

const PriceSection = styled.div`
  width: 30%;
  text-align: right;
  margin: 25px 10px 10px 10px;
`;

const OrderItems = styled.div`
  display: flex;
  width: 80%;
  border-radius: 6px;
  margin: 15px auto;
  height: 100px;
  align-items: center;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  justify-content: space-between;
`;

const OrderTracker = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  justify-content: center;
  margin-top: 30px;
`;
