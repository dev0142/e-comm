import React from 'react'
import axios from 'axios'

function StockChecker() {

    const stockChecker=async(productId)=>{
        try {
          
          const res=await axios.post("http://localhost:3003/stockchecker",{productId});
          if(res.status===200)
          {
            return res.data.quantity;
          }
    
    
        } catch (error) {
          console.log(error);
          if(error.response)
          {
            
          }
        }
      }
    return (
        <div>
            i am here to check the stock
        </div>
    )
}

export default StockChecker
