# utils/csv_generator.py

import io
import csv

def generate_csv_data(data, headers):
    """Generates a CSV string from a list of dictionaries."""
    si = io.StringIO()
    writer = csv.DictWriter(si, fieldnames=headers)
    
    writer.writeheader()
    writer.writerows(data)
    
    return si.getvalue()