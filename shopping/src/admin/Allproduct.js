import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Allproduct() {
  const dispatch=useDispatch();
  const allProduct=useSelector(state=>state.allProducts.products);
  // const [allProduct, setAllProduct] = useState([
  //   {
  //     name: "",
  //     category: "",
  //     brand: "",
  //     description: "",
  //     quantity: null,
  //     price: null,
  //     discount: null,
  //     images: [null],
  //   },
  // ]);

  const [button, setButton] = useState(false);

  

  const deleteEvent = async (id) => {
    try {
      if (window.confirm("Are you sure want to delete this event")) {
        const res = await axios.delete(
          "https://bhoomihillsnaturalsbackend.herokuapp.com/delevent",
          { data: { id: id } }
        );

        if (res.status === 200) {
          alert("successfully deleted");
          window.location.reload(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(setProducts());
  }, []);

  const postData = (e) => {
    // e.currentTarget.lastChild.children[0].style.color="black";
    axios
      .post("https://bhoomihillsnaturalsbackend.herokuapp.com/edit", allProduct)
      .then((res) => {
        if (res.status === 200) {
          // alert("product updated successfully");
          // history.push("/products");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // useEffect(() => {
  //   postData();
  // }, [allProduct]);

  return (
    <div style={{ width: `100%` }}>
      <div className="heading">Product List</div>
      <hr />
      <table style={{ width: `100%` }}>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th>Action</th>
        </tr>
        {Object.keys(allProduct).length === 0 ? (
          <Loader>
            <LoadingFrame></LoadingFrame>
          </Loader>
        ) : (
          allProduct.map((product, index) => {
            const makeEditable = (e) => {
              e.target.contentEditable = "true";
            };
            const change = (e, named) => {
              let newArr = [...allProduct];
              if (named === "name") {
                newArr[index].name = e.target.innerHTML;
              } else if (named === "category") {
                newArr[index].category = e.target.innerHTML;
              } else if (named === "brand") {
                newArr[index].brand = e.target.innerHTML;
              } else if (named === "price") {
                newArr[index].price = e.target.innerHTML;
              } else if (named === "quantity") {
                newArr[index].quantity = e.target.innerHTML;
              } else if (named === "discount") {
                newArr[index].discount = e.target.innerHTML;
              }
              
              e.target.contentEditable = "false";
            };

            return (
              <tr key={index}>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e, "name")}
                  style={{ textAlign: `center` }}
                >
                  {product.name}
                </td>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e)}
                  style={{ textAlign: `center` }}
                >
                  <img
                    style={{ height: `60px`, width: `60px` }}
                    src={product.images[0]}
                    alt={product.name}
                  />
                </td>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e, "category")}
                  name="category"
                  style={{ textAlign: `center` }}
                >
                  {product.category}
                </td>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e, "brand")}
                  style={{ textAlign: `center` }}
                >
                  {product.brand}
                </td>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e, "price")}
                  style={{ textAlign: `center` }}
                >
                  {product.price}
                </td>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e, "quantity")}
                  style={{ textAlign: `center` }}
                >
                  {product.quantity}
                </td>
                <td
                  contentEditable="false"
                  onClick={(e) => makeEditable(e)}
                  onBlur={(e) => change(e, "discount")}
                  style={{ textAlign: `center` }}
                >
                  {product.discount}
                </td>
                <td
                  style={{
                    display: `flex`,
                    justifyContent: `space-evenly`,
                    alignItems: `center`,
                    marginTop: `20px`,
                  }}
                >
                  <Link to={`/edit/${product._id}`}>
                    <EditIcon
                      style={{
                        cursor: `pointer`,
                        textDecoration: `none`,
                        color: "black",
                      }}
                    />
                  </Link>
                  <DeleteIcon
                    style={{ cursor: `pointer` }}
                    onClick={() => deleteEvent(product._id)}
                  />
                </td>
              </tr>
            );
          })
        )}
      </table>
    </div>
  );
}

export default Allproduct;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  margin: 5px;
  width: auto;
  height: auto;
  background: white;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 100px;
`;
const LoadingFrame = styled.div`
  width: 35px;
  height: 35px;
  border: 6px solid transparent;
  border-top-color: black;
  border-radius: 50%;
  animation: ${rotate} 1s ease infinite;
`;
