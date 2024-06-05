import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 

import courasel from './Images/courasel.webp';
import courasel2 from './Images/corosaul2.webp';

const ImageCarousel2 = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={courasel} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={courasel2} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageCarousel2;



