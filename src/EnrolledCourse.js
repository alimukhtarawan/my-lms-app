import React from "react";

function EnrolledCourse({ course, onDrop }) {
  return (
    <div className="enrolled-course">
      <h3>{course.name}</h3>
      <p>Credit Hours: 3</p>
      <button onClick={() => onDrop(course.id)}>Drop Course</button>
    </div>
  );
}

export default EnrolledCourse;
