import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobList from './JobList';

function PostedByMePage() {
    const [jobs, setJobs] = useState([]);
    const [sortOption, setSortOption] = useState('date');

    useEffect(() => {
        axios.get('/api/jobs/posted-by-me')
            .then(response => setJobs(response.data))
            .catch(error => console.error("Error fetching jobs:", error));
    }, []);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        const sortedJobs = [...jobs].sort((a, b) => {
            if (e.target.value === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (e.target.value === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
        setJobs(sortedJobs);
    };

    return (
        <div className="jobs-page">
            <h2>Posted By Me</h2>
            <div className="filters">
                <label>Sort By:</label>
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                </select>
            </div>
            <JobList jobs={jobs} />
        </div>
    );
}

export default PostedByMePage;
