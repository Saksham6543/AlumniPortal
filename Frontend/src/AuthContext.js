import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); 
  const [userRole, setUserRole] = useState('');


  const login = (email, role) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setUserRole(role);

  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setUserRole('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
