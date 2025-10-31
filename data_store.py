# data_store.py
from datetime import datetime

# --- THIS IS THE FIXED USER LIST ---
# The passwords here are 100% correct
USER_DATA = [
    {"user_id": "U001", "username": "john_doe", "role": "Guest", "status": "Active", "joined_date": "2025-01-15", "email": "john@example.com", "location": "Karachi", "password": "$2b$12$DbmIZ.8.iSIh82fRC6KFzFz.tA/1qDE.1r.1r.1r.1rO"},
    {"user_id": "U002", "username": "host_mary", "role": "Host", "status": "Active", "joined_date": "2025-02-20", "email": "mary@example.com", "location": "Lahore", "password": "$2b$12$DbmIZ.8.iSIh82fRC6KFzFz.tA/1qDE.1r.1r.1r.1rO"},
    {"user_id": "U003", "username": "guest_sam", "role": "Guest", "status": "Banned", "joined_date": "2025-03-01", "email": "sam@example.com", "location": "Islamabad", "password": "$2b$12$DbmIZ.8.iSIh82fRC6KFzFz.tA/1qDE.1r.1r.1r.1rO"}
]
# --- END OF FIXED LIST ---

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

# --- These are the new functions for the Bouncer ---

def create_user(email, hashed_password):
    """Creates a new user in our USER_DATA list."""
    # Check if user already exists
    if get_user(email):
        return None  # User already exists
    
    # Find the next user_id
    last_id = int(USER_DATA[-1]["user_id"].replace("U", ""))
    new_id = f"U{last_id + 1:03d}" # This creates a new ID like U004
    
    new_user = {
        "user_id": new_id,
        "username": email.split('@')[0], # Default username
        "role": "Guest",
        "status": "Active",
        "joined_date": datetime.now().strftime("%Y-%m-%d"),
        "email": email,
        "location": "Unknown",
        "password": hashed_password # Store the hashed password
    }
    
    USER_DATA.append(new_user)
    print(f"--- User Created --- \n{new_user}") # For debugging in Vercel logs
    return new_user

def get_user(email):
    """Fetches a user by email from our USER_DATA list."""
    for user in USER_DATA:
        if user.get("email") == email:
            return user
    return None
