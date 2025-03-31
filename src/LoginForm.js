import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await response.json();

      const user = users.find((user) => user.username === username && user.email === password);
      
      if (user) {
        setUser(user); // Save user globally
        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
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
        <h2>Login</h2>
        {message && <AuthMessage type={messageType} message={message} />}
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
          <button type="submit">Login</button>
          <p className="forgot-password">Forgot Password?</p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default LoginForm;
