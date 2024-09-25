import React from 'react';
import './JobList.css';

function JobList({ jobs }) {
    return (
        <div className="job-list">
            {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">{job.company}</p>
                    <p className="job-location">{job.location}</p>
                    <p className="job-date">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
                    <a href={job.link} className="job-apply-button" target="_blank" rel="noopener noreferrer">
                        Apply Now
                    </a>
                </div>
            ))}
        </div>
    );
}

export default JobList;
