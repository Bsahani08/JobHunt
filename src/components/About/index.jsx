import React from "react";
import "./index.css";
import { FaSearch, FaBriefcase, FaUserTie, FaBuilding, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About JobHunt</h1>
          <p>Your Gateway to Career Success</p>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              At JobHunt, we're dedicated to connecting talented professionals with their dream careers. 
              Our platform simplifies the job search process, making it easier for both job seekers and 
              employers to find the perfect match.
            </p>
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose JobHunt?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaSearch className="feature-icon" />
              <h3>Smart Job Search</h3>
              <p>Advanced search filters and personalized job recommendations based on your profile and preferences.</p>
            </div>
            <div className="feature-card">
              <FaBriefcase className="feature-icon" />
              <h3>Job Tracking</h3>
              <p>Keep track of your applications and saved jobs in one place. Never miss an opportunity.</p>
            </div>
            <div className="feature-card">
              <FaUserTie className="feature-icon" />
              <h3>Career Development</h3>
              <p>Access resources and tips to enhance your professional skills and marketability.</p>
            </div>
            <div className="feature-card">
              <FaBuilding className="feature-icon" />
              <h3>Company Insights</h3>
              <p>Get detailed information about companies, their culture, and work environment.</p>
            </div>
            <div className="feature-card">
              <FaHandshake className="feature-icon" />
              <h3>Easy Application</h3>
              <p>Streamlined application process with one-click apply and resume upload features.</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>1M+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-card">
            <h3>50K+</h3>
            <p>Companies</p>
          </div>
          <div className="stat-card">
            <h3>100K+</h3>
            <p>Job Listings</p>
          </div>
          <div className="stat-card">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </section>

        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>Have questions? We're here to help!</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>support@jobhunt.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>123 Job Street, Career City, CC 12345</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 