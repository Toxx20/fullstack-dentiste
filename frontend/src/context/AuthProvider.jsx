// src/context/AuthProvider.jsx
import { useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {

const [user, setUser] = useState(() => {
  const stored = localStorage.getItem('user');
  if (!stored || stored === 'undefined') return null; // ← protection
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
});

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}