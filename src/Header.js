import React from 'react';
import {Link} from 'react-router-dom';
import logo from './images/logo.jpg';
import './App.css';

function Header(){
    return (
        <div>
            <header style={{  backgroundColor: "#004080", padding: "20px", margin: "0px", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Arial, Helvetica, sans-serif"}}>
                <img src={logo} style={{width: "100px", height:"100px"}}/>
                <h1 style={{color: 'white'}}>LMS - Learning Management System</h1>
            </header>


            <div className='nav-container' style={{display: "flex", color: "#003366", justifyContent: "space-evenly", backgroundColor: "#003366", padding: "10px", fontFamily: "Arial, Helvetica, sans-serif"}}>
                <Link to="/Homepage" className='nav-item' style={{color: "white"}}>Home</Link>
                <Link to="/CoursesPage" className='nav-item' style={{color: "white"}}>Courses</Link>
                <Link to="/LoginForm" className='nav-item' style={{color: "white"}}>Login</Link>
            </div>

        </div>
    );
}

export default Header;