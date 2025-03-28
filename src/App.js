import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDetails from "./components/JobDetails";
import JobApplication from "./components/JobApplication";
import ApplyJobs from "./components/ApplyJobs";
import AppliedJobs from "./components/AppliedJobs";
import SavedJobs from "./components/SavedJobs";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/apply/:id" element={<JobApplication />} />
              <Route path="/apply-jobs" element={<ApplyJobs />} />
              <Route path="/applied-jobs" element={<AppliedJobs />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
