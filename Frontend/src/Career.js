import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Career.css';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchBar from './SearchBar';
import JobForm from './JobForm';
import { useAuth } from './AuthContext'; 

function Career() {
    const { userRole } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All Opportunities');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        filterJobs(activeCategory);
    }, [jobs, activeCategory]);

    const filterJobs = (category) => {
        let filtered = jobs;

        switch (category) {
            case 'Jobs':
                filtered = jobs.filter(job => job.type === 'full-time' || job.type === 'part-time');
                break;
            case 'Internships':
                filtered = jobs.filter(job => job.type === 'internship');
                break;
            default:
                filtered = jobs;
                break;
        }

        setFilteredJobs(filtered);
    };

    const handleSearch = (filters) => {
        const { companyName, jobTitle, location } = filters;
        const searchedJobs = jobs.filter(job =>
            (!companyName || job.company.includes(companyName)) &&
            (!jobTitle || job.title.includes(jobTitle)) &&
            (!location || job.location.includes(location))
        );
        setFilteredJobs(searchedJobs);
    };

    const handleJobPost = (newJob) => {
        const updatedJobs = [...jobs, newJob];
        setJobs(updatedJobs);
        setActiveCategory('Posted By Me');
        filterJobs('Posted By Me');
    };

    const handleNavigation = (path, category) => {
        setActiveCategory(category);
        navigate(path);
    };

    return (
        <div>
            <Navbar/>
        <div className="career">
            <div className="header">
                <h1>Career Opportunities</h1>
                <p>Explore and apply for jobs or share new opportunities!</p>
            </div>

            <div className="content">
                <div className="sidebar">
                    <h3>Job Categories</h3>
                    <ul className="categories-list">
                        <li onClick={() => handleNavigation('/career/allopportunities', 'All Opportunities')}>
                            All Opportunities
                        </li>
                        <li onClick={() => handleNavigation('/career/jobpage', 'Jobs')}>
                            Jobs
                        </li>
                        <li onClick={() => handleNavigation('/career/internships', 'Internships')}>
                            Internships
                        </li>
                    </ul>
                </div>

                <div className="main-content">
                    <SearchBar onSearch={handleSearch} />
                    {(userRole === 'alumni' || userRole === 'admin')   && (
                        <div className="post-opportunity">
                            <button className="post-button" onClick={() => setIsFormVisible(true)}>
                                Post a New Opportunity
                            </button>
                        </div>
                    )}
                    {/* Render filteredJobs or other main content here */}
                </div>
            </div>

            {/* {isFormVisible && (
                <JobForm onSubmit={handleJobPost} onClose={() => setIsFormVisible(false)} />
            )} */}
            {isFormVisible && (
                <JobForm
                    open={isFormVisible}
                    onSubmit={handleJobPost}
                    onClose={() => setIsFormVisible(false)}
                />
            )}

        </div>
          <Footer/>
        </div>
    );
}

export default Career;
