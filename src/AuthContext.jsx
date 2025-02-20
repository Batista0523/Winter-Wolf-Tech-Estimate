import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('User found in localStorage:', storedUser);
      setUser(JSON.parse(storedUser));
    } else {
      console.log('No user found in localStorage');
    }
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
  };

  const logout = () => {
    if (user?.id) {
      // Remove saved estimate data for the current user
      localStorage.removeItem(`estimateProgress_${user.id}`);
    }
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  const isAuthenticated = !!user; 

  return (
    <AuthContext.Provider value={{ user, login, logout , isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}