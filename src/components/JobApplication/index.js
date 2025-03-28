import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './index.css';

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: null,
    coverLetter: '',
    portfolio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error('Failed to fetch job details');
        const data = await response.json();
        
        setJob({
          id: data.id,
          title: data.title,
          company: `Company ${data.id}`,
        });
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      resume: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store application in localStorage
      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
      applications.push({
        jobId: id,
        jobTitle: job.title,
        company: job.company,
        ...formData,
        appliedDate: new Date().toISOString()
      });
      localStorage.setItem('jobApplications', JSON.stringify(applications));

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return <div className="loading">Loading...</div>;

  return (
    <div className="application-container">
      <div className="application-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Job Details
        </button>
        <h1>Apply for {job.title}</h1>
        <p className="company-name">{job.company}</p>
      </div>

      {submitSuccess ? (
        <div className="success-message">
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for applying. We'll review your application and get back to you soon.</p>
          <button className="view-applications" onClick={() => navigate('/applied-jobs')}>
            View My Applications
          </button>
        </div>
      ) : (
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume (PDF)</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="coverLetter">Cover Letter</label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="portfolio">Portfolio URL (Optional)</label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              placeholder="https://"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  );
};

export default JobApplication; 