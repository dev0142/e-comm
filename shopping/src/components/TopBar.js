import React from 'react'
import styled from 'styled-components'
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { NavLink } from "react-router-dom";

function TopBar() {
    return (
        <>
        <TopContainer>
        <SocialIcons>
        <NavLink style={{display:`flex`,alignItems:`center`}} className="icon-button instagram" to="#">
            <InstagramIcon style={{fontSize:`21px`}} />
          </NavLink>
          <NavLink  style={{display:`flex`,alignItems:`center`}}  className="icon-button facebook" to="#">
            <FacebookIcon style={{fontSize:`21px`}}  />
          </NavLink>
          <NavLink style={{display:`flex`,alignItems:`center`}} className="icon-button whatsapp" to="#">
            <WhatsAppIcon style={{fontSize:`21px`}}  />
          </NavLink>

        </SocialIcons>
        <OfferSection>
<pre>Get flat 10% off on your first Order. Use Code: NEWBHN</pre>
        </OfferSection>
        <AboutUs>
            
        <NavLink to="#">
            <p>
                
                Why us?
                </p>
          </NavLink>
        </AboutUs>
        </TopContainer>
        </>
    )
}

export default TopBar

const TopContainer=styled.div`
height: 35px;
display: flex;
justify-content:space-between;
padding:0px 25px;
align-items:center;
background-color:#FFF7E0;

`
const SocialIcons=styled.div`
display: flex;
align-items:center;
`
const AboutUs=styled.div`

`

const OfferSection=styled.div`

`
