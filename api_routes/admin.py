# routes/admin.py
# Handles endpoints for admin.html

from flask import Blueprint, request, jsonify, send_file
from datetime import datetime
from data_store import USER_DATA, PROPERTY_DATA
from utils.csv_generator import generate_csv_data
import io

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

# User Ban/Unban 
@admin_bp.route('/user/<username>', methods=['PUT'])
def update_user_status(username):
    data = request.json
    action = data.get('action') 
    
    for user in USER_DATA:
        if user['username'] == username:
            if action == 'ban': user['status'] = 'Banned'
            elif action == 'unban': user['status'] = 'Active'
            else: return jsonify({"error": "Invalid action"}), 400
            return jsonify({"message": f"User {username} status updated to {user['status']}", "status": user['status']})
    return jsonify({"error": f"User {username} not found"}), 404

# Property Approval/Rejection
@admin_bp.route('/property/<property_name>', methods=['PUT'])
def handle_property_approval(property_name):
    data = request.json
    action = data.get('action') 
    
    for prop in PROPERTY_DATA:
        if prop['name'] == property_name:
            if action == 'approve': prop['status'] = 'Live'
            elif action == 'reject': prop['status'] = 'Rejected'
            else: return jsonify({"error": "Invalid action"}), 400
            return jsonify({"message": f"Property '{property_name}' status set to {prop['status']}."})
    return jsonify({"error": f"Property '{property_name}' not found"}), 404

# Report Generation
@admin_bp.route('/report/<report_type>', methods=['GET'])
def generate_report(report_type):
    # Logic to generate and return CSV file based on report_type
    date_str = datetime.now().strftime('%Y-%m-%d')
    # ... (Data loading and CSV generation remains the same as previous response) ...
    # Placeholder for brevity
    if report_type == 'finance': headers = ['transaction_id', 'date', 'amount', 'fee', 'payout', 'property']; data = [{'transaction_id': 'BK1001', 'date': '2025-10-18', 'amount': 450.00, 'fee': 63.00, 'payout': 387.00, 'property': 'Modern Villa'}]
    elif report_type == 'user': headers = ['user_id', 'username', 'role', 'status', 'joined_date']; data = USER_DATA
    elif report_type == 'property': headers = ['property_id', 'name', 'host', 'bookings', 'total_revenue', 'status']; data = [{'property_id': 'P01', 'name': 'Modern Villa', 'host': 'host_mary', 'bookings': 12, 'total_revenue': 15400.00, 'status': 'Live'}]
    else: return jsonify({"error": "Invalid report type"}), 400

    csv_output = generate_csv_data(data, headers)
    filename = f"{report_type}-report-{date_str}.csv"
    
    return send_file(
        io.BytesIO(csv_output.encode()),
        mimetype='text/csv',
        as_attachment=True,
        download_name=filename
    )