import React from "react";
import { Carousel } from "react-responsive-carousel";
import { alemisa } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from  "../Carousel/carouseltest.module.css"

export default function Couresetest() {
  return (
    <div>
      <Carousel
      autoPlay=  {true}
       showThumbs = {false}
       infiniteLoop= {true}
       showIndicators= {false}>
        {alemisa.map((imagelink, index) => {
          return <img src={imagelink} alt="carousel-image" key={index} />;
        })}
      </Carousel>
      <div className= {classes.my_img}>

      </div>
    </div>
  );
}
