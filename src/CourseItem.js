import React, { useState } from "react";
import course1 from "./images/course1.jpg";


const imageMap = {
    1: course1,
    2: course1,
    3: course1,
    4: course1,
    5: course1,
    6: course1,
    7: course1,
    8: course1,
    9: course1,
    10: course1,
  };

function CourseItem({ course, onEnroll }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="course-item"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      {/*<img src={course.image} alt={course.name} />*/}
      <img src={imageMap[course.id]} alt={course.name} />
      <h3>{course.name}</h3>
      <p>Instructor: {course.instructor}</p>
      {showDescription && <p className="course-description">{course.description}</p>}
      <button onClick={() => onEnroll(course)}>Enroll Now</button>
    </div>
  );
}

export default CourseItem;
