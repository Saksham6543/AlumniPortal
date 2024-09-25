import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobList from './JobList'; 
import './styles.css'; 
import { useLocation } from 'react-router-dom'; 
import Footer from '../Footer';
import Navbar from '../Navbar';

function SearchJobs() {
    const [jobs, setJobs] = useState([]);
    const [sortOption, setSortOption] = useState('date');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const companyName = queryParams.get('companyName') || '';
    const jobTitle = queryParams.get('jobTitle') || '';
    const searchLocation = queryParams.get('location') || '';

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                
                const response = await axios.get('http://localhost:8080/api/jobs/search', {
                    params: {
                        companyName: companyName.trim() || undefined, 
                        jobTitle: jobTitle.trim() || undefined,
                        location: searchLocation.trim() || undefined,
                    },
                });
                setJobs(response.data); 
            } catch (error) {
                console.error("Error searching jobs:", error);
                setError("Failed to search jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        
        if (companyName || jobTitle || searchLocation) {
            fetchJobs();
        } else {
            setJobs([]); 
        }
    }, [companyName, jobTitle, searchLocation]); 

    
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
        const sortedJobs = [...jobs].sort((a, b) => {
            if (option === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (option === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
        setJobs(sortedJobs);
    };

    return (
        <div>
            <Navbar/>
        <div className="search-jobs-page">
            <h2 className="page-title">Search Jobs</h2>
            <div className="filters">
                <label htmlFor="sort" className="sort-label">Sort By:</label>
                <select id="sort" value={sortOption} onChange={handleSortChange} className="sort-select">
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                </select>
            </div>
            {loading ? (
                <p>Loading jobs...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <JobList jobs={jobs} />  
            )}
        </div>
        <Footer/>
        </div>
    );
}

export default SearchJobs;
