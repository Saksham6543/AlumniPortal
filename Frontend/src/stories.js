import React, { useState, useEffect } from 'react';
import './stories.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from './AuthContext';


function Stories() {
    const { userRole } = useAuth(); 
    const [activeItem, setActiveItem] = useState('All Campusfeeds');
    const [showSubItems, setShowSubItems] = useState(false);
    const [feeds, setFeeds] = useState([]);
    const [isFormVisible, setFormVisible] = useState(false);

    useEffect(() => {
        fetchFeeds();
    }, [activeItem]);

    const fetchFeeds = async () => {
        let url = 'http://localhost:8080/api/feeds';
        if (activeItem !== 'All Campusfeeds') {
            url += `/category/${activeItem}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setFeeds(data);
        } catch (error) {
            console.error('Error fetching feeds:', error);
        }
    };

    const addFeed = async (feed) => {
        try {
            const response = await fetch('http://localhost:8080/api/feeds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feed),
            });
            const newFeed = await response.json();
            setFeeds([...feeds, newFeed]);
        } catch (error) {
            console.error('Error adding feed:', error);
        }
    };

    const deleteFeed = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/feeds/${id}`, {
                method: 'DELETE',
            });
            setFeeds(feeds.filter(feed => feed.id !== id));
        } catch (error) {
            console.error('Error deleting feed:', error);
        }
    };

    const toggleSubItems = () => {
        setShowSubItems(!showSubItems);
    };

    const showForm = () => {
        setActiveItem('Add Story/Update');
        setFormVisible(true);
    };

    const hideForm = () => {
        setFormVisible(false);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        hideForm();
    };

    return (
        <div>
            <Navbar />
            <div className="container123">
                <Sidebar
                    activeItem={activeItem}
                    showSubItems={showSubItems}
                    toggleSubItems={toggleSubItems}
                    handleItemClick={handleItemClick}
                    showForm={showForm}
                    userRole={userRole}
                />
                {activeItem === 'Add Story/Update' && isFormVisible ? (
                    <FeedForm onAddFeed={addFeed} onClose={hideForm} />
                ) : (
                    <FeedList feeds={feeds} userRole={userRole} onDeleteFeed={deleteFeed} />
                )}
            </div>
            <Footer />
        </div>
    );
}


function Sidebar({ activeItem, showSubItems, toggleSubItems, handleItemClick, showForm, userRole }) {
    return (
        <div className="sidebar123">
            <ul className="categories123">
                <li className={`sidebar-item123 ${activeItem === 'All Campusfeeds' ? 'active' : ''}`} onClick={() => handleItemClick('All Campusfeeds')}>
                    <span className="sidebar-text123">All Campusfeeds</span>
                </li>
                <li className={`sidebar-item123 ${activeItem === 'Categories' ? 'active' : ''}`} onClick={toggleSubItems}>
                    <span className="sidebar-text123">Categories</span>
                </li>
                {showSubItems && (
                    <>
                        <li className={`sidebar-sub-item123 ${activeItem === 'Alumni Stories' ? 'active' : ''}`} onClick={() => handleItemClick('Alumni Stories')}>
                            Alumni Stories
                        </li>
                        <li className={`sidebar-sub-item123 ${activeItem === 'Institute Updates' ? 'active' : ''}`} onClick={() => handleItemClick('Institute Updates')}>
                            Institute Updates
                        </li>
                    </>
                )}
                {userRole === 'admin' && (
                    <li className="sidebar-item123" onClick={showForm}>
                        <span className="sidebar-text123">Add Story/Update</span>
                    </li>
                )}
            </ul>
        </div>
    );
}


function FeedList({ feeds, userRole, onDeleteFeed }) {
    return (
        <div className="feeds123">
            {feeds.map((feed, index) => (
                <div className="feed-item123" key={index}>
                    <div className="feed-date">{feed.date}</div>
                    <div className="feed-title">{feed.title}</div>
                    <div className="feed-description">{feed.description}</div>
                    <div className="feed-category">{feed.catagory}</div>
                    {userRole === 'admin' && (
                        <button onClick={() => onDeleteFeed(feed.id)}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    );
}


function FeedForm({ onAddFeed, onClose }) {
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [catagory, setCatagory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newFeed = { date, title, description, catagory };
        onAddFeed(newFeed);
        setDate('');
        setTitle('');
        setDescription('');
        setCatagory('');
    };

    return (
        <div className="form-container123">
            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Category:
                    <select value={catagory} onChange={(e) => setCatagory(e.target.value)} required>
                        <option value="">Select a category</option>
                        <option value="Alumni Stories">Alumni Stories</option>
                        <option value="Institute Updates">Institute Updates</option>
                    </select>
                </label>
                <button type="submit">Add Feed</button>
            </form>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default Stories;

