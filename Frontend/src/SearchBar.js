
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SearchBar() {
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSearch = (e) => {
        e.preventDefault();
        setError(null);

        if (!companyName && !jobTitle && !location) {
            setError('Please enter at least one search criteria.');
            return;
        }

        const searchParams = new URLSearchParams();

        if (companyName) searchParams.append('companyName', companyName.trim());
        if (jobTitle) searchParams.append('jobTitle', jobTitle.trim());
        if (location) searchParams.append('location', location.trim());

        navigate(`/career/searchjobs?${searchParams.toString()}`); 
    };

    return (
        <div className="search-section">
            <form onSubmit={handleSearch}>
                <div className="search-fields">
                    <input
                        type="text"
                        placeholder="Company Name (optional)"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="Job Title (optional)"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="search-input"
                    />
                    <input
                        type="text"
                        placeholder="Location (optional)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="search-input"
                    />
                </div>
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
        
    );
}

export default SearchBar;
