import React from 'react'
import image1 from "../photos/Images/img1.jpg";
import image2 from "../photos/Images/img2.jpg";
import image3 from "../photos/Images/img3.jpg";
import image4 from "../photos/Images/img4.jpg";
import Slideshow from '../components/Slideshow';
import Unique from '../components/Unique';

function Home() {
    return (
        <>
        <Slideshow images={[image1,image2,image3,image4]} />
        <Unique />

        </>
    )
}

export default Home
