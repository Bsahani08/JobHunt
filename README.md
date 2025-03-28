# JobHunt - Job Search and Application Platform

A modern job search platform built with React that allows users to browse job listings, save favorite jobs, and apply for positions.

## Features

### Job Listings
- Display job cards with company information and job details
- Pagination with 10 jobs per page
- Search functionality to filter jobs
- Filter jobs by:
  - Job Type (Full-time, Part-time, Contract, Internship)
  - Location (Remote, On-site, Hybrid)
  - Salary Range

### Job Details
- Detailed view of each job posting
- Company information with logo
- Job description, requirements, and responsibilities
- Save job functionality
- Apply Now button with application status tracking
- Meta information display (Location, Salary, Job Type)

### Saved Jobs
- Save favorite job listings
- View all saved jobs in a dedicated section
- Remove jobs from saved list
- Persistent storage using localStorage

### Job Application
- Apply for jobs through a dedicated form
- Track application status
- View all applied jobs
- Application history persistence

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Redux for state management
- CSS3 for styling
- React Icons for UI elements

### APIs & Storage
- JSONPlaceholder API for job data
- localStorage for data persistence

### Development Tools
- Create React App
- Git for version control
- npm/yarn for package management

## Setup and Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/JobHunt.git
```

2. Navigate to the project directory:
```bash
cd JobHunt
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Project Structure
