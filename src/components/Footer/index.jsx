import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h3>JobHunt</h3>
          <p>Your Gateway to Career Success</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <FaLinkedin />
            </a>
            <a href="#" className="social-link">
              <FaTwitter />
            </a>
            <a href="#" className="social-link">
              <FaFacebook />
            </a>
            <a href="#" className="social-link">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/about">About</Link>
            <Link to="/apply-jobs">Apply</Link>
          </div>
          <div className="footer-contact">
            <span>support@jobhunt.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JobHunt. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 