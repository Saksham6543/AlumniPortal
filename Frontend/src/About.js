import React from 'react';
import Navbar from './Navbar';
import './About.css';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="about-content">
          <div className="about-image-container">
            <img
              src="https://skcet.ac.in/wp-content/uploads/2023/12/Library-page-image.jpg" 
              alt="Sri Krishna College of Engineering Campus"
              className="about-image"
            />
          </div>
          <div className="about-text">
            <h1>About Sri Krishna College of Engineering</h1>
            <p>
              Sri Krishna College of Engineering, located in Coimbatore, is a premier institution dedicated to providing quality education in engineering and technology. Established with a mission to nurture young minds with innovative ideas and technical skills, SKCET has become a hub of academic excellence.
            </p>
            <p>
              Our college offers a wide range of undergraduate and postgraduate programs, each designed to equip students with the knowledge and skills needed to succeed in their careers. With a strong emphasis on research, innovation, and hands-on learning, SKCET is committed to producing industry-ready professionals.
            </p>
            <p>
              The beautiful campus, state-of-the-art facilities, and a vibrant student community make SKCET an ideal place for learning and personal growth. Join us in our journey of excellence and be a part of a tradition that shapes future leaders.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
