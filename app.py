# app.py

from flask import Flask, send_from_directory
from flask_cors import CORS
import os

# Import Blueprints from the new folder structure
from api_routes.admin import admin_bp
from api_routes.main import main_bp

# Flask needs to know where your HTML/CSS/JS files are for simple serving (optional, but good practice)
app = Flask(__name__, static_folder='.', static_url_path='/') 
CORS(app) # Enable CORS for API routes

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