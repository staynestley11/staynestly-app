document.addEventListener('DOMContentLoaded', () => {

    // --- Add interactivity to all buttons on the page ---
    
    // Function for "Approve" and "Decline" buttons in ShareStay requests
    const requestButtons = document.querySelectorAll('.requests-table .btn');
    requestButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.classList.contains('btn-success') ? 'approve' : 'decline';
            const guestName = e.target.closest('tr').children[0].textContent;
            
            if (confirm(`Are you sure you want to ${action} the request from ${guestName}?`)) {
                e.target.closest('tr').remove();
                alert('Action confirmed!');
            } else {
                alert('Action canceled.');
            }
        });
    });

    // Function for "Edit" and "Delete" buttons in Manage Properties
    const propertyButtons = document.querySelectorAll('.properties-table .btn');
    propertyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.classList.contains('btn-secondary') ? 'edit' : 'delete';
            const propertyName = e.target.closest('tr').children[0].textContent;

            if (action === 'edit') {
                alert(`Editing property: ${propertyName}`);
            } else {
                if (confirm(`Are you sure you want to delete ${propertyName}? This cannot be undone.`)) {
                    e.target.closest('tr').remove();
                    alert(`${propertyName} has been deleted.`);
                }
            }
        });
    });

    // Function for the "Add Property" form
    const addPropertyForm = document.querySelector('.add-property-form');
    addPropertyForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the page from reloading
        const propertyTitle = document.getElementById('title').value;
        if (propertyTitle) {
            alert(`Property "${propertyTitle}" has been added successfully!`);
            addPropertyForm.reset(); // Clears the form fields
        } else {
            alert('Please enter a property title.');
        }
    });

});