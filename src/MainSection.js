import React from 'react';
import {useState, useEffect} from 'react';
import courses from './data/courses';
import testimonials from './data/testimonials';



function MainSection() {
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [randomTestimonials, setRandomTestimonials] = useState([]);

    useEffect(() => {
        setFeaturedCourses(courses.sort(() => 0.5 -Math.random()).slice(0, 3));
        setRandomTestimonials(testimonials.sort(() => 0.5 -Math.random()).slice(0, 2));
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} style={{ color: i < rating ? "black" : "lightgray" }}>★</span>
        ));
    };


    return (
        <div>
            <h2>About LMS</h2>
            <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently</p>

            <p>Key Features:</p>

            <ul>
                <li>Enroll in courses</li>
                <li>Attempt quizzes</li>
                <li>View leaderboards</li>
            </ul>

            <br/>

            <h2>Featured Courses</h2>
            <ul>
                {featuredCourses.map(course => (
                    <li key={course.id}>{course.name}</li>
                ))}
            </ul>

            <div>
            <h2>Testimonials</h2>
            {randomTestimonials.map((testimonial, index) => (
                <div>
                    
                    <p>{testimonial.review}</p>
                    <p>{testimonial.studentName}</p>
                    <div>
                        {renderStars(testimonial.rating)}
                    </div>
                    <hr/>
                </div>
            ))}
            </div>
            
            <br/>

        </div>

    );
};

export default MainSection;
