import React,{useState} from 'react'
import Header from './Header'
import '../components/slider/Slider.css'
import BtnSlider from '../components/slider/BtnSlider'
import dataSlider from '../components/slider/dataSlider'
import styled from 'styled-components'
import Logo from "../photos/svg_collections/logo.svg"


function Slideshow() {
    const [slideIndex, setSlideIndex] = useState(1);

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    return (
        <MainContainer>
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <img 
                        src={process.env.PUBLIC_URL + `/Images/img${index + 1}.jpg`} 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 4}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>

            <HeaderContainer>
                <HeaderLogo>
                    <img src={Logo} alt="React Logo" />
                </HeaderLogo>
                <Header />  
            </HeaderContainer>  
            

        </MainContainer>
    )
}

export default Slideshow

const MainContainer=styled.div`
height:80vh;
width:100%;

position:relative;
`
const HeaderLogo=styled.div`
position:absolute;
top:-20px;
left:30px;
img{
height:150px;
width:100%;
}
`
const HeaderContainer=styled.div`
display:flex;
justify-content:center;
`

