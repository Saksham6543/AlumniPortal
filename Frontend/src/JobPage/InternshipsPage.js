import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobList from './JobList';
import './styles.css'; 
import Footer from '../Footer';
import Navbar from '../Navbar';

function InternshipsPage() {
    const [jobs, setJobs] = useState([]);
    const [sortOption, setSortOption] = useState('date');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/jobs/type/internship'); 
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setError("Failed to load internships. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) return <p>Loading internships...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar/>
        <div className="jobs-page">
            <h2 className="page-title">Internships</h2>
            <div className="filters">
                <label htmlFor="sort" className="sort-label">Sort By:</label>
                <select id="sort" value={sortOption} onChange={handleSortChange} className="sort-select">
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                </select>
            </div>
            <JobList jobs={jobs} />
        </div>
        <Footer/>
        </div>

    );
}

export default InternshipsPage;
