import React, { createContext, useState } from "react";

export const AuthContext = createContext();
// We decided to use useContext rather than use effect for global authentication state management
// also does not require prop drilling
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
