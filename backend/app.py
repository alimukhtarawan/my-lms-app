from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib


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
        "enrolled_courses": ["Web Development", "Data Structures"]
    },
    {
        "id": 2,
        "username": "bob456",
        "password": "hashedpassword2",
        "email": "bob@example.com",
        "enrolled_courses": ["Digital Circuits", "Material Engineering"]
    }
]

@app.route('/validate-login', methods=['POST'])
def validate_login():
    data = request.get_json(force=True)
    entered_username = data.get("username")
    entered_password = data.get("password")

    for student in students:
        if student['username'] == entered_username and student['password'] == entered_password:
            return jsonify({"success": True, "message": "Login Validated"})
        
    return jsonify({"success": False, "message": "Invalid Credentials"}), 401


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