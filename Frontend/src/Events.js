import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import './Events.css';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

const FoodEventPage = () => {
    const { userRole } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('All Events');
    const [formVisible, setFormVisible] = useState(false);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
    });
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, [selectedCategory]);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events');
            let filteredEvents = response.data;

            if (selectedCategory === 'Upcoming Events') {
                const currentDate = new Date();
                filteredEvents = response.data.filter(event => new Date(event.date) > currentDate);
            }

            setEvents(filteredEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'Add Event') {
            setFormVisible(true);
        } else {
            setFormVisible(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSaveEvent = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/events', eventData);
            console.log('Event saved successfully:', response.data);
            setEventData({
                title: '',
                description: '',
                date: '',
            });
            fetchEvents(); // Refresh the event list after saving
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/events/${id}`);
            console.log('Event deleted successfully');
            fetchEvents(); // Refresh the event list after deleting
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="platter">
                <div className="feast-container">
                    <div className="starter-section">
                        <div className="menu-categories">
                            <h2>MENU CATEGORIES</h2>
                            <button 
                                className={`menu-button ${selectedCategory === 'All Events' ? 'active' : ''}`} 
                                onClick={() => handleCategoryClick('All Events')}
                            >
                                All Events 
                            </button>
                            <button 
                                className={`menu-button ${selectedCategory === 'Upcoming Events' ? 'active' : ''}`} 
                                onClick={() => handleCategoryClick('Upcoming Events')}
                            >
                                Upcoming Events 
                            </button>
                            {userRole === 'admin'  && (
                            <button 
                                className={`menu-button ${selectedCategory === 'Add Event' ? 'active' : ''}`} 
                                onClick={() => handleCategoryClick('Add Event')}
                            >
                                Add Event 
                            </button>
                            )}
                        </div>
                    </div>
                    <div className="main-course-section">
                        <h2>{selectedCategory}</h2>
                        {formVisible ? (
                            <form className="event-form" onSubmit={(e) => e.preventDefault()}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={eventData.title}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{
                                        style: { backgroundColor: '#333', color: '#fff' },
                                    }}
                                    InputLabelProps={{ style: { color: '#fff' } }}
                                />
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={eventData.description}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    InputProps={{
                                        style: { backgroundColor: '#333', color: '#fff' },
                                    }}
                                    InputLabelProps={{ style: { color: '#fff' } }}
                                />
                                <TextField
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={eventData.date}
                                    onChange={handleInputChange}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                                    InputProps={{
                                        style: { backgroundColor: '#333', color: '#fff' },
                                    }}
                                />
                                <Button 
                                    variant="contained" 
                                    className="save-event-button"
                                    style={{ backgroundColor: '#f00', color: '#fff', marginTop: '20px' }}
                                    onClick={handleSaveEvent}
                                >
                                    Save Event
                                </Button>
                            </form>
                        ) : (
                            <ul>
                                {events.length > 0 ? (
                                    events.map((event) => (
                                        <li key={event.id} className="event-item">
                                            <h3>{event.title}</h3>
                                            <p>{event.description}</p>
                                            <p>{event.date}</p>
                                            { userRole === 'admin'  && (
                                            <IconButton onClick={() => handleDeleteEvent(event.id)}>
                                                <DeleteIcon style={{ color: '#f00', backgroundColor:"white" }} />
                                            </IconButton>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li>No events to display at the moment.</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FoodEventPage;
