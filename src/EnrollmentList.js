import React from "react";
import EnrolledCourse from "./EnrolledCourse";

function EnrollmentList({ enrolledCourses, onDrop }) {
  // Calculate total credit hours (assuming each course is 3 credits)
  console.log("Enrolled Courses in EnrollmentList:", enrolledCourses); // Log the courses array
  const totalCredits = enrolledCourses.length * 3;

  return (
    <div className="enrollment-list">
      <h2>Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        enrolledCourses.map((course) => (
          //<EnrolledCourse key={course.id} course={course} onDrop={onDrop} />
          <EnrolledCourse key={course.id} course={course} onDrop={onDrop} />
        ))
      )}
      <p>Total Credit Hours: {totalCredits}</p>
      <br></br>
      <hr></hr>
    </div>
    
  );
}

export default EnrollmentList;
