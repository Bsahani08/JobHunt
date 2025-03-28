import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign, FaHeart } from "react-icons/fa";
import "./index.css";

const SavedJobs = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const savedJobsList = jobs.filter((job) => savedJobIds.includes(job.id));
    setSavedJobs(savedJobsList);
  }, [jobs]);

  const handleUnsave = (jobId) => {
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    const newSavedJobIds = savedJobIds.filter((id) => id !== jobId);
    localStorage.setItem("savedJobs", JSON.stringify(newSavedJobIds));
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
  };

  if (savedJobs.length === 0) {
    return (
      <div className="saved-jobs">
        <div className="saved-container">
          <div className="empty-state">
            <h2>No Saved Jobs Yet</h2>
            <p>Start saving jobs to see them here!</p>
            <Link to="/jobs" className="browse-jobs">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-jobs">
      <div className="saved-container">
        <h1>Saved Jobs</h1>
        <div className="jobs-grid">
          {savedJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <img
                  src={`https://picsum.photos/seed/${job.id}/200`}
                  alt={job.company}
                  className="company-logo"
                />
                <div className="job-title">
                  <h2>{job.title}</h2>
                  <p className="company-name">{job.company}</p>
                </div>
                <button
                  className="save-button saved"
                  onClick={() => handleUnsave(job.id)}
                >
                  <FaHeart />
                </button>
              </div>

              <div className="job-info">
                <div className="info-item">
                  <FaMapMarkerAlt />
                  <span>{job.location}</span>
                </div>
                <div className="info-item">
                  <FaBriefcase />
                  <span>{job.type}</span>
                </div>
                <div className="info-item">
                  <FaClock />
                  <span>{job.experience}</span>
                </div>
                <div className="info-item">
                  <FaDollarSign />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className="job-tags">
                {job.skills && job.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="tag">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-actions">
                <Link to={`/jobs/${job.id}`} className="view-details">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs; 