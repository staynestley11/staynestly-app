document.addEventListener("DOMContentLoaded", () => {
    // Select the form from your login.html
    const loginForm = document.querySelector(".login-box form");
    
    // Select the inputs from your form
    const emailInput = loginForm.querySelector('input[type="email"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    const submitButton = loginForm.querySelector('button[type="submit"]');

    // This will hold our message element
    let messageEl = null;

    // Helper function to show messages
    function showMessage(text, type) {
        // Create the message element if it doesn't exist
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message'; // You can style .form-message in your CSS if you want
            // Insert it before the login button
            loginForm.insertBefore(messageEl, submitButton);
        }
        
        messageEl.textContent = text;
        messageEl.style.color = (type === 'error') ? '#e74c3c' : '#2ecc71'; // Red for error, green for success
        messageEl.style.marginTop = '15px';
        messageEl.style.textAlign = 'center';
    }

    // Add the submit event listener
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the form from submitting normally

        const email = emailInput.value;
        const password = passwordInput.value;

        showMessage("Logging in...", "success");

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            showMessage("Login successful! Redirecting...", "success");
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "/"; // Redirect to your home page
            }, 2000);
        } else {
            showMessage(`Error: ${result.error}`, "error");
        }
    });
});
