import React, { useState } from 'react';

const CreateMeetingForm = ({ addMeeting }) => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [meetingDescription, setMeetingDescription] = useState('');
    const [meetLink, setMeetLink] = useState('');

    const generateMeetLink = () => {
        const link = `https://meet.google.com/new`;
        setMeetLink(link);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (meetingTitle && meetingDate && meetingTime && meetingDescription && meetLink) {
            addMeeting({ title: meetingTitle, date: meetingDate, time: meetingTime, description: meetingDescription, link: meetLink });
            setMeetingTitle('');
            setMeetingDate('');
            setMeetingTime('');
            setMeetingDescription('');
            setMeetLink('');
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <div className="create-meeting-form">
            <h2>Create a New Meeting</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="Meeting Title"
                    required
                />
                <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    required
                />
                <textarea
                    value={meetingDescription}
                    onChange={(e) => setMeetingDescription(e.target.value)}
                    placeholder="Meeting Description"
                    required
                ></textarea>
                <button type="button" onClick={generateMeetLink}>
                    Generate Meet Link
                </button>
                {meetLink && (
                    <div className="meet-link">
                        <p>Meet link: <a href={meetLink} target="_blank" rel="noopener noreferrer">{meetLink}</a></p>
                    </div>
                )}
                <button type="submit">Post Meeting</button>
            </form>
        </div>
    );
};

export default CreateMeetingForm;