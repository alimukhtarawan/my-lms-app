import React, { useState, useEffect } from "react";
import CourseItem from "./CourseItem";
//import courses from "./backend/courses"; // Import courses array

function CourseCatalog({ onEnroll }) {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  return (
    // courses is an array from the courses.js file
    // map method loops through each curse object in curses array and creates
    // corresponding CourseItem component for each one
    <div className="course-catalog">
      
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
      ))}
    </div>
  );
}

export default CourseCatalog;
