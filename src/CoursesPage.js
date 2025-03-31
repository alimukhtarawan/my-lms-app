import React, { useState } from "react";
import Header from "./Header";
import CourseCatalog from "./CourseCatalog";
import EnrollmentList from "./EnrollmentList";
import Footer from "./Footer";

function CoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const onEnroll = (course) => {
    // Prevent duplicate enrollments
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  const onDrop = (courseId) => {
    setEnrolledCourses(enrolledCourses.filter((course) => course.id !== courseId));
  };

  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={onEnroll} />
        <EnrollmentList enrolledCourses={enrolledCourses} onDrop={onDrop} />
      </div>
      <Footer />
    </div>
  );
}

export default CoursesPage;
