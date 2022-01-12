import React,{useState,useEffect} from 'react'
import Header from './Header'
import styled from 'styled-components'
import Logo from "../photos/svg_collections/logo.svg"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'; 
import NavBar from './NavBar';

    function Slideshow({images,autoPlay=true,autoPlayTime=70000}) {
    const[currentSlide,setCurrentSlide]=useState(0);

    const nextSlide = () => {
        if(currentSlide===images.length-1)
        {
            setCurrentSlide(0);
        }
        else{
            setCurrentSlide(currentSlide+1);
        }
    }

    const prevSlide = () => {
        if(currentSlide===0)
        {
            setCurrentSlide(images.length-1);
        }
        else{
            setCurrentSlide(currentSlide-1);
        }
    }

    useEffect(() => {
        const timer=setTimeout(()=>{
            const newSlider=currentSlide>=images.length-1 ? 0 : (currentSlide+1);
            setCurrentSlide(newSlider);
        },autoPlayTime);
        return () => {
            clearTimeout(timer);
        }
    }, [currentSlide])
    return (
        <>

        <MainContainer>
        
            {
                images.map((image,index)=>{
                    return(
                    <Slider key={index}

                     style={{backgroundImage:`url(${image})`,marginLeft:index===0 ?` -${currentSlide*100}%`:undefined}}></Slider>
                    )})
            }
            <NavigatorRight>

            <NavigateNextIcon onClick={nextSlide}  />
                </NavigatorRight>
            <NavigatorLeft>

            <NavigateBeforeIcon onClick={prevSlide} />
                </NavigatorLeft>
        

            <IndicatorWrapper>
            {Array(images.length).fill(1).map((item, index) => {
                    return(
                        <Dots 
                        isActive={currentSlide===index}  
                        key={index}
                        onClick={()=>setCurrentSlide(index)}
                          ></Dots>
                        )
                    })}
        </IndicatorWrapper>
        
        </MainContainer>
        {/* <HeaderContainer>
        <HeaderLogo>
            <img src={Logo} alt="React Logo" />
        </HeaderLogo>
        
       
    </HeaderContainer>  */}

    </>
    )
}

export default Slideshow

const IndicatorWrapper=styled.div`
display:flex;
flex-wrap:nowrap;
position:absolute;
bottom:15px;
right:15px;
`
// const Gradient=styled.div`
// position:absolute;
// top:0;
// bottom:0;
// left:0;
// right:0;
// background-color:rgba(0,0,0,0.3);
// `
const NavigatorRight=styled.div`
position:absolute;
top:45%;
right:15px;
cursor:pointer;
`
const NavigatorLeft=styled.div`
position:absolute;
top:45%;
left:15px;
cursor:pointer;
@media (max-width : 480px) {
    fon-size:large;
    }
`
const Dots=styled.div`
width:12px;
height:12px;
background-color:white;
opacity:${(props)=>(props.isActive ? 1:0.5)};
margin:4px;
transition: 750ms all ease-in-out;
border-radius:20px;
&:hover{
    cursor:pointer; 
}
@media (max-width : 480px) {
width:8px;
height:8px;
}
`
const MainContainer=styled.div`
height:60vh;
width: 75%;
border-radius:7px;
margin:0px auto;
display:flex;
flex-wrap:nowrap;
position:relative;
overflow-x:hidden;
overflow-y:hidden;
z-index:1;
@media (max-width : 480px) {
   height:40vh;
}
`

const Slider =styled.div`
height:80vh;
width:100%;
transition: 750ms all ease-in-out;
flex-shrink:0;
background-position:center;
background-size:cover;
@media (max-width : 480px) {
    height:50vh;
    -webkit-background-size: 100%; 
    -moz-background-size: 100%; 
    -o-background-size: 100%; 
    background-size: 100%; 
    -webkit-background-size: cover; 
    -moz-background-size: cover; 
    -o-background-size: cover; 
    background-size: cover;

 }

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

