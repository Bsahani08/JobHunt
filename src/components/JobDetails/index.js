import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaRegHeart, FaHeart } from 'react-icons/fa';
import './index.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Transform the data to match our job structure
        const jobData = {
          id: parseInt(data.id), // Ensure id is a number
          title: data.title,
          company: `Company ${data.id}`,
          description: data.body,
          companyLogo: `https://picsum.photos/seed/${data.id}/200`,
          location: 'Remote',
          salary: '$50,000 - $100,000',
          type: 'Full-time',
          requirements: [
            'Bachelor\'s degree in Computer Science or related field',
            '3+ years of experience in software development',
            'Strong problem-solving skills',
            'Excellent communication abilities'
          ],
          responsibilities: [
            'Develop and maintain web applications',
            'Collaborate with cross-functional teams',
            'Write clean, maintainable code',
            'Participate in code reviews'
          ]
        };
        
        setJob(jobData);

        // Check if job is already applied
        const appliedJobsData = localStorage.getItem('jobApplications');
        if (appliedJobsData) {
          const parsedAppliedJobs = JSON.parse(appliedJobsData);
          const hasApplied = parsedAppliedJobs.some(appliedJob => 
            parseInt(appliedJob.jobId) === parseInt(id)
          );
          setIsApplied(hasApplied);
        }

        // Load saved jobs
        const savedJobsData = localStorage.getItem('savedJobs');
        if (savedJobsData) {
          const parsedSavedJobs = JSON.parse(savedJobsData);
          setSavedJobs(parsedSavedJobs);
          setIsSaved(parsedSavedJobs.some(savedJob => 
            parseInt(savedJob.id) === parseInt(id)
          ));
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        navigate('/jobs');
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  const handleSaveJob = () => {
    if (job) {
      const newSavedJobs = [...savedJobs, job];
      setSavedJobs(newSavedJobs);
      setIsSaved(true);
      localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    }
  };

  const handleUnsaveJob = () => {
    const newSavedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id);
    setSavedJobs(newSavedJobs);
    setIsSaved(false);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  const handleApplyNow = () => {
    navigate(`/apply/${id}`);
  };

  if (!job) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="job-details-container">
      <div className="job-details-header">
        <div className="company-info">
          <img 
            src={job.companyLogo} 
            alt={job.company} 
            className="company-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/80x80/4a90e2/ffffff?text=${job.company.charAt(0)}`;
            }}
          />
          <div className="company-details">
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
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
          </div>
        </div>
        <div className="job-actions">
          <button 
            className={`save-button ${isSaved ? 'saved' : ''}`}
            onClick={isSaved ? handleUnsaveJob : handleSaveJob}
          >
            {isSaved ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button 
            className={`apply-now ${isApplied ? 'applied' : ''}`}
            onClick={handleApplyNow}
            disabled={isApplied}
          >
            {isApplied ? 'Applied' : 'Apply Now'}
          </button>
        </div>
      </div>

      <div className="job-details-content">
        <div className="job-description">
          <h3>Job Description</h3>
          <p>{job.description}</p>
        </div>

        <div className="job-requirements">
          <h3>Requirements</h3>
          <ul>
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="job-responsibilities">
          <h3>Responsibilities</h3>
          <ul>
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 