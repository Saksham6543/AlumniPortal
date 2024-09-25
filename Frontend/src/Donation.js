import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Donations.css';
import Navbar from './Navbar';
import Footer from './Footer';

const projects = [
  { id: 1, name: 'Support Education for Underprivileged Children' },
  { id: 2, name: 'Provide Medical Aid to Rural Areas' },
  { id: 3, name: 'Plant Trees to Combat Climate Change' },
  { id: 4, name: 'Rescue and Shelter Abandoned Animals' },
  { id: 5, name: 'Build Clean Water Wells in Africa' },
  { id: 6, name: 'Empower Women with Skill Development' },
];

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  const navigate = useNavigate(); 

  const handleDonate = (e) => {
    e.preventDefault();

   
    const paymentGatewayUrl = `https://your-payment-gateway.com?amount=${amount}&name=${name}&email=${email}&project=${selectedProject}`;

    console.log({
      amount,
      name,
      email,
      message,
      project: selectedProject,
    });

    
    window.location.href = paymentGatewayUrl;


  };

  return (
    <div style={{backgroundColor:"black"}}>
        <Navbar/>
        <div className="donation-container">
        <h1>Make a Donation</h1>
        <form onSubmit={handleDonate} className="donation-form">
            <div className="form-group">
            <label htmlFor="project">Select Project</label>
            <select
                id="project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                required
            >
                {projects.map((project) => (
                <option key={project.id} value={project.id}>
                    {project.name}
                </option>
                ))}
            </select>
            </div>
            <div className="form-group">
            <label htmlFor="amount">Donation Amount</label>
            <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            </div>
            <button type="submit" className="donate-button">Donate</button>
        </form>
        </div>
        <Footer/>
    </div>
  );
};

export default Donation;