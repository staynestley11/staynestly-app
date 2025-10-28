# routes/main.py
# Handles endpoints for explore.html, booking.html, dashboard.html, enable.html, forget.html

from flask import Blueprint, request, jsonify
from data_store import PROPERTY_DATA, BOOKING_DATA, STAYBUDDY_DATA, USER_DATA

main_bp = Blueprint('main', __name__, url_prefix='/api')

# Explore Page Properties (explore.html)
@main_bp.route('/properties', methods=['GET'])
def get_properties():
    # Returns only 'Live' properties for the map markers/listings
    live_properties = [
        {"id": p["id"], "lat": p["lat"], "lng": p["lng"], "name": p["name"]}
        for p in PROPERTY_DATA 
        if p["status"] == "Live"
    ]
    return jsonify({"properties": live_properties})

# Booking Confirmation (booking.html)
@main_bp.route('/booking', methods=['POST'])
def confirm_booking():
    data = request.json
    
    # Simulate payment success
    return jsonify({
        "success": True, 
        "message": "Booking confirmed! A confirmation has been sent to your email.",
        "booking_id": f"B{len(BOOKING_DATA) + 1:03}"
    })

# User Dashboard Data (dashboard.html)
@main_bp.route('/user/<user_id>/dashboard', methods=['GET'])
def get_user_dashboard(user_id):
    if user_id != 'U001': # Only 'U001' data available in mock store
        return jsonify({"error": "User not found or not authenticated"}), 404
        
    user_info = next((u for u in USER_DATA if u['user_id'] == user_id), None)
    user_bookings = [b for b in BOOKING_DATA if b['user_id'] == user_id]

    return jsonify({
        "profile": {"username": user_info['username'], "email": user_info['email'], "location": user_info['location']},
        "bookings": user_bookings,
        "stats": {"total_bookings": len(user_bookings)}
    })

# StayBuddy Search (enable.html)
@main_bp.route('/staybuddy/search', methods=['GET'])
def search_staybuddies():
    destination = request.args.get('destination', '').lower()
    
    if not destination:
        results = STAYBUDDY_DATA
    else:
        results = [
            buddy for buddy in STAYBUDDY_DATA 
            if destination in buddy['destination'].lower()
        ]
        
    return jsonify({"buddies": results})

# Forgot Password (forget.html)
@main_bp.route('/auth/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    # Always return success to prevent email enumeration (security practice)
    message = "If an account with this email exists, we have sent a password reset link to it."
    
    return jsonify({"success": True, "message": message})