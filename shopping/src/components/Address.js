import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  setAddressList,
  deleteAddressFromList,
  selectedAddress,
  deleteSelectedAddress,
  clearAllItemsInCart,
  updateProductQuantity
} from "../redux/actions/productActions";

function Address({outOfStockChecker,setOutOfStockChecker}) {
  const dispatch = useDispatch();
  const history= useHistory();
  const addressList = useSelector((state) => state.user.address);
  const selected_add = useSelector((state) => state.user.selected_address);
  const allProducts = useSelector((state) => state.allProducts.products);

  const cart = useSelector((state) => state.allProducts.cart);
  const [address, setAddress] = useState({
    id: "",
    contactname: "",
    contactemail: "",
    contactnumber: undefined,
    pincode: undefined,
    street1: "",
    street2: "",
    landmark: "",
    city: "",
    state: "",
    type: "",
  });

  let items;
  let value;
  const handleInput = (e) => {
    items = e.target.name;
    value = e.target.value;
    setAddress({ ...address, [items]: value });
  };

  const [userAuth, setUserAuth] = useState(false);

  const [open, setOpen] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const [shippingCharges, setCharges] = useState(49);
  const calculateShipping = (price) => {
    console.log(price);
    if (price >= 1000) {
      setCharges(0);
    } else {
      setCharges(49);
    }
  };
  
  useEffect(() => {
    // authenticateUser();
    dispatch(setAddressList());
    cart.forEach(async(product)=>{

      const res=await axios.post("http://localhost:3003/stockchecker",{productId:product._id});
      if(res.status===200)
      {
        dispatch(updateProductQuantity(product._id,res.data.quantity));
      }
    })
  }, []);

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

  useEffect(() => {
    let checker=false;
    cart.forEach((item) => {
      
        
        if(item.quantity===0 || item.quantity<item.qty)
        {
          checker=true;
          
          setOutOfStockChecker(true);
        }
        
      });
     
      if(checker===false)
      {
        setOutOfStockChecker(false);
      }
  }, [allProducts])

  const handleAddressInput = async (e) => {
    try {
      e.preventDefault();

      if (addressList.find((add) => add._id === address.id)) {
        const response = await axios.post(
          "http://localhost:3001/updateaddress",
          address,
          (axios.defaults.withCredentials = true)
        );
        if (response.status === 200) {
          setOpen(false);
          dispatch(setAddressList());

          setAddress({
            contactname: "",
            contactemail: "",
            contactnumber: undefined,
            pincode: undefined,
            street1: "",
            street2: "",
            landmark: "",
            city: "",
            state: "",
            type: "",
            id: "",
          });
        }
      } else {
        const res = await axios.post(
          "http://localhost:3001/address",
          address,
          (axios.defaults.withCredentials = true)
        );
        if (res.status === 200) {
          setOpen(false);
          dispatch(setAddressList());
          setAddress({
            contactname: "",
            contactemail: "",
            contactnumber: undefined,
            pincode: undefined,
            street1: "",
            street2: "",
            landmark: "",
            city: "",
            state: "",
            type: "",
            id: "",
          });
        }
        else if(res.status===205){
          setOpen(false);
          
          dispatch(setAddressList(address));
    
        }
      }
    } catch (error) {
      // if(error.response)
      // {
      //   if(error.response.status===205)
      //   {
      //     console.log("wow you are so good at programming");
      //   }
      // }
    }
  };

  useEffect(() => {
    if (addressList.length !== 0) {
      dispatch(selectedAddress(addressList[addressList.length - 1]._id));
    }
    else{
      console.log("wow dont run this function");
    }
  }, [addressList]);

  const orderProceed = async () => {
    try {
     
      if (
        addressList.includes(selected_add) === false ||
        Object.keys(selected_add).length=== 0
      ) 
      {
        alert("please select/add an address to continue");
        
      }
      else if(cart.length===0)
      {
        alert("Your cart is empty please add items to your cart");
      }
      else if(outOfStockChecker===true)
      {
        
        alert("Some items in your cart is out of stock")
      } 
      
      else {
        const res = await axios.post(
          "http://localhost:3001/order",
          {
            orderItems: cart,
            addressDetails: selected_add,
            orderSummary:{
              totalMrp:totalMrp,
              productDiscount:-(totalMrp - orderTotal),
              subTotal:orderTotal,
              shippingCharges:shippingCharges,
              total:orderTotal+shippingCharges
            }
          },
          (axios.defaults.withCredentials = true)
        );
        if (res.status === 200) {
          history.push("/order-success");
          dispatch(clearAllItemsInCart());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      
        <Wow>
          <div>
            <div style={{ height: `110px` }}></div>
          </div>
          <Navigation>
            <div>
              <ul className="breadcrumbCart">
                <li>
                  <Link
                    style={{ textDecoration: `none`, color: `white` }}
                    to="/cart"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: `none`, color: `white` }}
                    to="/address"
                  >
                    Address
                  </Link>
                </li>
                <li>
                  <Link
                    style={{ textDecoration: `none`, color: `white` }}
                    to="#"
                    onClick={(event) => event.preventDefault()}
                  >
                    Payment
                  </Link>
                </li>
              </ul>
            </div>
          </Navigation>
          <MainCont>
            <AddressContainer>
              {!open ? (
                <>
                  <h3 style={{ fontSize: `17px`, margin: `0` }}>
                    Select Shipping Address
                  </h3>
                  <AddressList>
                    {addressList.map((item, index) => {
                      const editTheAddress = (e, id) => {
                        e.stopPropagation();
                        setOpen(true);
                        const addressEdit = addressList.find(
                          (add) => add._id === id
                        );
                        if (addressEdit) {
                          setAddress({
                            contactname: addressEdit.contactname,
                            contactemail: addressEdit.contactemail,
                            contactnumber: addressEdit.contactnumber,
                            pincode: addressEdit.pincode,
                            street1: addressEdit.street1,
                            street2: addressEdit.street2,
                            landmark: addressEdit.landmark,
                            city: addressEdit.city,
                            state: addressEdit.state,
                            type: addressEdit.type,
                            id: addressEdit._id,
                          });
                        }
                      };

                      const removeTheAddress = (e, id) => {
                        e.stopPropagation();

                        dispatch(deleteAddressFromList(id));
                        
                        if (selected_add._id === id) {
                          dispatch(deleteSelectedAddress());
                        }
                        setAddress({
                          contactname: "",
                          contactemail: "",
                          contactnumber: undefined,
                          pincode: undefined,
                          street1: "",
                          street2: "",
                          landmark: "",
                          city: "",
                          state: "",
                          type: "",
                          id: "",
                        });
                      };
                      const selectTheAddress = (e, id) => {
                        console.log("parent");
                        dispatch(selectedAddress(id));
                      };

                      return (
                        <ListOfAddress
                          style={{
                            border:
                              selected_add._id === item._id
                                ? `2px solid #01447E`
                                : undefined,
                            cursor: `pointer`,
                          }}
                          onClick={(e) => selectTheAddress(e, item._id)}
                          key={item._id}
                        >
                          <div>
                            <div
                              style={{
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `space-between`,
                              }}
                            >
                              <h3 style={{ margin: `0px`, fontWeight: `500` }}>
                                {item.contactname}
                              </h3>
                              <pre
                                style={{
                                  border: `1px solid black`,
                                  padding: `4px`,
                                  borderRadius: `10px`,
                                  outline: `none`,
                                }}
                              >
                                {item.type}
                              </pre>
                            </div>
                            <p>
                              {item.street1 +
                                "," +
                                item.street2 +
                                "," +
                                item.landmark +
                                "," +
                                item.city +
                                "," +
                                item.state +
                                "," +
                                item.pincode}
                            </p>
                            <h4
                              style={{
                                fontWeight: `500`,
                                fontSize: `14.5px`,
                                marginBottom: `0px`,
                              }}
                            >
                              Email: {item.contactemail}
                            </h4>
                            <h4
                              style={{
                                fontWeight: `500`,
                                margin: `0px`,
                                fontSize: `14.5px`,
                              }}
                            >
                              Mobile: {item.contactnumber}
                            </h4>

                            <div
                              style={{
                                display: `flex`,
                                width: `100%`,
                                alignItems: `center`,
                                justifyContent: `space-between`,
                              }}
                            >
                              <div
                                style={{
                                  display: `flex`,
                                  width: `40%`,
                                  alignItems: `center`,
                                  justifyContent: `space-between`,
                                }}
                              >
                                <h5
                                  style={{ cursor: "pointer", margin: `2px` }}
                                  onClick={(e) => removeTheAddress(e, item._id)}
                                >
                                  Remove
                                </h5>
                                <h5
                                  onClick={(e) => editTheAddress(e, item._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  Edit
                                </h5>
                              </div>
                              <div>
                                {selected_add._id === item._id ? (
                                  <CheckCircleIcon
                                    style={{ color: `#01447E` }}
                                  />
                                ) : (
                                  <CheckCircleOutlineIcon />
                                )}
                              </div>
                            </div>
                          </div>
                        </ListOfAddress>
                      );
                    })}
                    <AddressAdd>
                      <AddCircleIcon
                        onClick={() => setOpen(true)}
                        style={{ fontSize: `39px` }}
                      />
                      <h4>Add your address</h4>
                    </AddressAdd>
                  </AddressList>
                </>
              ) : (
                <AddContainer>
                  <form
                    method="POST"
                    id="eventForm"
                    encType="multipart/form-data"
                  >
                    <>
                      <div>
                        <input
                          value={address.contactname}
                          onChange={handleInput}
                          type="text"
                          autoComplete="off"
                          id="eventName"
                          name="contactname"
                        />
                        <label>Enter name *</label>
                      </div>

                      <div>
                        <input
                          value={address.contactnumber}
                          onChange={handleInput}
                          type="number"
                          name="contactnumber"
                        ></input>
                        <label>Enter Phone number *</label>
                      </div>
                      <div style={{ width: `90%` }}>
                        <div style={{ width: `90%`, marginLeft: `0px` }}>
                          <input
                            style={{ width: `95%` }}
                            value={address.contactemail}
                            onChange={handleInput}
                            type="text"
                            name="contactemail"
                          ></input>
                          <label>Enter your email *</label>
                        </div>
                        <div style={{ width: `95%`, marginLeft: `0px` }}>
                          <input
                            value={address.street1}
                            onChange={handleInput}
                            type="text"
                            name="street1"
                          ></input>
                          <label>
                            Address ( HouseNo, Building. Street, Area) *
                          </label>
                        </div>
                        <div style={{ width: `95%`, marginLeft: `0px` }}>
                          <input
                            value={address.street2}
                            onChange={handleInput}
                            type="text"
                            name="street2"
                          ></input>
                          <label>Colony, Sector, Street *</label>
                        </div>
                      </div>
                      <br />

                      <div>
                        <input
                          value={address.landmark}
                          onChange={handleInput}
                          type="text"
                          name="landmark"
                        ></input>
                        <label>Landmark *</label>
                      </div>
                      <div>
                        <input
                          value={address.pincode}
                          onChange={handleInput}
                          type="number"
                          name="pincode"
                        ></input>
                        <label>Enter your pincode *</label>
                      </div>

                      <div>
                        <input
                          value={address.city}
                          onChange={handleInput}
                          type="text"
                          name="city"
                        ></input>
                        <label>Enter City Name *</label>
                      </div>

                      <div>
                        <input
                          value={address.state}
                          onChange={handleInput}
                          type="text"
                          name="state"
                        ></input>
                        <label>Enter your State *</label>
                      </div>
                      <div>
                        <input
                          value={address.type}
                          onChange={handleInput}
                          type="text"
                          name="type"
                        ></input>
                        <label>Enter Address type *</label>
                      </div>
                    </>
                    <div></div>
                  </form>
                </AddContainer>
              )}
            </AddressContainer>
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
                    {open ? (
                      <>
                        <button
                          onClick={handleAddressInput}
                          style={{
                            height: `38px`,
                            padding: `4px`,
                            fontSize: `17px`,
                            width: `70%`,
                          }}
                          className="button-36"
                        >
                          Save Address
                        </button>
                        <button
                          style={{
                            height: `38px`,
                            padding: `4px`,
                            fontSize: `17px`,
                            width: `70%`,
                          }}
                          onClick={() => setOpen(false)}
                          className="button-36"
                        >
                          Go back
                        </button>
                      </>
                    ) : (
                      outOfStockChecker ?
                      <button
                        onClick={(e) => {
                        alert("Items in your cart is out of stock")
                      history.push("/cart")
                        }
                    }
                        style={{
                          height: `38px`,
                          padding: `4px`,
                          fontSize: `17px`,
                          width: `70%`,
                        }}
                        className="button-36"
                      >
                        Proceed with Checkout
                      </button>
                      :
                      <button
                        onClick={() => orderProceed()}
                        style={{
                          height: `38px`,
                          padding: `4px`,
                          fontSize: `17px`,
                          width: `70%`,
                        }}
                        className="button-36"
                      >
                        Proceed with Checkout
                      </button>
                    )}
                  </span>
                </PriceSection>
              </OrderDetails>
            </OrderSummary>
          </MainCont>
        </Wow>
      )
    </>
  );
}

export default Address;

const Navigation = styled.div`
  height: 40px;
  margin: 15px auto;
  width: 50%;
`;

const Wow = styled.body`
  background-color: #f6f7f8;
  min-height: 80vh;
`;
const AddContainer = styled.div`
  margin-top: 20px;
  form {
    display: flex;
    flex-wrap: wrap;

    div {
      width: 40%;
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 10px 2.5px 20px 5px;

      label {
        font-size: 14px;
        background-color: white;
        position: absolute;
        pointer-events: none;
        color: #262626;
        left: 12px;
        top: -12px;
        transition: 0.2s;
      }
      input {
        height: 22px;
        background-color: transparent;
        border: 1px solid #262626;
        font-weight: 500;
        font-size: 15px;
        width: 90%;
        &:-webkit-autofill,
        &:-webkit-autofill:focus {
          transition: background-color 600000s 0s, color 600000s 0s;
        }
        input[data-autocompleted] {
          background-color: transparent !important;
        }

        padding: 10px;
        border-radius: 6px;
        &:focus {
          border: 2px solid black;
          background-color: white;
        }
      }
    }
  }
`;
const AddressList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  justify-content: flex-start;
`;

const AddressAdd = styled.div`
  width: 40%;
  margin: 10px 40px 10px 0px;
  padding: 15px;
  height: 220px;
  background-color: white;
  border-radius: 5px;
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const ListOfAddress = styled.div`
  width: 40%;
  margin: 10px 20px 10px 0px;
  padding: 5px 15px;
  height: auto;
  background-color: white;
  border-radius: 5px;
  p {
    word-wrap: break-word;
    white-space: pre-wrap;
    font-size: 13.5px;
  }

  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const CouponSection = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #999999;
`;
const OrderDetails = styled.div`
  border-radius: 8px;
  margin: 0px 10px;
  padding: 15px;
  width: 90%;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  height: auto;
  background-color: white;
`;
const OrderSummary = styled.div`
  padding: 0px 8px;
  width: 32%;
`;
const PriceSection = styled.div``;
const AddressContainer = styled.div`
  width: 68%;
  height: auto;
  padding: 20px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 5px;
`;
const MainCont = styled.div`
  width: 70%;
  display: flex;
  margin: 0 auto;
  height: auto;
`;
