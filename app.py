# app.py

# --- Existing Imports ---
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import os

# --- New Imports for Login ---
from passlib.context import CryptContext
import data_store

# --- Existing Blueprint Imports ---
from api_routes.admin import admin_bp
from api_routes.main import main_bp

# Flask setup
app = Flask(__name__, static_folder='.', static_url_path='/')
CORS(app)  # Enable CORS for API routes

# --- NEW: Setup password hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- NEW: SIGNUP API ROUTE ---
@app.route("/api/signup", methods=["POST"])
def api_signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if data_store.get_user(email):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = pwd_context.hash(password[:72])
    user = data_store.create_user(email, hashed_password)

    if user:
        return jsonify({"success": True, "email": user["email"]}), 201
    else:
        return jsonify({"error": "Failed to create user"}), 500


# --- NEW: LOGIN API ROUTE ---
@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = data_store.get_user(email)

    if user and pwd_context.verify(password[:72], user["password"]):
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# --- Register all route Blueprints ---
app.register_blueprint(admin_bp)
app.register_blueprint(main_bp)


# --- Route to Serve Frontend Files ---
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)


# --- Main entry point (serves home.html) ---
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'home.html')


# --- Start Flask App ---
if __name__ == '__main__':
    print("Starting StayNestly app (Frontend & Backend) on http://127.0.0.1:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
