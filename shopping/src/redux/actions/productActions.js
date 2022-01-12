import axios from "axios"
import { actionTypes } from "../constants/actionTypes"

export const setProducts=()=> async(dispatch)=>{
    const response=await axios.get("http://localhost:3003/fetch");
    console.log(response.data);
    dispatch({
        type:actionTypes.SET_PRODUCTS,
        payload:response.data,
    });
}

export const updateProductQuantity=(itemId,updatedQuantity)=>{
    return{
        type:actionTypes.UPDATE_PRODUCT_QUANTITY,
        payload:{
            id:itemId,
            updatedQuantity:updatedQuantity
        }
    }
}
export const loadCurrentItem=(itemId)=>{
    return{
        type:actionTypes.LOAD_CURRRENT_ITEM,
        payload:{
            id:itemId
        }
    }
}
export const removeSelectedProduct=()=>{
    return{
        type:actionTypes.REMOVE_SELECTED_PRODUCT,
    }
}
export const increaseCartQuantity=(itemId,size)=>{
    return{
        type:actionTypes.INCREASE_CART_QUANTITY,
        payload:{
            id:itemId,
            size:size
        }
    }
}

export const decreaseCartQuantity=(itemId,size)=>{
    return{
        type:actionTypes.DECREASE_CART_QUANTITY,
        payload:{
            id:itemId,
            size:size
        }
    }
}
export const clearAllItemsInCart=()=>{
    return{
        type:actionTypes.CLEAR_CART,
        
    }
}
// export const setWishlistedProduct=(itemId)=>{
//     return{
//         type:actionTypes.SET_WISHLISTED_PRODUCT,
//         payload:{
//           id: itemId
//     }
// }
// }
// export const removeWishlistedProduct=(itemId)=>{
//     return{
//         type:actionTypes.REMOVE_WISHLISTED_PRODUCT,
//         payload:{
//             id:itemId
//         }
// }
// }
// export const wishlistState=()=>{
//     return{
//         type:actionTypes.WISHLIST_BUTTON,
// }
// }

export const addToCart=(itemId,qty,size)=>async(dispatch)=>{

dispatch({
        type:actionTypes.ADD_TO_CART,
        payload:{
            id:itemId,
            quantity:qty,
            size:size+"g"
        }
   })
}
export const removeFromCart=(itemId,size)=>{
    console.log(size);
    return{
        type:actionTypes.REMOVE_FROM_CART,
        payload:{
            id:itemId,
            size:size
        }
    }
}


export const adjustQty=(itemId,value)=>{
    return{
        type:actionTypes.ADJUST_QTY,
        payload:{
            id:itemId,
            qty:value,
        }
    }
}

export const setCartList=()=> async(dispatch)=>{
    const response=await axios.get("/getcartlist");
    
    dispatch({type:actionTypes.SET_CART_ITEMS,
        payload:response.status===205 ? [] : response.data});

}


export const setAddressList=(address)=> async(dispatch)=>{
    
    const response=await axios.get("/addressdetails");
  
    dispatch({type:actionTypes.SET_ADDRESS_LIST,
        payload:{

            data:response.status===205 ? address: response.data,
            status:response.status    
        }
        });

}

export const deleteAddressFromList=(addId) =>async(dispatch)=>{
    console.log(addId);
    const response=await axios.delete("http://localhost:3001/deleteaddress",{data:
    {
       addToBeDeleted:addId
    }});
    console.log(response.data);
    
    dispatch({type:actionTypes.DELETE_ADDRESS_FROM_LIST,
        payload:{
            id:addId}});
    }
export const selectedAddress=(addId) =>async(dispatch)=>{
    
    dispatch(
        {type:actionTypes.SELECTED_ADDRESS,
        payload:{
            id:addId}
        });
    }
    export const deleteSelectedAddress=()=>{
        return{
            type:actionTypes.DELETE_SELECTED_ADDRESS,
            
        }
    }
    export const deleteAllAddress=()=>{
        return{
            type:actionTypes.DELETE_ALL_ADDRESS,
            
        }
    }

    export const setUserList=()=> async(dispatch)=>{
    
        const response=await axios.get("/userdetails",
        (axios.defaults.withCredentials = true));
      
        dispatch({type:actionTypes.SET_USER_DETAILS,
            payload:response.data
            });
    
    }
    export const setOrdersList=()=> async(dispatch)=>{
    
        const response=await axios.get("http://localhost:3001/orderdetails",
        (axios.defaults.withCredentials = true));
        console.log(response.data);
        dispatch({type:actionTypes.SET_ORDERS_LIST,
            payload:response.data
            });
    
    }
