import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import './index.css';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const savedJobsData = localStorage.getItem('savedJobs');
    if (savedJobsData) {
      const parsedJobs = JSON.parse(savedJobsData);
      // Ensure each job has a valid logo URL
      const jobsWithValidLogos = parsedJobs.map(job => ({
        ...job,
        companyLogo: job.companyLogo || `https://picsum.photos/seed/${job.id}/200`
      }));
      setSavedJobs(jobsWithValidLogos);
    }
  }, []);

  const handleUnsaveJob = (jobId) => {
    const newSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  if (savedJobs.length === 0) {
    return (
      <div className="saved-jobs-container">
        <div className="empty-state">
          <h2>No Saved Jobs</h2>
          <p>You haven't saved any jobs yet. Start exploring and save jobs you're interested in!</p>
          <Link to="/jobs" className="browse-jobs">
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-jobs-container">
      <div className="saved-jobs-header">
        <h1>Saved Jobs</h1>
        <p>{savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved</p>
      </div>
      <div className="saved-jobs-list">
        {savedJobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <img
                src={job.companyLogo || `https://picsum.photos/seed/${job.id}/200`}
                alt={job.company}
                className="company-logo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://via.placeholder.com/80x80/4a90e2/ffffff?text=${job.company.charAt(0)}`;
                }}
              />
              <div className="job-content">
                <h3 className="job-title">{job.title}</h3>
                <p className="company-name">{job.company}</p>
                <p className="job-description">{job.description}</p>
                <div className="job-meta">
                  <span className="job-location">
                    <FaMapMarkerAlt /> {job.location}
                  </span>
                  <span className="job-salary">
                    <FaMoneyBillWave /> {job.salary}
                  </span>
                  <span className="job-type">
                    <FaBriefcase /> {job.type}
                  </span>
                </div>
                <div className="job-actions">
                  <button 
                    className="save-button saved"
                    onClick={() => handleUnsaveJob(job.id)}
                  >
                    <FaHeart />
                  </button>
                  <Link to={`/job/${job.id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedJobs; 