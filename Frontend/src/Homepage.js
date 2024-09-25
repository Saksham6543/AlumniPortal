import React, { useState } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Homepage.css';
import adminblock from './images/adminblock.jpg';
import Convetion from './images/Convention.jpg';
import frontgate from './images/frontgate.jpg';
import KrishnaSquare from './images/KrishnaSquare.jpg';
import Library from './images/Library.jpg';
import Navbar from './Navbar'; 
import Footer from './Footer'; 
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login');
  };

  return (
    <div>
      
      <Navbar isLoggedIn={isLoggedIn} userName={userName}  />

     
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={adminblock} alt="Admin Block" />
         
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={Convetion} alt="Convention" />
          
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={frontgate} alt="Front Gate" />
         
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={KrishnaSquare} alt="Krishna Square" />
         
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100 carousel-image" src={Library} alt="Library" />
         
        </Carousel.Item>
      </Carousel>


      <Footer />
    </div>
  );
};

export default Homepage;