import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section id="contact" className="footer-section">
      <div className="footer container-fluid p-3">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-sm-10 col-10 mx-3">
            <div className="row bg-dark text-light rounded p-2">

            
            </div>
            <div className="row justify-content-end mt-3">
              <a href="https://www.facebook.com/SriKrishnaCollege/" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://www.linkedin.com/school/sri-krishna-college-of-engineering-and-technology-coimbatore/" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://twitter.com/SKCETofficial" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-twitter fa-2x"></i>
              </a>
              <a href="https://www.skcet.ac.in/" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fas fa-globe fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-md-4 mt-2 mb-4">
            <h4 className="mb-3 border-bottom">Address</h4>
            <div>
              Sri Krishna College of Engineering and Technology,
              Kuniamuthur, Coimbatore, Tamil Nadu 641008
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-4">
            <h4 className="mb-3 border-bottom">Connect with Us</h4>
            <div>
              <a href="https://skcet.ac.in/" target="_blank" rel="noreferrer" className="text-light">
                <i className="fab fa-facebook"></i> SKCET official
              </a>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/srikrishnainstitutions/" target="_blank" rel="noreferrer" className="text-light">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-4">
            <h4 className="mb-3 border-bottom">Contact Us</h4>
            <div>
              <b>
                Prof. John Doe<br />Prof. In-Charge, Alumni Cell
              </b>
            </div>
            <div className="contact-info">
              <i className="fas fa-phone-square"></i>
              +91 9876543210 (Phone)
            </div>
            <div className="contact-info">
              <i className="fas fa-phone-square"></i>
              +91 422 1234567 (Office)
            </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;