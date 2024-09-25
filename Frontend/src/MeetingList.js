import React from 'react';

const MeetingList = ({ meetingsList }) => {
    return (
        <div className="meeting-list">
            {meetingsList.length > 0 ? (
                meetingsList.map(meeting => (
                    <div className="meeting-card" key={meeting.id}>
                        <h3>{meeting.title}</h3>
                        <p><strong>Date:</strong> {meeting.date}</p>
                        <p><strong>Time:</strong> {meeting.time}</p>
                        <p><strong>Description:</strong> {meeting.description}</p>
                        <a href={meeting.link} target="_blank" rel="noopener noreferrer" className="btn-primary">Join Meeting</a>
                    </div>
                ))
            ) : (
                <p>No meetings available.</p>
            )}
        </div>
    );
};

export default MeetingList;