import React from 'react'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import {CSSTransition} from "react-transition-group"
import {
    EmailShareButton,
    FacebookShareButton,
    WhatsappShareButton,
    TelegramShareButton
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,

  } from "react-share";

function Share({open,close}) {
    if(!open) return null;
    return (
        <>
        <Overlay onClick={close}></Overlay>

        <CSSTransition
        in={open}
        appear={true}
        timeout={100}
        classNames="fade"
        >
        <ShareContainer>
            <CloseIcon className="loginModalCloseIcon" style={{borderRadius:`22px`,padding:`4px`, backgroundColor:`#476b6b`,color:`white`,cursor:`pointer`,position:`absolute`,right:`-40px`,top:`-3px`,fontSize: `23px`}} onClick={close} />
            <h3>Share with your friends and family</h3>
            <ShareButtons>
                <WhatsappShareButton url={window.location.href}>
                    <WhatsappIcon size={45} round={true}></WhatsappIcon>
                </WhatsappShareButton>
                <FacebookShareButton url={window.location.href}>
                    <FacebookIcon size={45} round={true}></FacebookIcon>
                </FacebookShareButton>
                <EmailShareButton url={window.location.href}>
                    <EmailIcon size={45} round={true}></EmailIcon>
                </EmailShareButton>
                <TelegramShareButton url={window.location.href}>
                    <TelegramIcon size={45} round={true}></TelegramIcon>
                </TelegramShareButton>

            </ShareButtons>
            
        </ShareContainer>
        </CSSTransition>
    </>
    )
}




const Overlay=styled.div`
position:fixed;
top:0;
bottom:0;
right:0;
left:0;
background: rgba( 255, 255, 255, 0.05 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 5px );
-webkit-backdrop-filter: blur( 5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
`

const ShareButtons=styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
width: 65%;
`

const ShareContainer=styled.div`
position:fixed;
width:25%;
height:15vh;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
background-color:#FFF;
border:1px solid black;
padding:15px 15px;
display:flex;
align-items: center;
flex-direction: column;

border-radius:7px;
z-index:1000;
@media (max-width : 480px) {
    width:80%;
    height:65vh;
    padding:20px 10px;
    }
`



export default Share
