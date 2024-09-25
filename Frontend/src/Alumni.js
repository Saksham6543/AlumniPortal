import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    TextField,
    IconButton,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './Alumni.css';
import Navbar from './Navbar';
import Footer from './Footer';

const EventPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All Profiles');
    const [selectedYearOfPassing, setSelectedYearOfPassing] = useState('');
    const [selectedProgramme, setSelectedProgramme] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [alumniDetails, setAlumniDetails] = useState([]);

    useEffect(() => {
        if (selectedCategory === 'Year of Passing' && selectedYearOfPassing) {
            fetchAlumniByYearOfPassing(selectedYearOfPassing);
        } else if (selectedCategory === 'Programme / Course' && selectedProgramme) {
            fetchAlumniByProgramme(selectedProgramme);
        } else if (selectedCategory === 'Department' && selectedDepartment) {
            fetchAlumniByDepartment(selectedDepartment);
        } else if (selectedCategory === 'Designation' && selectedDesignation) {
            fetchAlumniByDesignation(selectedDesignation);
        }
    }, [selectedYearOfPassing, selectedProgramme, selectedDepartment, selectedDesignation, selectedCategory]);

    const fetchAlumniByYearOfPassing = async (year) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/alumni?year=${encodeURIComponent(year)}`);
            setAlumniDetails(response.data);
        } catch (error) {
            console.error('Error fetching alumni data', error);
            setAlumniDetails([]); 
        }
    };

    const fetchAlumniByProgramme = async (programme) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/alumni?degree=${encodeURIComponent(programme)}`);
            setAlumniDetails(response.data);
        } catch (error) {
            console.error('Error fetching alumni data', error);
            setAlumniDetails([]); 
        }
    };

    const fetchAlumniByDepartment = async (department) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/alumni?dept=${encodeURIComponent(department)}`);
            setAlumniDetails(response.data);
        } catch (error) {
            console.error('Error fetching alumni data', error);
            setAlumniDetails([]);
        }
    };

    const fetchAlumniByDesignation = async (designation) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/alumni?designation=${encodeURIComponent(designation)}`);
            setAlumniDetails(response.data);
        } catch (error) {
            console.error('Error fetching alumni data', error);
            setAlumniDetails([]); 
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        
        setSelectedYearOfPassing('');
        setSelectedProgramme('');
        setSelectedDepartment('');
        setSelectedDesignation('');
    };

    return (
        <div>
            <Navbar />
            <div className="container154">
                <div className="events-container">
                    <div className="left-division">
                        <h2>Filters</h2>
                        <div className="event-categories">
                            <button
                                className={`category-button ${selectedCategory === 'Year of Passing' ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('Year of Passing')}
                            >
                                Year of Passing
                            </button>
                            {selectedCategory === 'Year of Passing' && (
                                <TextField
                                    variant="outlined"
                                    label="Year of Passing"
                                    value={selectedYearOfPassing}
                                    onChange={(e) => setSelectedYearOfPassing(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{
                                        style: { color: 'white' }, 
                                    }}
                                    InputProps={{
                                        style: { color: 'white' }, 
                                    }}
                                />
                            )}
                            <button
                                className={`category-button ${selectedCategory === 'Programme / Course' ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('Programme / Course')}
                            >
                                Programme / Course
                            </button>
                            {selectedCategory === 'Programme / Course' && (
                                <TextField
                                    variant="outlined"
                                    label="Programme / Course"
                                    value={selectedProgramme}
                                    onChange={(e) => setSelectedProgramme(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{
                                        style: { color: 'white' }, 
                                    }}
                                    InputProps={{
                                        style: { color: 'white' }, 
                                    }}
                                />
                            )}
                            <button
                                className={`category-button ${selectedCategory === 'Department' ? 'active' : ''}`}
                                onClick={() => handleCategoryClick('Department')}
                            >
                                Department
                            </button>
                            {selectedCategory === 'Department' && (
                                <TextField
                                    variant="outlined"
                                    label="Department"
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                    InputProps={{
                                        style: { color: 'white' }, 
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="right-division">
                        {alumniDetails.length > 0 ? (
                            <div className="alumni-cards">
                                {alumniDetails.map((alumni) => (
                                    <div key={alumni.id} className="alumni-card">
                                        <h3>{alumni.name}</h3>
                                        <p><span className="info-label">Degree:</span> {alumni.degree}</p>
                                        <p><span className="info-label">Department:</span> {alumni.dept}</p>
                                        <p><span className="info-label">Year of Passing:</span> {alumni.yearOfPassing}</p>
                                        <p><span className="info-label">Email:</span> {alumni.email}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No alumni details available for the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EventPage;
