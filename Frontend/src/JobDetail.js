import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function JobDetail() {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        axios.get(`/api/jobs/${id}`)
            .then(response => setJob(response.data))
            .catch(error => console.error("Error fetching job details:", error));
    }, [id]);

    if (!job) return <p>Job not found.</p>;

    return (
        <div className="job-detail">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</p>
            <p><strong>Application Link:</strong> <a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a></p>
        </div>
    );
}

export default JobDetail;
