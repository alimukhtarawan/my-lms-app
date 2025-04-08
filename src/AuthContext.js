import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();
// We decided to use useContext rather than use effect for global authentication state management
// also does not require prop drilling
// Hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isLoggedIn = !!user; // derived value for convenience

  // Logout function to clear user and localStorage
  const logout = () => {
    setUser(null); // Reset user state
    localStorage.removeItem("studentId"); // Remove studentId from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
