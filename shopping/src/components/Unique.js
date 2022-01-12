import React from 'react'
import free from "../photos/free-delivery.png";
import original from "../photos/original.png";
import money from "../photos/save-money.png";
import handpicked from "../photos/tea.png";
import styled from 'styled-components'

function Unique() {
    return (
        <UniqueCont>
            <AlignDiv>
              <img height={40} width={40} src={free}></img>
              <div>
              <h3 >Free delivery </h3>
                <p >Over 499</p>
              </div>
            </AlignDiv>

            <AlignDiv>
              <img height={40} width={40}  src={original}></img>
              <div>

              <h3>100% Quality Assured</h3>
              <p>HandPicked naturally</p>
              </div>
            </AlignDiv>
            <AlignDiv>
              <img  height={40} width={40}  src={money}></img>
              <div>
              <h3>Huge savings</h3>
        <p>Pocket friendly</p>
              </div>
            </AlignDiv>
            <AlignDiv>
              <img  height={40} width={40}  src={handpicked}></img>
              <div>
              <h3>Grown in Kumaun Hills</h3>
<p>Foothills of Uttarakhand</p>
              </div>
            </AlignDiv>
          </UniqueCont>
    )
}

export default Unique

const AlignDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin:5px 25px;
  h3{
      font-size:16px;
      font-weight:500;
      margin: 2px 15px;
  }
  p{
      margin:2px 15px;
      color:#9C9789;
      font-weight:400;
      font-size:13px;
  }
`;

const UniqueCont = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 5px auto;
`;
 