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

# Flask needs to know where your HTML/CSS/JS files are for simple serving (optional, but good practice)
app = Flask(__name__, static_folder='.', static_url_path='/')
CORS(app) # Enable CORS for API routes

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

    # Check if user already exists
    if data_store.get_user(email):
        return jsonify({"error": "User already exists"}), 400

    # Hash the password before storing it (and cut it to 72 chars)
hashed_password = pwd_context.hash(password[:72])
    
    # Create the user in data_store
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

    # Check if user exists AND the password is correct
    if user and pwd_context.verify(password, user["password"]):
        # Login successful!
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        # Invalid credentials
        return jsonify({"error": "Invalid email or password"}), 401

# --- Existing Code ---

# Register all route Blueprints
app.register_blueprint(admin_bp)
app.register_blueprint(main_bp)

# --- Route to Serve Frontend Files ---
# Since all files are in the root, this is a catch-all to serve them if needed.
@app.route('/<path:filename>')
def serve_static(filename):
    # This serves HTML, CSS, JS files directly from the 'staynestly' root folder
    return send_from_directory(app.static_folder, filename)

# Main entry point (e.g., serving dashboard.html if accessed directly)
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'home.html') # Assuming dashboard is the main entry

if __name__ == '__main__':
    print("Starting StayNestly app (Frontend & Backend) on http://127.0.0.1:5000")
    # Set host to '0.0.0.0' to be accessible on your network
    app.run(debug=True, host='0.0.0.0', port=5000)

