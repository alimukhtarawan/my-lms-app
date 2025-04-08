from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import random

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Flask is running"

# students.py (or inside your Flask app file)

students = [
    {
        "id": 1,
        "username": "alice123",
        "password": "hashedpassword1", 
        "email": "alice@example.com",
        "enrolled_courses": []
    },
    {
        "id": 2,
        "username": "bob456",
        "password": "hashedpassword2",
        "email": "bob@example.com",
        "enrolled_courses": []
    }
]
# Login API
@app.route('/validate-login', methods=['POST'])
def validate_login():
    data = request.get_json(force=True)
    entered_username = data.get("username")
    entered_password = data.get("password")

    for student in students:
        if student['username'] == entered_username and student['password'] == entered_password:
            return jsonify({"success": True, "message": "Login Validated",  "student_id": student['id']})
        
    return jsonify({"success": False, "message": "Invalid Credentials"}), 401

# Student Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json(force=True)
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    for student in students:
        if student["username"] == username:
            return jsonify({"success": False, "message": "Username already taken."}), 409

    new_id = max([s["id"] for s in students], default=0) + 1

    new_student = {
        "id": new_id,
        "username": username,
        "password": password,  
        "email": email,
        "enrolled_courses": []
    }

    students.append(new_student)

    return jsonify({"success": True, "message": "Registration successful."}), 201

# Testimonials API
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    try:
        filepath = os.path.join(os.path.dirname(__file__), 'testimonials.json')
        with open(filepath, 'r') as file:
            testimonials = json.load(file)
        # randomly select 2 tetsimonials
        selected = random.sample(testimonials, min(2, len(testimonials)))
        return jsonify(selected), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Get all courses API
@app.route('/courses', methods=['GET'])
def get_courses():
    try:
        filepath = os.path.join(os.path.dirname(__file__), 'courses.json')
        with open(filepath, 'r') as file:
            courses = json.load(file)
        return jsonify(courses), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Enroll Courses API
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json(force=True)
    #student_id = data.get("student_id")
    course_id = data.get("course_id")
    
    # Get student
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify({"success": False, "message": "Student not found."}), 404

    # Get all courses and find the course by ID
    all_courses = load_courses()
    course = next((c for c in all_courses if c["id"] == course_id), None)
    if not course:
        return jsonify({"success": False, "message": "Course data missing."}), 400

    # Enroll if not already enrolled
    if course_id not in student["enrolled_courses"]:
        student["enrolled_courses"].append(course_id)

    return jsonify({"success": True, "message": "Enrolled successfully."}), 200

# Delete Courses API:
@app.route("/drop/<int:student_id>", methods=["DELETE"])
def drop_course(student_id):
    
    # Find student
    student = next((s for s in students if s["id"] == student_id), None)
    if not student:
        return jsonify({"message": "Student not found."}), 404

    try: 
        data = request.get_json(force=True)
        #course_name = data.get("course")
        course_id = data.get("courseId")

        if course_id is None:
                return jsonify({"success": False, "message": "Missing courseId in request."}), 400
        try:
            course_id = int(data.get("courseId"))
        except (TypeError, ValueError):
            return jsonify({"success": False, "message": "Invalid courseId format."}), 400
        print("Dropping course:", course_id)
        print("Student's enrolled courses:", student["enrolled_courses"])
        # Remove course
        if course_id in student["enrolled_courses"]:
            student["enrolled_courses"].remove(course_id)
            return jsonify({"message": "Course dropped successfully."}), 200
        else:
            return jsonify({"message": "Course not found in enrolled courses."}), 400
    except Exception as e:
        print("Error parsing JSON:", e)
        return jsonify({"success": False, "message": "Invalid request format."}), 400

# Get Student Courses API
@app.route("/student_courses/<int:student_id>", methods=["GET"])
def get_student_courses(student_id):
    student = next((s for s in students if s["id"] == student_id), None)
    if student:
        # match names to actual course objects
        enrolled_ids = student.get("enrolled_courses", [])
        all_courses = load_courses()
         # Match full course objects by name
        enrolled_courses = [course for course in all_courses if course["id"] in enrolled_ids]
        return jsonify({"enrolled_courses": enrolled_courses}), 200
    else:
        # Return an empty list if student not found
        return jsonify({"enrolled_courses": []}), 200
    

#helper function
def load_courses():
    with open(os.path.join(os.path.dirname(__file__), 'courses.json')) as f:
        return json.load(f)

if __name__ == "__main__":
    app.run()
