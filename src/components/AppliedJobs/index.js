import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import './index.css';

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const applications = localStorage.getItem('jobApplications');
    if (applications) {
      setAppliedJobs(JSON.parse(applications));
    }
  }, []);

  if (appliedJobs.length === 0) {
    return (
      <div className="applied-jobs-container">
        <div className="empty-state">
          <h2>No Applied Jobs</h2>
          <p>You haven't applied to any jobs yet. Start exploring and apply to jobs you're interested in!</p>
          <Link to="/jobs" className="browse-jobs">
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="applied-jobs-container">
      <div className="applied-jobs-header">
        <h1>Applied Jobs</h1>
        <p>{appliedJobs.length} application{appliedJobs.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="applied-jobs-list">
        {appliedJobs.map((application) => (
          <div key={application.jobId} className="job-card">
            <div className="job-header">
              <div className="job-content">
                <h3 className="job-title">{application.jobTitle}</h3>
                <p className="company-name">{application.company}</p>
                <div className="application-meta">
                  <span className="applied-date">
                    <FaCalendarAlt /> Applied on {new Date(application.appliedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="application-details">
                  <div className="detail-group">
                    <label>Full Name</label>
                    <p>{application.fullName}</p>
                  </div>
                  <div className="detail-group">
                    <label>Email</label>
                    <p>{application.email}</p>
                  </div>
                  <div className="detail-group">
                    <label>Phone</label>
                    <p>{application.phone}</p>
                  </div>
                </div>
                <div className="job-actions">
                  <Link to={`/job/${application.jobId}`} className="view-details">
                    View Job Details
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

export default AppliedJobs; 