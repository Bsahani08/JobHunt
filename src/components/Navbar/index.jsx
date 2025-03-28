import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">JobHunt</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/applied-jobs">Applied Jobs</Link>
        <Link to="/saved-jobs">Saved Jobs</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Navbar;
