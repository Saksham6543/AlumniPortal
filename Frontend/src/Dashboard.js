import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Dashboard.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { Carousel, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import adminblock from './images/adminblock.jpg';
import Convetion from './images/Convention.jpg';
import frontgate from './images/frontgate.jpg';
import KrishnaSquare from './images/KrishnaSquare.jpg';
import Library from './images/Library.jpg';
import lego from './images/lego.jpg';
import { useAuth } from './AuthContext';

const Dashboard = () => {
  const {isLoggedIn, } = useAuth();
  const [userName, setUserName] = useState("John Doe"); 
  const profileImage = lego; 


  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="dashboard-container">
      <Navbar isLoggedIn={isLoggedIn} userName={userName} profileImage={profileImage} />
      <div className="dashboard-content">
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
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;