import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';
import lego from './images/lego.jpg';

const Navbar = () => {
  const { isLoggedIn, userName, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  const handleProfile = () => {
    navigate("/profile");
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleNavLinkClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate('/login');
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="logo-container">
          <Link className="nav-link" to="/">SKCET</Link>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </button>
        <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link className="nav-link" to="/stories" onClick={(e) => handleNavLinkClick(e, '/stories')}>News & Stories</Link>
            </li>
            <li>
              <Link className="nav-link" to="/events" onClick={(e) => handleNavLinkClick(e, '/events')}>Events</Link>
            </li>
            <li>
              <Link className="nav-link" to="/batchmates" onClick={(e) => handleNavLinkClick(e, '/batchmates')}>Batchmates</Link>
            </li>
            <li>
              <Link className="nav-link" to="/alumni" onClick={(e) => handleNavLinkClick(e, '/alumni')}>Find Alumni</Link>
            </li>
            <li className="careers">
              <Link className="nav-link" to="/career" onClick={(e) => handleNavLinkClick(e, '/career')}>Career</Link>
            </li>
            <li className="engage">
              <Link className="nav-link" to="#" onClick={(e) => handleNavLinkClick(e, '/engage')}>Engage</Link>
              <ul className="engage-menu">
                <li><Link className="dropdown-item" to="/donation" onClick={(e) => handleNavLinkClick(e, '/donation')}>Donation</Link></li>
                <li><Link className="dropdown-item" to="/mentor" onClick={(e) => handleNavLinkClick(e, '/mentor')}>Mentorship</Link></li>
              </ul>
            </li>
            <li className="about">
              <Link className="nav-link" to="/about" onClick={(e) => handleNavLinkClick(e, '/about')}>About Us</Link>
            </li>
          </ul>
          <div className="navbar-buttons">
            {isLoggedIn ? (
              <div className="profile-section">
                <button className="profile-button" onClick={toggleProfileMenu}>
                  {lego && <img src={lego} className="profile-icon" alt="Profile" />}
                  {userName}
                </button>
                <ul className={`profile-menu ${isProfileOpen ? 'active' : ''}`}>
                  <li><button className="dropdown-item" onClick={handleProfile}>Profile</button></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link className="signup-button" to="/signup" >Sign Up / Login</Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;