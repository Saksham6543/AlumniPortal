import React from 'react';

function JobCard({ job }) {
    return (
        <div className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>Type: {job.type}</p>
            <p>{job.description}</p>
            <button className="apply-button">Apply Now</button>
        </div>
    );
}

export default JobCard;
