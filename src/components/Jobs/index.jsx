import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./index.css";
import Filter from "../Filter";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { fetchJobs } from "../../redux/jobsSlice";
import debounce from 'lodash/debounce';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaDollarSign, FaHeart, FaRegHeart } from "react-icons/fa";

const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const jobsPerPage = 5;

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  useEffect(() => {
    if (jobs.length > 0) {
      setFilteredJobs(jobs);
    }
  }, [jobs]);

  useEffect(() => {
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(savedJobIds);
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => {
      if (term === "") {
        setFilteredJobs(jobs);
        return;
      }
      const searchResults = jobs.filter((job) => {
        const searchString = term.toLowerCase();
        return (
          job.title?.toLowerCase().includes(searchString) ||
          job.company?.toLowerCase().includes(searchString) ||
          job.location?.toLowerCase().includes(searchString)
        );
      });
      setFilteredJobs(searchResults);
    }, 300),
    [jobs]
  );

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  function handleJobFilter(event) {
    const filterValue = event.target.value;
    if (filterValue === "all") {
      setFilteredJobs(jobs);
      return;
    }
    const filtered = jobs.filter((job) => job.type === filterValue);
    setFilteredJobs(filtered);
  }

  function handleSaveJob(jobId) {
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    if (savedJobIds.includes(jobId)) {
      const updatedIds = savedJobIds.filter(id => id !== jobId);
      localStorage.setItem("savedJobs", JSON.stringify(updatedIds));
      setSavedJobs(updatedIds);
    } else {
      const updatedIds = [...savedJobIds, jobId];
      localStorage.setItem("savedJobs", JSON.stringify(updatedIds));
      setSavedJobs(updatedIds);
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleExperienceFilter(checkedState) {
    if (checkedState.length === 0) {
      setFilteredJobs(jobs);
      return;
    }
    const filtered = jobs.filter((job) => {
      const jobExp = parseInt(job.experience) || 0;
      return checkedState.some((exp) => jobExp >= exp.min && jobExp <= exp.max);
    });
    setFilteredJobs(filtered);
  }

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="jobs-container">
      <div className="job-background">
        <div className="title">
          <h2>Our Jobs</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
      </div>
      <div className="job-section">
        <div className="job-page">
          {currentJobs.map((job) => {
            const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
            const isSaved = savedJobs.includes(job.id);

            return (
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
                    className={`save-button ${isSaved ? "saved" : ""}`}
                    onClick={() => handleSaveJob(job.id)}
                  >
                    {isSaved ? <FaHeart /> : <FaRegHeart />}
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
            );
          })}
        </div>
        <Filter
          handleJobFilter={handleJobFilter}
          handleExperienceFilter={handleExperienceFilter}
        />
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`page-button ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Jobs;

