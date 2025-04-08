import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {Link} from 'react-router-dom';

const RegForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const { username, password, confirmPassword, email } = formData;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;
  
    let errors = []; 
  
    if (!usernameRegex.test(username)) {
      errors.push('Invalid username: Must be 3-20 characters, start with a letter, and contain only letters, numbers, hyphens, or underscores.');
    }
  
    if (!passwordRegex.test(password)) {
      errors.push('Invalid password: Must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character.');
    }
  
    if (password !== confirmPassword) {
      errors.push('Passwords do not match.');
    }
  
    if (!emailRegex.test(email)) {
      errors.push('Invalid email: Must be a valid format (e.g., username@example.com) with .com, .net, or .io.');
    }
  
    return errors; 
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors);
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Response from Flask:', data);
  
      if (response.ok) {
        alert('Registration successful!');
        navigate('/LoginForm'); // Redirect to login page
      } else {
        setError([data.message || 'Registration failed. Please try again.']); // ✅ Wrap in an array
      }
    } catch (err) {
      setError(['An error occurred. Please try again later.']);
    }
  };
  

  return (
    <div>
      <h2 style={{textAlign: "center", color: "#0c59a5"}}>Sign Up</h2>
      <div className="register-container" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "30px", margin: "150px", marginTop: "15px", marginBottom: "15px", borderRadius: "30px", backgroundColor: "#d4d4d4", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"}}>
      
      <form onSubmit={handleSubmit} className="register-form">
        
        <div className="form-group">
          <label htmlFor="username">Username</label> <br/>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label> <br/>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label> <br/>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label> <br/>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>



        <button type="submit" className="signup-button" style={{backgroundColor: "green"}}>
          Signup
        </button>
      </form>



  
      
    </div>
 
    {error.length > 0 && (
        <div className="error-box">
          <ul>
            {error.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

    <div style={{display: "flex", justifyContent: "center", marginBottom: "15px"}}>
      <Link to="/LoginForm" className='signedup'>Already have an account? Login here</Link>
    </div>



    </div>
    
  );
};

export default RegForm;
