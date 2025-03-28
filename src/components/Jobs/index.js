import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import './index.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const [filters, setFilters] = useState({
    jobType: 'all',
    location: 'all',
    salary: 'all'
  });
  const jobsPerPage = 10;
  const navigate = useNavigate();

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    const savedJobsData = localStorage.getItem('savedJobs');
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
  }, []);

  const handleSaveJob = (jobId) => {
    const jobToSave = jobs.find(job => job.id === jobId);
    if (jobToSave) {
      const newSavedJobs = [...savedJobs, jobToSave];
      setSavedJobs(newSavedJobs);
      localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
    }
  };

  const handleUnsaveJob = (jobId) => {
    const newSavedJobs = savedJobs.filter(job => job.id !== jobId);
    setSavedJobs(newSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const applyFilters = useCallback(() => {
    let filtered = [...jobs];

    // Apply job type filter
    if (filters.jobType !== 'all') {
      filtered = filtered.filter(job => 
        job.type.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // Apply location filter
    if (filters.location !== 'all') {
      filtered = filtered.filter(job => 
        job.location.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // Apply salary filter
    if (filters.salary !== 'all') {
      filtered = filtered.filter(job => {
        const salary = job.salary.replace(/[^0-9]/g, '');
        const salaryNum = parseInt(salary);
        
        switch (filters.salary) {
          case '0-50000':
            return salaryNum <= 50000;
          case '50000-100000':
            return salaryNum > 50000 && salaryNum <= 100000;
          case '100000+':
            return salaryNum > 100000;
          default:
            return true;
        }
      });
    }

    setFilteredJobs(filtered);
    setTotalPages(Math.ceil(filtered.length / jobsPerPage));
  }, [jobs, filters, jobsPerPage]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Transform the data to match our job structure
      const jobsData = data.map(post => ({
        id: post.id,
        title: post.title,
        company: `Company ${post.id}`,
        description: post.body,
        companyLogo: `https://picsum.photos/seed/${post.id}/200`,
        location: ['Remote', 'On-site', 'Hybrid'][Math.floor(Math.random() * 3)],
        salary: ['$30,000 - $50,000', '$50,000 - $100,000', '$100,000 - $150,000'][Math.floor(Math.random() * 3)],
        type: ['Full-time', 'Part-time', 'Contract', 'Internship'][Math.floor(Math.random() * 4)]
      }));
      
      setJobs(jobsData);
      setFilteredJobs(jobsData);
      setTotalPages(Math.ceil(jobsData.length / jobsPerPage));
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
      setFilteredJobs([]);
      setTotalPages(1);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  
  console.log('Current Jobs:', currentJobs);
  console.log('Total Jobs:', jobs.length);
  console.log('Current Page:', currentPage);
  console.log('Total Pages:', totalPages);

  return (
    <div className="jobs-container">
      <div className="job-background">
        <div className="title">
          <h2>Find Your Dream Job</h2>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search jobs..."
            />
          </div>
        </div>
      </div>
      <div className="job-section">
        <div className="jobs-for-you">
          <div className="job-list">
            {currentJobs.map((job) => {
              const isSaved = savedJobs.some(savedJob => savedJob.id === job.id);
              return (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <img
                      src={job.companyLogo}
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
                          className={`save-button ${isSaved ? 'saved' : ''}`}
                          onClick={() => isSaved ? handleUnsaveJob(job.id) : handleSaveJob(job.id)}
                        >
                          {isSaved ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <Link to={`/job/${job.id}`} className="view-details">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination">
            <button 
              className="prev" 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button 
              className="next" 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className="job-page">
          <div className="filter-section">
            <h3>Filter Jobs</h3>
            <div className="filter-group">
              <label>Job Type</label>
              <select 
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Location</label>
              <select 
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Salary Range</label>
              <select 
                value={filters.salary}
                onChange={(e) => handleFilterChange('salary', e.target.value)}
              >
                <option value="all">All Salaries</option>
                <option value="0-50000">$0 - $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000+">$100,000+</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 