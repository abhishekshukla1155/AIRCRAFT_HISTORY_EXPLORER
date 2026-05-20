import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login as apiLogin, logout as apiLogout } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to authenticate user with stored token", error);
        apiLogout();
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (err) {
      console.error("Failed to load user details after login", err);
    }
    return data;
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        loading, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
