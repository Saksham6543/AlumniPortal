import React, { useState, useEffect } from 'react';
import './FlashMentorship.css';
import CreateMeetingForm from './CreateMeetingForm';
import MeetingList from './MeetingList';
import Footer from './Footer';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';

const FlashMentorship = () => {
    const { userRole } = useAuth(); 
    const [meetingsList, setMeetingsList] = useState([
        { id: 1, title: 'Career Guidance Session', date: '2024-09-10', time: '10:00 AM', description: 'Discussing career pathways', link: 'https://meet.google.com/abc-defg-hij' },
        { id: 2, title: 'Alumni Networking', date: '2024-09-15', time: '2:00 PM', description: 'Networking with alumni', link: 'https://meet.google.com/klm-nopq-rst' },
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        if (userRole === 'mentor') {
            setShowCreateForm(false); 
        }
    }, [userRole]);

    const addMeeting = (newMeeting) => {
        setMeetingsList([...meetingsList, { ...newMeeting, id: meetingsList.length + 1 }]);
    };

    const toggleCreateForm = () => {
        setShowCreateForm(true);
    };

    const showMeetingList = () => {
        setShowCreateForm(false);
    };

    return (
        <div>
            <Navbar/>
            <div className="mentorship-page1">
                <div className="mentorship-container1">
                    <aside className="sidebar1234">
                        <h2>Navigation</h2>
                        <ul>
                            {(userRole === 'alumni' || userRole === 'admin') && (
                                <li>
                                    <button className="toggle-button" onClick={toggleCreateForm}>
                                        Create a New Meeting
                                    </button>
                                </li>
                            )}
                            <li>
                                <button className="toggle-button" onClick={showMeetingList}>
                                    View Meetings
                                </button>
                            </li>
                        </ul>
                    </aside>

                    <main className="main-content1">
                        {showCreateForm && (userRole === 'alumni' || userRole === 'admin') && (
                            <section id="create-meeting">
                                <CreateMeetingForm addMeeting={addMeeting} />
                            </section>
                        )}

                        {!showCreateForm && (
                            <section id="view-meetings">
                                <h2>Upcoming Meetings</h2>
                                <MeetingList meetingsList={meetingsList} />
                            </section>
                        )}
                    </main>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default FlashMentorship;
