import React from "react";
import CourseItem from "./CourseItem";
import courses from "./data/courses"; // Import courses array

function CourseCatalog({ onEnroll }) {
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
