import { actionTypes } from "../constants/actionTypes";
import { removeButtonAnimation } from "../../admin/AnimateButton";

const initialState = {
  products: [],
  cart: [],
  currentItem: {},
};
const userState = {
  user:{},
  address: [],
  orders:[],
  selected_address: {},
};
export const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_PRODUCTS:
      return { ...state, products: payload };
    case actionTypes.SET_WISHLISTED_PRODUCT:
      const wishlistProduct = state.products.find(
        (prod) => prod._id === payload.id
      );

      return {
        ...state,
        wishlist: [...state.wishlist, wishlistProduct],
      };

    case actionTypes.LOAD_CURRRENT_ITEM:
      const item = state.products.find((prod) => prod._id === payload.id);
      return {
        ...state,
        currentItem: item,
      };
    case actionTypes.REMOVE_SELECTED_PRODUCT:
      return {
        ...state,
        currentItem: {},
      };
    case actionTypes.UPDATE_PRODUCT_QUANTITY:
      return {
        ...state,
        cart:state.cart.map((prod)=>prod._id===payload.id ?
        { ...prod, quantity: payload.updatedQuantity }
        :prod
        ),
        products: state.products.map((prod)=>prod._id===payload.id ?
        { ...prod, quantity: payload.updatedQuantity }
        :prod
        )
      };
    case actionTypes.SET_CART_ITEMS:
      const cartItemsFromDatabase=[];
      if(payload!==undefined || payload!==""|| payload!==null)
      {
      payload.map((product)=>{
        const product1 = state.products.find((prod) => prod._id === product.productId);
        const updateproducts={
          ...product1,qty:product.quantity,size:product.size
        }
        cartItemsFromDatabase.push(updateproducts);
      })
    }
      return {
        ...state,
        cart:payload===undefined || payload===""|| payload===null ? [] :cartItemsFromDatabase
      };
    
    case actionTypes.ADD_TO_CART:
    
      const product1 = state.products.find((prod) => prod._id === payload.id);
      
      const inCart = state.cart.find((product) =>
        product._id === payload.id && product.size===payload.size ? true : false
      );
      
      return {
        ...state,
        cart: inCart
          ? state.cart.map((product) =>
              product._id === payload.id
                ? { ...product, qty: product.qty + payload.quantity }
                : product
            )
          : [
              ...state.cart,
              {
                ...product1,
                qty: payload.quantity,
                size:payload.size
              },
            ],
      };
    case actionTypes.REMOVE_FROM_CART:
      const updatedArray=[];
      state.cart.map((product,index) => {
          
        if(product._id===payload.id && product.size===payload.size)
        {
         console.log("finally deleted");
        }
        else{
          updatedArray.push(product);
        }
      })
      return {
        ...state,
        cart: updatedArray
        
        
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((product) =>
          product._id === payload.id
            ? { ...product, qty: payload.qty }
            : product
        ),
      };
    case actionTypes.INCREASE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) =>
          (product._id === payload.id && product.size===payload.size)
            ? { ...product, qty: product.qty + 1 }
            : product
        ),
      };
    case actionTypes.DECREASE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) =>
        (product._id === payload.id && product.size===payload.size)
            ? { ...product, qty: product.qty - 1 }
            : product
        ),
      };

    case actionTypes.CLEAR_CART:
      return {
        ...state,
        cart:[]
      };

    default:
      return state;
  }
};

export const userReducer = (state = userState, { type, payload }) => {
  switch (type) {

    case actionTypes.SET_USER_DETAILS:
      return {
        ...state,
        user:payload,
      };
    case actionTypes.SET_ADDRESS_LIST:
      const guestAddress=[];
      
      if(payload.data!==null || payload.data!=="")
      {
        if(payload.status===205)
        {
        guestAddress.push(payload.data);
        }
      }
      return {
        ...state,
        address:payload.data==="" || payload.data===undefined ? [] :payload.status===205 ? guestAddress : payload.data,
      };

    case actionTypes.SELECTED_ADDRESS:
      const item = state.address.find((add) => add._id === payload.id);
      return {
        ...state,
        selected_address: item,
      };
    case actionTypes.DELETE_SELECTED_ADDRESS:
      
      return {
        ...state,
        selected_address: {},
      };

    case actionTypes.DELETE_ADDRESS_FROM_LIST:
      return {
        ...state,
        address: payload.id===undefined || payload.id===""||payload.id===null ? []: state.address.filter((add) => add._id !== payload.id),
      };
    case actionTypes.DELETE_ALL_ADDRESS:
      return {
        ...state,
        address:[],
      };
      case actionTypes.SET_ORDERS_LIST:

        return {
          ...state,
          orders:payload,
        };

    default:
      return state;
  }
};
