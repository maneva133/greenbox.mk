import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch('/api/auth/me');
    // const userData = await response.json();
    
    const savedUser = localStorage.getItem('greenboxUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('greenboxUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function - Simulated authentication
  const login = (username, password) => {
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password })
    // });
    // const userData = await response.json();
    
    // Mock login - no validation, just create user object
    const userData = {
      username,
      role: 'customer',
      loginTime: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('greenboxUser', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  // Register function - Simulated registration
  const register = (username, email, password) => {
    // Simulate API call - Replace this with actual API call later
    // Example: const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, email, password })
    // });
    // const userData = await response.json();
    
    // Mock registration - no validation, just create user object
    const userData = {
      username,
      email,
      role: 'customer',
      registerTime: new Date().toISOString()
    };
    
    setUser(userData);
    localStorage.setItem('greenboxUser', JSON.stringify(userData));
    return Promise.resolve(userData);
  };

  // Logout function
  const logout = () => {
    // Simulate API call - Replace this with actual API call later
    // Example: await fetch('/api/auth/logout', { method: 'POST' });
    
    setUser(null);
    localStorage.removeItem('greenboxUser');
    // Also clear cart on logout (optional)
    localStorage.removeItem('greenboxCart');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

