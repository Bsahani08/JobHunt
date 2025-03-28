# JobHunt - Job Search and Application Platform

A modern job search platform built with React that allows users to browse job listings, save favorite jobs, and apply for positions.

---

## 🔥 Preview

Here are a few screenshots of the JobHunt platform in action:

<p float="left">
  <img src="src/Assets/page1.png" width="800" alt="Homepage Screenshot" />
  <img src="src/Assets/page2.png" width="800" alt="Job Listing Screenshot" />
  <img src="src/Assets/page3.png" width="800" alt="Job Details Screenshot" />
  <img src="src/Assets/page4.png" width="800" alt="Saved Jobs Screenshot" />
  <img src="src/Assets/page5.png" width="800" alt="Application Status Screenshot" />
</p>

---

## 🚀 Features

### 🧭 Job Listings
- Display job cards with company information and job details
- Pagination with 10 jobs per page
- Search functionality to filter jobs
- Filter jobs by:
  - Job Type (Full-time, Part-time, Contract, Internship)
  - Location (Remote, On-site, Hybrid)
  - Salary Range

### 📄 Job Details
- Detailed view of each job posting
- Company information with logo
- Job description, requirements, and responsibilities
- Save job functionality
- Apply Now button with application status tracking
- Meta information display (Location, Salary, Job Type)

### ❤️ Saved Jobs
- Save favorite job listings
- View all saved jobs in a dedicated section
- Remove jobs from saved list
- Persistent storage using localStorage

### 📤 Job Application
- Apply for jobs through a dedicated form
- Track application status
- View all applied jobs
- Application history persistence

---

## 🛠 Tech Stack

### 🖥 Frontend
- React.js
- React Router for navigation
- Redux for state management
- CSS3 for styling
- React Icons for UI elements

### 🔗 APIs & Storage
- JSONPlaceholder API for job data
- localStorage for data persistence

### 🧰 Development Tools
- Create React App
- Git for version control
- npm/yarn for package management

---

## 🧪 Setup and Installation

### 1) Clone the Repository

```bash
git clone https://github.com/Bsahani08/JobHunt.git
```

### 2) Navigate to the project directory:

```bash
cd JobHunt
```

### 3) Install dependencies:

```bash
npm install
```

### 4) Start the development server:

```bash
npm run start
```

### 5) Open in browser:
[http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```plaintext
jobhunt/
├── src/
│   ├── components/
│   │   ├── Jobs/
│   │   ├── JobDetails/
│   │   ├── SavedJobs/
│   │   └── AppliedJobs/
│   ├── redux/
│   ├── Assests/
│   │   ├── page1.png
│   │   ├── page2.png
│   │   ├── page3.png
│   │   ├── page4.png
│   │   └── page5.png
│   ├── App.js
│   └── index.js
├── public/
└── README.md
```

--- 

## ✨ Additional Improvements
Here are a few ideas to enhance the JobHunt platform further:

🌐 Multi-language Support – Enable localization for a global user base.

🔔 Notification System – Alert users on application status changes or job expiration.

👤 User Authentication – Add login/signup with email or social providers.

🧠 AI Job Recommendations – Suggest jobs based on user behavior and preferences.

💼 Company Profiles – Add detailed profiles for companies with ratings and reviews.

--- 

## 🤝 Contributing :

Feel free to fork the repo, raise issues, submit pull requests, or send carrier pigeons — we accept all forms of contribution.

