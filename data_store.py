# data_store.py
# This simulates your database data.

USER_DATA = [
    {"user_id": "U001", "username": "john_doe", "role": "Guest", "status": "Active", "joined_date": "2025-01-15", "email": "john@example.com", "location": "Karachi"},
    {"user_id": "U002", "username": "host_mary", "role": "Host", "status": "Active", "joined_date": "2025-02-20", "email": "mary@example.com", "location": "Lahore"},
    {"user_id": "U003", "username": "guest_sam", "role": "Guest", "status": "Banned", "joined_date": "2025-03-01", "email": "sam@example.com", "location": "Islamabad"}
]

PROPERTY_DATA = [
    # Live properties for 'explore.html'
    {"id": 1, "lat": 32.4995, "lng": 74.5179, "name": "Modern Villa", "status": "Live", "host_id": "U002"},
    {"id": 2, "lat": 32.4905, "lng": 74.5289, "name": "Sunny Downtown Studio", "status": "Live", "host_id": "U002"},
    # Pending property for 'admin.html'
    {"id": 4, "lat": 32.4945, "lng": 74.5229, "name": "Cozy Lake Cottage", "status": "Pending Approval", "host_id": "U002"}
]

BOOKING_DATA = [
    # Data for 'dashboard.html'
    {"booking_id": "B001", "user_id": "U001", "property_id": 3, "property_name": "Cozy Cabin", "dates": "10 Oct 2025 - 12 Oct 2025", "status": "COMPLETED"},
    {"booking_id": "B002", "user_id": "U001", "property_id": 1, "property_name": "Luxury Villa with Pool", "dates": "15 Nov 2025 - 20 Nov 2025", "status": "UPCOMING"},
]

STAYBUDDY_DATA = [ 
    # Data for 'enable.html'
    {"user_id": "U101", "name": "Aisha K.", "age": 25, "gender": "Female", "destination": "Lahore", "dates": "Dec 2025", "interests": ["Food", "History"]},
    {"user_id": "U102", "name": "Zain A.", "age": 30, "gender": "Male", "destination": "Karachi", "dates": "Nov 2025", "interests": ["Beach", "Tech"]},
]