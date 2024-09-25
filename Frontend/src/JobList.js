import React from 'react';
import { useParams } from 'react-router-dom';

function JobDetail({ jobs }) {
    const { id } = useParams();
    const job = jobs.find(job => job.id === id);

    if (!job) return <p>Job not found.</p>;

    return (
        <div className="job-detail">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Deadline:</strong> {job.deadline}</p>
            <p><strong>Application Link:</strong> <a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a></p>
        </div>
    );
}

export default JobDetail;
