import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [formError, setFormError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username && formData.password) {
      try {

        const studentResponse = await axios.post('http://localhost:8080/api/students/login', {
          email: formData.username,
          password: formData.password,
        });

        if (studentResponse.status === 200) {
          const { email } = studentResponse.data;
          setSuccessMessage('Login successful as Student! Redirecting to homepage...');
          login(formData.username, 'student');
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
          return;
        }
      } catch (studentError) {
        try {
         
          const alumniResponse = await axios.post('http://localhost:8080/api/alumni/login', {
            email: formData.username,
            password: formData.password,
          });

          if (alumniResponse.status === 200) {
            const { role } = alumniResponse.data;
            setSuccessMessage('Login successful as Alumni ! Redirecting to homepage...');
            login(formData.username, 'alumni');
            setTimeout(() => {
              navigate('/dashboard');
            }, 1000);
            return;
          }
        } catch (alumniError) {
          try {

            const adminResponse = await axios.post('http://localhost:8080/api/admin/login', {
              email: formData.username,
              password: formData.password,
            });

            if (adminResponse.status === 200) {
              setSuccessMessage('Login successful as Admin! Redirecting to admin dashboard...');
              login(formData.username, 'admin');
              setTimeout(() => {
                navigate('/dashboard');
              }, 1000);
              return;
            } else {
              setFormError(true);
              setSuccessMessage('');
            }
          } catch (adminError) {
            setFormError(true);
            setSuccessMessage('');
          }
        }
      }
    } else {
      setFormError(true);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <section id="services" className="bg-primary p-1"></section>

      <div className="container">
        <div className="login-card">
          <div className="text-center">
            <h2>LOG IN</h2>
            <hr className="mb-4" />
          </div>
          <div className="text-center mb-4 py-4">
            <div className="col-sm-11 col-md-10 col-lg-9 mx-auto">
              {formError && (
                <p className="login-alert-danger">Please fill the fields with correct information.</p>
              )}
              {successMessage && (
                <p className="login-alert-success">
                  {successMessage}
                </p>
              )}
              <form method="POST" onSubmit={handleSubmit}>
                <div className="login-form-group">
                  <label htmlFor="signin-username">Email</label>
                  <input
                    id="signin-username"
                    type="text"
                    name="username"
                    className="login-form-control"
                    placeholder="Email"
                    aria-label="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="login-form-group">
                  <label htmlFor="signin-password">Password</label>
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    className="login-form-control"
                    placeholder="Password"
                    aria-label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button className="login-btn-primary" type="submit" value="login" name="submit">
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div className="text-center">
            <div className="alert login-alert-primary" role="alert">
              <div className='sak' style={{ color: 'black' }}>Please Sign In to Continue! Don't have an Account?</div>
              <h5 className="pt-2 m-0">
                <Link to="/signup" className="login-form-link" style={{ color: 'black' }}>
                  Register!<i className="fas fa-external-link-alt"></i>
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
