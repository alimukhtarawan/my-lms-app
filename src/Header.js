import React from 'react';
import {Link} from 'react-router-dom';
import logo from './images/logo.jpg';

function Header(){
    return (
        <div>
            <img src={logo} style={{width: "100px", height:"100px"}}/>
            <br />

            <div className='flex-container' style={{display: "flex", justifyContent: "space-evenly", width: "300px" }}>
                <Link to="/">Home</Link>
                <Link to="/CoursesPage">Courses</Link>
                <Link to="/LoginForm">Login</Link>
            </div>

        </div>
    );
}

export default Header;