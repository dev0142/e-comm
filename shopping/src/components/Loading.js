import React from "react";
import styled, { keyframes } from "styled-components";

function Loading({open}) {
  if (!open) return null;
  return (
    <>
      <Overlay></Overlay>
      <Loader>
        <LoadingFrame></LoadingFrame>
      </Loader>
    </>
  );
}

export default Loading;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9999999;
  backdrop-filter: blur( 2px );
-webkit-backdrop-filter: blur(2px );
  background:transparent;
  
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const LoadingFrame = styled.div`
  width: 35px;
  height: 35px;
  border: 6px solid transparent;
  border-top-color: black;
  border-radius: 50%;
  animation: ${rotate} 1s ease infinite;
`;
const Loader = styled.div`
  margin: 5px;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  z-index: 9999999;
  bottom: 0;
  right: 0;
  left: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;
