import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  setAddressList,
  deleteAddressFromList,
} from "../../redux/actions/productActions";

function UserAddress() {

    const dispatch = useDispatch();

    const addressList = useSelector((state) => state.user.address);
  
  
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
    
  
    useEffect(() => {
      // authenticateUser();
      dispatch(setAddressList());
    }, []);

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
          console.log(error);
        }
      };



    return (
        <>
        <AddressContainer>
              {!open ? (
                <>
                  
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
                      

                      return (
                        <ListOfAddress
                          style={{
                        
                            cursor: `pointer`,
                          }}
                          
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
                                
                                  <CheckCircleOutlineIcon />
                                
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
                      <div style={{ width: `73.5%` }}>
                        <div style={{ width: `90%`, marginLeft: `0px` }}>
                          <input
                            
                            value={address.contactemail}
                            onChange={handleInput}
                            type="text"
                            name="contactemail"
                          ></input>
                          <label>Enter your email *</label>
                        </div>
                        <div style={{ width: `90%`, marginLeft: `0px` }}>
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
                        <div style={{ width: `90%`, marginLeft: `0px` }}>
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
             <span
             style={{
                 width: `50%`,
                 margin: `5px auto`,
                 display: `flex`,
                 flexDirection: `column`,
                 alignItems: `center`,
                 justifyContent: `center`,
                
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
             ) :undefined}
           </span>
             </AddressContainer>
           </>
    )
}

export default UserAddress
const AddContainer = styled.div`
  margin-top: 20px;
  margin-left:30px;
  form {
    display: flex;
    flex-wrap: wrap;

    div {
      width: 30%;
      position: relative;
      display: flex;
      flex-direction: column;
      margin: 10px 2.5px 20px 5px;

      label {
        font-size: 14px;
        background-color: #F8F8F8;
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
        width: 85%;
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
  
`;

const AddressAdd = styled.div`
  width: 33%;
  margin: 15px;
  padding: 5px 15px;
  height: 250px;
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
  width: 33%;
  margin: 15px;
  padding: 5px 15px;
  height: 250px;
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

const AddressContainer = styled.div`
  height: auto;
  
  padding: 20px;
`;