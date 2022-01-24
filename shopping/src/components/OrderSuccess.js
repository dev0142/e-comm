import React from 'react'
import styled from 'styled-components'
import placed from '../photos/orderconfirmed.jpg'
import { useEffect,useState ,useRef} from "react";
import { useLocation ,useHistory} from "react-router-dom";

function OrderSuccess() {
    const blast=useRef(null);
    const history=useHistory();
    const [orderId,setOrderId]=useState(null);
    const location = useLocation();

    const showOrderDetails=()=>{
        
        if(location.state)
        {
            history.push(`/orders/${orderId}`);
        }
    }
    useEffect(() => {
      
        if(location.state)
        {
       setOrderId(location.state.orderId) ;
       console.log("sdhsdfuck");
        }
        setTimeout(() => {
            blast.current.classList.remove("pyro");
            
        }, 6000);
    }, [location]);

    if(orderId===null || orderId===undefined)
    return(<>
    <h1>I think you are lost</h1>
    </>)
    return (
        <Container>
          
          
          <MainContainer>
              <OrderDetails>
              <h1>Woohooo!!       🎉  </h1>
                  <h3 style={{margin:`0`,fontWeight:`500`}}>Good Things are on the way!! 🚗🚗</h3>
                  <div style={{height:`50px`}}>

                  </div>
                  <p style={{fontWeight:`490`,fontSize:`19px`}}>#Order-No: {orderId}</p>
                  <p style={{fontWeight:`490`,fontSize:`19px`}}>Payment-mode: COD</p>
                  <p style={{fontWeight:`490`,fontSize:`19px`}}>Estimated-delivery:     5-6 days</p>
                <button onClick={showOrderDetails} className='button-28'>View your Order</button>
              </OrderDetails>
              <ImageContainer>

            <img width={470} height={430} src={placed} alt="order palced"></img>
              </ImageContainer>

          </MainContainer>
          <div ref={blast} className="pyro">
    <div className="before"></div>
    <div className="after"></div>
</div>
        </Container>
    )
}

const Container=styled.div`
height: 100%;
overflow: hidden;
`
const MainContainer=styled.div`

margin: 0 auto;
width: 68%;
height: auto;
padding: 20px;
display: flex;

justify-content:stretch;

align-items:flex-start;

`
const OrderDetails=styled.div`
width: 40%;

p{
    margin: 8px;
}

button{
    margin-top:50px;
}
`
const ImageContainer=styled.div`
width: 60%;
display: flex;

align-items:center;
justify-content:center;

`
export default OrderSuccess;
