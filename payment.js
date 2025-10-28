document.addEventListener('DOMContentLoaded', () => {
    const paymentForm = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');

    // Add interactivity to the "Confirm and Pay" button
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the page from reloading
        
        // In a real application, you would process the payment here.
        // For now, we'll just show a success message.
        alert('Payment Confirmed! Your booking is complete. A confirmation email has been sent.');

        // Redirect to the "My Bookings" page after a short delay
        setTimeout(() => {
            window.location.href = 'my-bookings.html';
        }, 1500);
    });

    // Auto-format card number with spaces for better readability
    cardNumberInput.addEventListener('input', (e) => {
        // Remove non-digit characters and add spaces every 4 digits
        let value = e.target.value.replace(/\D/g, '').substring(0, 16);
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value;
    });
});