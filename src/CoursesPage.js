import React, { useState, useEffect } from "react";
import Header from "./Header";
import CourseCatalog from "./CourseCatalog";
import EnrollmentList from "./EnrollmentList";
import Footer from "./Footer";

function CoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [studentId, setStudentId] = useState(null);
  // Fetch student's enrolled courses on component mount
  useEffect(() => {
    const studentIdFromStorage = localStorage.getItem("studentId");
    console.log("Retrieved Student ID:", studentIdFromStorage);  // Log to verify
    if (studentIdFromStorage) {
      setStudentId(studentIdFromStorage); // Set the student ID from localStorage
    } else {
      console.error("No student ID found in localStorage");
    }
  }, []);

  // Fetch student's enrolled courses on component mount
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!studentId) return; // Don't fetch if studentId is not available
      try {
        const response = await fetch(`http://127.0.0.1:5000/student_courses/${studentId}`);
        console.log("API Response Data:", response); // Log the response data
        if (response.ok) {
          const data = await response.json();
          console.log("Enrolled Courses Data:", data.enrolled_courses); // Add this line to log data
          setEnrolledCourses(data.enrolled_courses || []); // Expecting a list of course objects
        } else {
          setEnrolledCourses([]); // fallback
        }
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
        setEnrolledCourses([]); // fallback
      }
    };

    if (studentId) {
      fetchEnrolledCourses();
    }
  }, [studentId]);
//enroll a course
  const onEnroll = async (course) => {
    if (!studentId) return; // Don't fetch if studentId is not available
    if (!enrolledCourses.some((c) => c.id === course.id)) {
      const response = await fetch(`http://127.0.0.1:5000/enroll/${studentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id: course.id }),
        //body: JSON.stringify({ student_id: studentId, course }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setEnrolledCourses([...enrolledCourses, course]);
      } else {
        alert(data.message || "Enrollment failed.");
      }
    }
  };
 
  const onDrop = async (courseId) => {

    if (!studentId) return; // Don't fetch if studentId is not available
    //const course = enrolledCourses.find((c) => c.id === courseId);
    const response = await fetch(`http://127.0.0.1:5000/drop/${studentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }), // or just pass courseId if your backend accepts that
    });

    const data = await response.json();

    if (response.ok) {
      setEnrolledCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );
    } else {
      alert(data.message || "Failed to drop course.");
    }
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
