import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import './RegistrationForm.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    gender: '',
    dob: '',
    degree: '',
    dept: '', 
    yearOfPassing: '',
    mobile1: '',
    mobile2: '',
    email: '',
    alternateEmail: '',
    currentAddress: '',
    permanentAddress: '',
    country: '',
    state: '',
    city: '',
    workingStatus: '',
    currentOrganisation: '',
    currentPosition: '',
    yearOfJoining: '',
    pastExperience: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    website: '',
    password: '',
    confirmPassword: '',
    checkboxUpdate: false,
  });

  const [sectionVisibility, setSectionVisibility] = useState({
    personalDetails: true,
    contactDetails: false,
    professionalDetails: false,
    socialMediaDetails: false,
    consent: false,
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPersonalDetailsFilled = formData.name && formData.role && formData.gender && formData.dob && formData.degree && formData.dept && formData.yearOfPassing;
    const isContactDetailsFilled = formData.mobile1 && formData.email && formData.currentAddress && formData.permanentAddress && formData.country && formData.state && formData.city;
    const isPasswordValid = formData.password && formData.password === formData.confirmPassword;

    if (isPersonalDetailsFilled && isContactDetailsFilled && isPasswordValid) {
      try {

        
        const response = await axios.post('http://localhost:8080/api/alumni', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setMessage('Registered successfully!');
          login(formData.name);

          localStorage.setItem('userName', formData.name);

          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          alert('Failed to register. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    } else if (!isPasswordValid) {
      alert('Passwords do not match.');
    } else {
      alert('Please fill all required fields.');
    }
  };

  const handleNextSection = (currentSection) => {
    const newSectionVisibility = { ...sectionVisibility };
    newSectionVisibility[currentSection] = false;

    switch (currentSection) {
      case 'personalDetails':
        newSectionVisibility.contactDetails = true;
        break;
      case 'contactDetails':
        newSectionVisibility.professionalDetails = true;
        break;
      case 'professionalDetails':
        newSectionVisibility.socialMediaDetails = true;
        break;
      case 'socialMediaDetails':
        newSectionVisibility.consent = true;
        break;
      default:
        break;
    }

    setSectionVisibility(newSectionVisibility);
  };

  const handlePreviousSection = (currentSection) => {
    const newSectionVisibility = { ...sectionVisibility };
    newSectionVisibility[currentSection] = false;

    switch (currentSection) {
      case 'contactDetails':
        newSectionVisibility.personalDetails = true;
        break;
      case 'professionalDetails':
        newSectionVisibility.contactDetails = true;
        break;
      case 'socialMediaDetails':
        newSectionVisibility.professionalDetails = true;
        break;
      case 'consent':
        newSectionVisibility.socialMediaDetails = true;
        break;
      default:
        break;
    }

    setSectionVisibility(newSectionVisibility);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const degreeOptions = ['Bachelors', 'Masters', 'PhD']; 
  const currentYear = new Date().getFullYear();
  const startYear = 2010;
  const endYear = currentYear + 5;

  const yearOptions = [];
  for (let year = startYear; year <= endYear; year++) {
    yearOptions.push(year);
  }

  const roleOptions = ['Alumni', 'Student', 'Staff'];

  return (
    <form onSubmit={handleSubmit} className="form-container12">
    
      {sectionVisibility.personalDetails && (
        <div className="section">
          <h3 className="section-title">Personal Details</h3>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="name" className="form-label">Name <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="name" id="name"
                value={formData.name} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="role" className="form-label">Role <span className="asteriskField">*</span></label>
              <select name="role" className="form-select" id="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select role</option>
                {roleOptions.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <label htmlFor="gender" className="form-label">Gender <span className="asteriskField">*</span></label>
              <select name="gender" className="form-select" id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-lg-3">
              <label htmlFor="dob" className="form-label">Date of Birth <span className="asteriskField">*</span></label>
              <input type="date" className="form-control" name="dob" id="dob"
                value={formData.dob} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="degree" className="form-label">Degree <span className="asteriskField">*</span></label>
              <select name="degree" className="form-select" id="degree" value={formData.degree} onChange={handleChange} required>
                <option value="">Select degree</option>
                {degreeOptions.map((degree, index) => (
                  <option key={index} value={degree}>{degree}</option>
                ))}
              </select>
            </div>
             <div className="col-lg-6">
              <label htmlFor="dept" className="form-label">Department <span className="asteriskField">*</span></label>
              <select name="dept" className="form-select" id="dept" value={formData.dept} onChange={handleChange} required>
                <option value="">Select Dept</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechatronics">Mechatronics</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Information Technology">Information Technology</option>
              </select>
            </div>
            <div className="col-lg-6">
              <label htmlFor="yearOfPassing" className="form-label">Year of Graduation <span className="asteriskField">*</span></label>
              <select name="yearOfPassing" className="form-select" id="yearOfPassing" value={formData.yearOfPassing} onChange={handleChange} required>
                <option value="">Select year</option>
                {yearOptions.map((year, index) => (
                  <option key={index} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handleNextSection('personalDetails')}>Next</button>
          <button type="button" className="btn btn-link" onClick={handleLoginRedirect}>Already have an account? Login</button>
        </div>
      )}

      {sectionVisibility.contactDetails && (
        <div className="section">
          <h3 className="section-title">Contact Details</h3>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="mobile1" className="form-label">Mobile 1 <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="mobile1" id="mobile1"
                value={formData.mobile1} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="mobile2" className="form-label">Mobile 2</label>
              <input type="text" className="form-control" name="mobile2" id="mobile2"
                value={formData.mobile2} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="email" className="form-label">Email <span className="asteriskField">*</span></label>
              <input type="email" className="form-control" name="email" id="email"
                value={formData.email} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="alternateEmail" className="form-label">Alternate Email</label>
              <input type="email" className="form-control" name="alternateEmail" id="alternateEmail"
                value={formData.alternateEmail} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="currentAddress" className="form-label">Current Address <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="currentAddress" id="currentAddress"
                value={formData.currentAddress} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="permanentAddress" className="form-label">Permanent Address <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="permanentAddress" id="permanentAddress"
                value={formData.permanentAddress} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="country" className="form-label">Country <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="country" id="country"
                value={formData.country} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="state" className="form-label">State <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="state" id="state"
                value={formData.state} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="city" className="form-label">City <span className="asteriskField">*</span></label>
              <input type="text" className="form-control" name="city" id="city"
                value={formData.city} onChange={handleChange} required />
            </div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handlePreviousSection('contactDetails')}>Previous</button>
          <button type="button" className="btn btn-secondary" onClick={() => handleNextSection('contactDetails')}>Next</button>
        </div>
      )}


      {sectionVisibility.professionalDetails && (
        <div className="section">
          <h3 className="section-title">Professional Details</h3>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="workingStatus" className="form-label">Working Status <span className="asteriskField">*</span></label>
              <select name="workingStatus" className="form-select" id="workingStatus" value={formData.workingStatus} onChange={handleChange} required>
                <option value="">Select status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
            <div className="col-lg-6">
              <label htmlFor="currentOrganisation" className="form-label">Current Organisation</label>
              <input type="text" className="form-control" name="currentOrganisation" id="currentOrganisation"
                value={formData.currentOrganisation} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="currentPosition" className="form-label">Current Position</label>
              <input type="text" className="form-control" name="currentPosition" id="currentPosition"
                value={formData.currentPosition} onChange={handleChange} />
            </div>
             <div className="col-lg-3">
              <label htmlFor="dob" className="form-label">Year of Joining <span className="asteriskField">*</span></label>
              <input  className="form-control" name="yearOfJoining" id="yearOfJoining"
                value={formData.yearOfJoining} onChange={handleChange} required />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <label htmlFor="pastExperience" className="form-label">Past Experience</label>
              <textarea className="form-control" name="pastExperience" id="pastExperience"
                value={formData.pastExperience} onChange={handleChange} rows="3"></textarea>
            </div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handlePreviousSection('professionalDetails')}>Previous</button>
          <button type="button" className="btn btn-secondary" onClick={() => handleNextSection('professionalDetails')}>Next</button>
        </div>
      )}

      {sectionVisibility.socialMediaDetails && (
        <div className="section">
          <h3 className="section-title">Social Media Links</h3>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="linkedin" className="form-label">LinkedIn</label>
              <input type="url" className="form-control" name="linkedin" id="linkedin"
                value={formData.linkedin} onChange={handleChange} />
            </div>
            <div className="col-lg-6">
              <label htmlFor="facebook" className="form-label">Facebook</label>
              <input type="url" className="form-control" name="facebook" id="facebook"
                value={formData.facebook} onChange={handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="instagram" className="form-label">Instagram</label>
              <input type="url" className="form-control" name="instagram" id="instagram"
                value={formData.instagram} onChange={handleChange} />
            </div>
            <div className="col-lg-6">
              <label htmlFor="website" className="form-label">Website</label>
              <input type="url" className="form-control" name="website" id="website"
                value={formData.website} onChange={handleChange} />
            </div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handlePreviousSection('socialMediaDetails')}>Previous</button>
          <button type="button" className="btn btn-secondary" onClick={() => handleNextSection('socialMediaDetails')}>Next</button>
        </div>
      )}


      {sectionVisibility.consent && (
        <div className="section">
          <h3 className="section-title">Consent and Password</h3>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="password" className="form-label">Password <span className="asteriskField">*</span></label>
              <input type="password" className="form-control" name="password" id="password"
                value={formData.password} onChange={handleChange} required />
            </div>
            <div className="col-lg-6">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="asteriskField">*</span></label>
              <input type="password" className="form-control" name="confirmPassword" id="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => handlePreviousSection('consent')}>Previous</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      )}
    </form>
  );
};

export default FormComponent;