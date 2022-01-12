import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

function Payment() {
    return (
        <>
        <div>
            <div style={{ height: `110px` }}></div>
          </div>
          <Navigation>
          <div>
        <ul className="breadcrumbCart">
          <li>
            <Link style={{textDecoration:`none`,color:`white`}} to="/cart">Cart</Link>
          </li>
          <li>
            <Link style={{textDecoration:`none`,color:`white`}}  to="/address">Address</Link>
          </li>
          <li>
          <Link style={{textDecoration:`none`,color:`white`}}  to="/payment">Payment</Link>
          </li>
        </ul>
      </div>


          </Navigation>

            
        </>
    )
}

export default Payment
const Navigation=styled.div`
height: 40px;
margin: 15px auto;
width: 50%;


`