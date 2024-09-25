import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { useAuth } from './AuthContext';
import Footer from './Footer';
import Navbar from './Navbar';

const ProfilePage = () => {
  
  const { userEmail } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  
  useEffect(() => {
    console.log(userEmail);
    if (userEmail) {
      axios.get(`http://localhost:8080/api/alumni/findByEmail?email=${userEmail}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data');
        setLoading(false);
      });
    }
  }, [userEmail]);

  const handleEditClick = (section) => {
    setEditingSection(section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    if (userEmail && profile) {
      axios.put(`http://localhost:8080/api/alumni/email/${userEmail}`, profile)
        .then((response) => {
          console.log('Profile updated successfully:', response.data);
          setEditingSection(null);
        })
        .catch((error) => {
          console.error('Error updating profile data:', error);
        });
    }
  };

  const renderEditableField = (field, value, section) => {
    if (editingSection === section) {
      return (
        <input
          type="text"
          name={field}
          value={value || ''}
          onChange={handleChange}
          className="profile-input1234"
          style={{ width: '35%' }}
        />
      );
    }
    return <p>{value || 'Not available'}</p>;
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>No profile data available</p>;
  }

  return (
    <div>
      <Navbar/>
    <div className="profile-page1234">
      <div className="profile-sidebar1234">
        <h2>{profile.name || 'No Name'}</h2>
        <p>{profile.email || 'No Email'}</p>
        <div className="profile-section1234">
          <h3>Basic Information <span onClick={() => handleEditClick('basicInfo')}>Edit</span></h3>
          {editingSection === 'basicInfo' ? (
            <>
              {renderEditableField('degree', profile.degree, 'basicInfo')}
              {renderEditableField('dept', profile.dept, 'basicInfo')}
              {renderEditableField('gender', profile.gender, 'basicInfo')}
              {renderEditableField('dob', profile.dob, 'basicInfo')}
              {renderEditableField('mobile1', profile.mobile1, 'basicInfo')}
              {renderEditableField('mobile2', profile.mobile2, 'basicInfo')}
              <button className="save-button1234" onClick={handleSaveClick} style={{
                padding: '5px 2px',
                fontSize: '12px',
                borderRadius: '4px',
                width: '150px',
              }}>Save</button>
            </>
          ) : (
            <>
              <p>Degree: {profile.degree || 'N/A'}</p>
              <p>Department: {profile.dept || 'N/A'}</p>
              <p>Gender: {profile.gender || 'N/A'}</p>
              <p>Date of Birth: {profile.dob || 'N/A'}</p>
              <p>Mobile 1: {profile.mobile1 || 'N/A'}</p>
              <p>Mobile 2: {profile.mobile2 || 'N/A'}</p>
            </>
          )}
        </div>

        <div className="profile-section1234">
          <h3>Contact Information <span onClick={() => handleEditClick('contactInfo')}>Edit</span></h3>
          {editingSection === 'contactInfo' ? (
            <>
              {renderEditableField('email', profile.email, 'contactInfo')}
              {renderEditableField('linkedin', profile.linkedin, 'contactInfo')}
              {renderEditableField('website', profile.website, 'contactInfo')}
              {renderEditableField('mobile1', profile.mobile1, 'contactInfo')}
              <button className="save-button1234" onClick={handleSaveClick} style={{
                padding: '5px 2px',
                fontSize: '12px',
                borderRadius: '4px',
                width: '150px',
              }}>Save</button>
            </>
          ) : (
            <>
              <p>Email: {profile.email || 'N/A'}</p>
              <p>LinkedIn: {profile.linkedin || 'N/A'}</p>
              <p>Website: {profile.website || 'N/A'}</p>
              <p>Mobile 1: {profile.mobile1 || 'N/A'}</p>
            </>
          )}
        </div>
      </div>

      <div className="profile-main1234">
        <div className="profile-main-section1234">
          <h3>Work Experience <span onClick={() => handleEditClick('workExperience')}>Edit</span></h3>
          {editingSection === 'workExperience' ? (
            <>
              {renderEditableField('workingStatus', profile.workingStatus, 'workExperience')}
              {renderEditableField('currentOrganisation', profile.currentOrganisation, 'workExperience')}
              {renderEditableField('currentPosition', profile.currentPosition, 'workExperience')}
              {renderEditableField('pastExperience', profile.pastExperience, 'workExperience')}
              <button className="save-button1234" onClick={handleSaveClick} style={{
                padding: '5px 2px',
                fontSize: '12px',
                borderRadius: '4px',
                width: '150px',
              }}>Save</button>
            </>
          ) : (
            <>
              <p>Working Status: {profile.workingStatus || 'N/A'}</p>
              <p>Current Organisation: {profile.currentOrganisation || 'N/A'}</p>
              <p>Current Position: {profile.currentPosition || 'N/A'}</p>
              <p>Past Experience: {profile.pastExperience || 'N/A'}</p>
            </>
          )}
        </div>

        <div className="profile-main-section1234">
          <h3>Education <span onClick={() => handleEditClick('education')}>Edit</span></h3>
          {editingSection === 'education' ? (
            <>
              {renderEditableField('degree', profile.degree, 'education')}
              {renderEditableField('dept', profile.dept, 'education')}
              {renderEditableField('yearOfJoining', profile.yearOfJoining, 'education')}
              {renderEditableField('yearOfPassing', profile.yearOfPassing, 'education')}
              <button className="save-button1234" onClick={handleSaveClick} style={{
                padding: '5px 2px',
                fontSize: '12px',
                borderRadius: '4px',
                width: '150px',
              }}>Save</button>
            </>
          ) : (
            <>
              <p>Degree: {profile.degree || 'N/A'}</p>
              <p>Department: {profile.dept || 'N/A'}</p>
              <p>Year of Joining: {profile.yearOfJoining || 'N/A'}</p>
              <p>Year of Passing: {profile.yearOfPassing || 'N/A'}</p>
            </>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProfilePage;
