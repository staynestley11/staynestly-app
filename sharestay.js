document.addEventListener('DOMContentLoaded', () => {
    const inviteButtons = document.querySelectorAll('.invite-btn');
    const openRequestButton = document.querySelector('.open-request-btn');

    // Add functionality to all "Invite to Share" buttons
    inviteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const partnerCard = e.target.closest('.partner-card');
            const partnerName = partnerCard.querySelector('h4').textContent.split(',')[0];

            if (confirm(`Send a ShareStay invitation to ${partnerName}?`)) {
                // In a real app, this would send a request to the server.
                // For now, we'll show a success message and disable the button.
                alert(`Invitation sent to ${partnerName}! They will be notified.`);
                button.textContent = 'Invited';
                button.disabled = true;
            }
        });
    });

    // Add functionality to the "Send Open Request" button
    openRequestButton.addEventListener('click', () => {
        if(confirm('Send an open request to the host for this property?')) {
            alert('Your open request has been sent! The host will contact you if a match is found.');
            openRequestButton.textContent = 'Request Sent';
            openRequestButton.disabled = true;
        }
    });
});