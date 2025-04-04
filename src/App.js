import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import CoursesPage from "./CoursesPage";
import LoginForm from "./LoginForm";
import { AuthProvider } from "./AuthContext";
import SignupPage from './SignupPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path='/Homepage' element={<Homepage />} />
          <Route path="/CoursesPage" element={<CoursesPage />} />
          <Route path="/LoginForm" element={<LoginForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
