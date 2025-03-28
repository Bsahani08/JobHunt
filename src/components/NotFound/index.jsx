import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error">404</h1>
      <p className="info">File not found</p>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        className="static"
        alt="404 error animation"
      />
      <div className="home-button">
        <Link to="/">Go To Home</Link>
      </div>
    </div>
  );
}

export default ErrorPage;