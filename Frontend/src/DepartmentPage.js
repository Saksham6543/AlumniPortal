// src/DepartmentPage.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DepartmentPage.css';
import Navbar from './Navbar';
import Footer from './Footer';

const DepartmentPage = () => {
    const { year } = useParams();
    const programs = {
        'Class of 2024': [
            {
                program: 'Engineering',
                departments: [
                    { name: 'Computer Science', members: 12 },
                    { name: 'Mechanical', members: 9 },
                    { name: 'Electrical', members: 5 }
                ]
            },
            {
                program: 'Arts',
                departments: [
                    { name: 'History', members: 6 },
                    { name: 'Literature', members: 7 },
                    { name: 'Philosophy', members: 5 }
                ]
            },
            {
                program: 'Science',
                departments: [
                    { name: 'Physics', members: 10 },
                    { name: 'Chemistry', members: 11 },
                    { name: 'Biology', members: 5 }
                ]
            }
        ],
        'Class of 2023': [
            {
                program: 'Commerce',
                departments: [
                    { name: 'Accounting', members: 8 },
                    { name: 'Finance', members: 7 },
                    { name: 'Marketing', members: 5 }
                ]
            },
            {
                program: 'Medical',
                departments: [
                    { name: 'Medicine', members: 12 },
                    { name: 'Nursing', members: 10 },
                    { name: 'Pharmacy', members: 9 }
                ]
            },
            {
                program: 'Law',
                departments: [
                    { name: 'Criminal Law', members: 6 },
                    { name: 'Civil Law', members: 5 },
                    { name: 'Corporate Law', members: 7 }
                ]
            }
        ],
        'Class of 2022': [
            {
                program: 'Education',
                departments: [
                    { name: 'Elementary Education', members: 7 },
                    { name: 'Secondary Education', members: 8 },
                    { name: 'Special Education', members: 6 }
                ]
            },
            {
                program: 'Business',
                departments: [
                    { name: 'Management', members: 9 },
                    { name: 'Entrepreneurship', members: 5 },
                    { name: 'Economics', members: 7 }
                ]
            },
            {
                program: 'Design',
                departments: [
                    { name: 'Graphic Design', members: 5 },
                    { name: 'Interior Design', members: 7 },
                    { name: 'Fashion Design', members: 6 }
                ]
            }
        ],
        'Class of 2021': [
            {
                program: 'Environmental Science',
                departments: [
                    { name: 'Ecology', members: 8 },
                    { name: 'Environmental Policy', members: 7 },
                    { name: 'Conservation', members: 5 }
                ]
            },
            {
                program: 'Media Studies',
                departments: [
                    { name: 'Journalism', members: 7 },
                    { name: 'Public Relations', members: 6 },
                    { name: 'Digital Media', members: 5 }
                ]
            }
        ],
        'Class of 2020': [
            {
                program: 'Music',
                departments: [
                    { name: 'Performance', members: 9 },
                    { name: 'Composition', members: 8 },
                    { name: 'Music Education', members: 7 }
                ]
            },
            {
                program: 'Theater',
                departments: [
                    { name: 'Acting', members: 5 },
                    { name: 'Directing', members: 7 },
                    { name: 'Stage Design', members: 5 }
                ]
            }
        ],
        'Class of 2019': [
            {
                program: 'Hospitality Management',
                departments: [
                    { name: 'Hotel Management', members: 10 },
                    { name: 'Restaurant Management', members: 9 },
                    { name: 'Event Planning', members: 4 }
                ]
            },
            {
                program: 'Sports Science',
                departments: [
                    { name: 'Exercise Science', members: 2 },
                    { name: 'Sports Medicine', members: 1 },
                    { name: 'Kinesiology', members: 5 }
                ]
            }
        ],
        'Class of 2018': [
            {
                program: 'Engineering Technology',
                departments: [
                    { name: 'Automation', members: 8 },
                    { name: 'Manufacturing', members: 3 },
                    { name: 'Construction', members: 1 }
                ]
            },
            {
                program: 'Applied Sciences',
                departments: [
                    { name: 'Biotechnology', members: 7 },
                    { name: 'Materials Science', members: 4 },
                    { name: 'Forensic Science', members: 3 }
                ]
            }
        ],
        'Class of 2017': [
            {
                program: 'Social Work',
                departments: [
                    { name: 'Child Welfare', members: 6 },
                    { name: 'Community Development', members: 5 },
                    { name: 'Mental Health', members: 4 }
                ]
            },
            {
                program: 'Public Health',
                departments: [
                    { name: 'Epidemiology', members: 8 },
                    { name: 'Health Policy', members: 7 },
                    { name: 'Environmental Health', members: 5 }
                ]
            }
        ],
        'Class of 2016': [
            {
                program: 'Architecture',
                departments: [
                    { name: 'Urban Planning', members: 5 },
                    { name: 'Landscape Architecture', members: 7 },
                    { name: 'Building Design', members: 9 }
                ]
            },
            {
                program: 'Film Studies',
                departments: [
                    { name: 'Cinematography', members: 6 },
                    { name: 'Screenwriting', members: 5 },
                    { name: 'Film Production', members: 7 }
                ]
            }
        ],
        'Class of 2015': [
            {
                program: 'International Relations',
                departments: [
                    { name: 'Diplomacy', members: 9 },
                    { name: 'Conflict Resolution', members: 5 },
                    { name: 'Global Governance', members: 1 }
                ]
            },
            {
                program: 'Sociology',
                departments: [
                    { name: 'Social Theory', members: 7 },
                    { name: 'Criminology', members: 6 },
                    { name: 'Social Research', members: 1 }
                ]
            }
        ],
        'Class of 2014': [
            {
                program: 'Veterinary Science',
                departments: [
                    { name: 'Animal Medicine', members: 10 },
                    { name: 'Surgery', members: 5 },
                    { name: 'Animal Nutrition', members: 9 }
                ]
            },
            {
                program: 'Nutrition',
                departments: [
                    { name: 'Clinical Nutrition', members: 7 },
                    { name: 'Public Health Nutrition', members: 5 },
                    { name: 'Sports Nutrition', members: 8 }
                ]
            }
        ],
        'Class of 2013': [
            {
                program: 'Philosophy',
                departments: [
                    { name: 'Ethics', members: 5 },
                    { name: 'Logic', members: 4 },
                    { name: 'Metaphysics', members: 1 }
                ]
            },
            {
                program: 'Theology',
                departments: [
                    { name: 'Biblical Studies', members: 6 },
                    { name: 'Church History', members: 5 },
                    { name: 'Systematic Theology', members: 1 }
                ]
            }
        ],
    };

    const selectedPrograms = programs[year] || [];

   
    const totalMembers = selectedPrograms.reduce((total, program) => {
        return total + program.departments.reduce((sum, department) => sum + department.members, 0);
    }, 0);

   
    useEffect(() => {
        const allTotalMembers = JSON.parse(localStorage.getItem('totalMembers')) || {};
        allTotalMembers[year] = totalMembers;
        localStorage.setItem('totalMembers', JSON.stringify(allTotalMembers));
    }, [totalMembers, year]);

    return (
        <div>
            <Navbar/>
            <h1 style={{ marginLeft: '120px' }}>{year}</h1>
            <div className="container1">
                <div className="events-container1">
                    <div className="program-grid1">
                        {selectedPrograms.map((program, index) => (
                            <div key={index} className="program-section1">
                                <h2>{program.program}</h2>
                                <div className="button-grid1">
                                    {program.departments.map((department, deptIndex) => (
                                        <button key={deptIndex} className="grid-button1">
                                            <div className="department-name1">{department.name}</div>
                                            <div className="department-members1">{department.members} Members</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DepartmentPage;