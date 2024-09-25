import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import RegistrationForm from './RegistrationForm';
import Dashboard from './Dashboard';
import Stories from './stories';
import About from './About';
import { useAuth } from './AuthContext';
import Alumni from './Alumni';
import Events from './Events';
import Batchmates from './Batchmates';
import DepartmentPage from './DepartmentPage';
import Career from './Career';
import JobsPage from './JobsPage';
import JobDetail from './JobDetail'; 
import AllOpportunitiesPage from './JobPage/AllOppurtunitiesPage';
import AppliedByMePage from './JobPage/AppliedByMePage';
import InternshipsPage from './JobPage/InternshipsPage';
import PostedByMePage from './JobPage/PostedByMePage';
import JobPage from './JobPage/JobPage';
import SearchJobs from './JobPage/SearchJobs';
import Mentor from './FlashMentorship';
import ProfilePage from './ProfilePage';
import Donation from './Donation';


const App = () => {
  const { isLoggedIn, userName, login, logout } = useAuth();
  const [jobs, setJobs] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Homepage isLoggedIn={isLoggedIn} userName={userName} onLogout={logout} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/login"
          element={<LoginPage onLogin={login} />}
        />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/about" element={<About />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/events" element={<Events />} />
        <Route path="/career" element={<Career />} />
        <Route path="/career/searchjobs" element={<SearchJobs/>}/>
        <Route path="/career/allopportunities" element = {<AllOpportunitiesPage/>}/>
        <Route path="/career/appliedbyme" element ={<AppliedByMePage/>}/>
        <Route path="/career/internships" element={<InternshipsPage/>}/>
        <Route path="/career/jobpage" element={<JobPage/>}/>
        <Route path="/career/postedbyme" element={<PostedByMePage/>}/>
        <Route path="/jobs/:category" element={<JobsPage jobs={jobs} />} /> 
        <Route path="/job/:id" element={<JobDetail jobs={jobs} />} /> 
        <Route path="/batchmates" element={<Batchmates />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/departments/:year" element={<DepartmentPage />} />
      </Routes>
    </Router>
  );
};

export default App;