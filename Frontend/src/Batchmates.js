import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Batchmates.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Batchmates = () => {
    const navigate = useNavigate();
    const [classData, setClassData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        const fetchClassData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/alumni');
                const alumniData = await response.json();

                
                const membersByYear = alumniData.reduce((acc, alumni) => {
                    const year = alumni.yearOfJoining;
                    acc[year] = (acc[year] || 0) + 1;
                    return acc;
                }, {});

                
                const data = Object.keys(membersByYear).map(year => ({
                    year,
                    members: membersByYear[year],
                }));

                setClassData(data);
            } catch (error) {
                console.error('Failed to fetch class data:', error);
            }
        };

        fetchClassData();
    }, []);

    const handleClick = async (year) => {
        setSelectedYear(year);

        
        try {
            const response = await fetch(`http://localhost:8080/api/alumni/departments?year=${year}`);
            const departmentsData = await response.json();
            setDepartments(departmentsData);
            setUsers([]); 
        } catch (error) {
            console.error('Failed to fetch departments:', error);
        }
    };

    const handleDepartmentClick = async (department) => {
      
        try {
            const response = await fetch(`http://localhost:8080/api/alumni?year=${selectedYear}&dept=${department}`);
            const usersData = await response.json();
            setUsers(usersData);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container2">
                <div className="events-container2">
                    {users.length === 0 ? (
                        selectedYear === null ? (
                            <div className="button-grid2">
                                {classData.map((data, index) => (
                                    <button
                                        key={index}
                                        className="grid-button2"
                                        onClick={() => handleClick(data.year)}
                                    >
                                        <div className="class-year2">Class of {data.year}</div>
                                        <div className="member-count2">{data.members} Members</div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="button-grid2">
                                {departments.map((department, index) => (
                                    <button
                                        key={index}
                                        className="grid-button2"
                                        onClick={() => handleDepartmentClick(department)}
                                    >
                                        <div className="class-year2">{department} Department</div>
                                    </button>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="users-list">
                            {users.length > 0 && (
                                <h3>Users in {selectedYear} - {departments.find(dept => dept === users[0]?.dept)}</h3>
                            )}
                            <div className="users-list">
                                {users.map((user, index) => (
                                    <div key={index} className="user-card">
                                        <h4>{user.name}</h4>
                                        <p><strong>Email:</strong> {user.email}</p>
                                        <p><strong>Position:</strong> {user.currentPosition}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Batchmates;