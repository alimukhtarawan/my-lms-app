import React from "react";
import EnrolledCourse from "./EnrolledCourse";

function EnrollmentList({ enrolledCourses, onDrop }) {
  // Calculate total credit hours (assuming each course is 3 credits)
  const totalCredits = enrolledCourses.length * 3;

  return (
    <div className="enrollment-list">
      <h2>Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
        enrolledCourses.map((course) => (
          <EnrolledCourse key={course.id} course={course} onDrop={onDrop} />
        ))
      )}
      <p>Total Credit Hours: {totalCredits}</p>
    </div>
  );
}

export default EnrollmentList;
