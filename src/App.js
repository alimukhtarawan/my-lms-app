import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CoursesPage from "./CoursesPage";
import LoginForm from "./LoginForm";
import { AuthProvider } from "./AuthContext";
import { useAuth } from './AuthContext';
import SignupPage from './SignupPage';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/LoginForm" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/CoursesPage" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>}  />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/SignupPage" element={<SignupPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
