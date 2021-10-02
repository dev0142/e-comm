import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

function Header() {
    return (
    <MainHeader>
        <LeftHeader>
            <InstagramIcon/>
            <FacebookIcon/>
            <WhatsAppIcon/>
        </LeftHeader>
        <MiddleHeader>
            <StyledLink to="/">HOME</StyledLink>
            <StyledLink to="/shop">SHOP</StyledLink>
            <StyledLink to="/categories">CATEGORIES</StyledLink>
            <StyledLink to="/why-us">WHY US?</StyledLink>
        </MiddleHeader>
        <RightHeader>
        <StyledLink1 to="/">SIGN IN</StyledLink1>
        <ShoppingCartIcon />

        </RightHeader>
    </MainHeader>
    
    )
}

export default Header
const MiddleHeader =styled.div`
display:flex;
align-items:center;
`
const LeftHeader=styled.div`
display:flex;
width:10%;
align-items:center;
justify-content:space-evenly;
padding:7px;
`
const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin: 1rem;
  font-size:0.95rem;
  &:hover{
      cursor:pointer;
      border-bottom:2px solid black;
  }
`;
const StyledLink1 = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  margin: 1rem;
  font-size:0.8rem;
  border:1px solid black;
  border-radius:7px;
  padding:7px;
`;

const RightHeader=styled.div`
display:flex;
align-items:center;
margin:1rem;
`

const MainHeader=styled.div`
position:absolute;
top:25px;
height:55px;
width:70%;
border-radius:7px;
margin:0 auto;
background: rgba( 255, 255, 255, 0.3 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 11px );
-webkit-backdrop-filter: blur( 11px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
display:flex;
align-items:center;
justify-content:space-between;

`

