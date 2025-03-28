import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById } from "../../redux/slices/jobsSlice";
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign, FaHeart, FaRegHeart } from "react-icons/fa";
import "./index.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedJob, loading, error } = useSelector((state) => state.jobs);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Check if job is saved
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setIsSaved(savedJobs.includes(parseInt(id)));

    // Check if job is applied
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
    setIsApplied(appliedJobs.includes(parseInt(id)));
  }, [id]);

  const handleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    if (isSaved) {
      const newSavedJobs = savedJobs.filter((jobId) => jobId !== parseInt(id));
      localStorage.setItem("savedJobs", JSON.stringify(newSavedJobs));
    } else {
      localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, parseInt(id)]));
    }
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    if (!isApplied) {
      const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      localStorage.setItem("appliedJobs", JSON.stringify([...appliedJobs, parseInt(id)]));
      setIsApplied(true);
      navigate("/apply-jobs");
    }
  };

  if (loading) {
    return (
      <div className="job-details">
        <div className="job-details-container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="job-details">
        <div className="job-details-container">
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => navigate("/jobs")}>Back to Jobs</button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedJob) {
    return (
      <div className="job-details">
        <div className="job-details-container">
          <div className="error-container">
            <p>Job not found</p>
            <button onClick={() => navigate("/jobs")}>Back to Jobs</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details">
      <div className="job-details-container">
        <div className="job-header">
          <img
            src={`https://picsum.photos/seed/${selectedJob.id}/200`}
            alt={selectedJob.company}
            className="company-logo"
          />
          <div className="job-title-section">
            <h1 className="job-title">{selectedJob.title}</h1>
            <h2 className="company-name">{selectedJob.company}</h2>
            <div className="job-meta">
              <div className="meta-item">
                <FaMapMarkerAlt />
                <span>{selectedJob.location}</span>
              </div>
              <div className="meta-item">
                <FaBriefcase />
                <span>{selectedJob.type}</span>
              </div>
              <div className="meta-item">
                <FaClock />
                <span>{selectedJob.experience}</span>
              </div>
              <div className="meta-item">
                <FaDollarSign />
                <span>{selectedJob.salary}</span>
              </div>
            </div>
          </div>
          <div className="job-actions">
            <button
              className={`apply-button ${isApplied ? "applied" : ""}`}
              onClick={handleApply}
              disabled={isApplied}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
            <button className="save-button" onClick={handleSave}>
              {isSaved ? <FaHeart /> : <FaRegHeart />}
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        <div className="job-content">
          <div className="job-description">
            <h2>Job Description</h2>
            <p>{selectedJob.description}</p>
            <div className="job-requirements">
              <h3>Requirements</h3>
              <ul className="requirements-list">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="job-sidebar">
            <div className="job-info-card">
              <h3>Job Overview</h3>
              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{selectedJob.location}</span>
              </div>
              <div className="info-item">
                <FaBriefcase />
                <span>{selectedJob.type}</span>
              </div>
              <div className="info-item">
                <FaClock />
                <span>{selectedJob.experience}</span>
              </div>
              <div className="info-item">
                <FaDollarSign />
                <span>{selectedJob.salary}</span>
              </div>
            </div>

            <div className="job-info-card">
              <h3>Skills Required</h3>
              <div className="job-tags">
                {selectedJob.skills.map((skill, index) => (
                  <span key={index} className="job-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 