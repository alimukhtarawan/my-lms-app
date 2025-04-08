import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import AuthMessage from "./AuthMessage";
import Header from "./Header";
import Footer from "./Footer";


function LoginForm() {
  const { setUser } = useContext(AuthContext); // Access global auth state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const validateInputs = () => {
    if (!username || !password) {
      setMessage("Username and password cannot be empty.");
      setMessageType("error");
      return false;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      setMessageType("error");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      //const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const response = await fetch('http://127.0.0.1:5000/validate-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
     
      const data = await response.json();
      console.log("Login Response Data:", data); 
     
     // if http response and operation in API was successful
      if (response.ok && data.success)
      {
        setUser(username); // Save user globally
        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        
        setTimeout(() => {
          localStorage.setItem("studentId", data.student_id);
          console.log("Student ID saved in localStorage:", data.student_id);
          navigate("/CoursesPage");
        }, 2000);
      } else {
        setMessage("Invalid username or password.");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      setMessageType("error");
    }
  };


  return (
    <div>
      <Header />
      <div className="login-container">
        <h2>LMS Student Login</h2>
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message && <AuthMessage type={messageType} message={message} />}
          <button type="submit">Login</button>
          <p className="forgot-password">Forgot Password?</p>
          <Link to="/SignupPage" className="no-acc">Don't have an account? Sign Up</Link>
          
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginForm;
