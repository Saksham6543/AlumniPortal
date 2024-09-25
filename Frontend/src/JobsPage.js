import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobList from './JobList';
import axios from 'axios';

function JobsPage() {
    const { category } = useParams();
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs');
                console.log("Fetched jobs:", response.data);
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setError("There was an error fetching the jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    
    const filteredJobs = jobs.filter(job => {
        if (category === 'all-opportunities') return true;
        if (category === 'jobs') return job.type === 'full-time' || job.type === 'part-time';
        if (category === 'internships') return job.type === 'internship';
        if (category === 'posted-by-me') return job.postedByMe;
        if (category === 'applied-by-me') return job.appliedByMe;
        return false;
    });

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="jobs-page">
            <h2>{category.replace(/-/g, ' ').toUpperCase()}</h2>
            {filteredJobs.length > 0 ? (
                <JobList jobs={filteredJobs} />
            ) : (
                <p>No jobs available in this category.</p>
            )}
        </div>
    );
}

export default JobsPage;
