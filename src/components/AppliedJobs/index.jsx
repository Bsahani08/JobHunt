import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign } from "react-icons/fa";
import "./index.css";

const AppliedJobs = () => {
  const { jobs } = useSelector((state) => state.jobs);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const appliedJobIds = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    const appliedJobsList = jobs.filter((job) => appliedJobIds.includes(job.id));
    setAppliedJobs(appliedJobsList);
  }, [jobs]);

  if (appliedJobs.length === 0) {
    return (
      <div className="applied-jobs">
        <div className="applied-container">
          <div className="empty-state">
            <h2>No Applied Jobs Yet</h2>
            <p>Start applying for jobs to see them here!</p>
            <Link to="/jobs" className="browse-jobs">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="applied-jobs">
      <div className="applied-container">
        <h1>Applied Jobs</h1>
        <div className="jobs-grid">
          {appliedJobs.map((job) => (
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
                <div className="applied-badge">Applied</div>
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

export default AppliedJobs; 