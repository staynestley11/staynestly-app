document.addEventListener("DOMContentLoaded", () => {

    // --- PART 1: FIX THE GUEST/HOST TOGGLE ---
    const guestBtn = document.getElementById('guestBtn');
    const hostBtn = document.getElementById('hostBtn');
    const guestFormSection = document.getElementById('guestSignup');
    const hostFormSection = document.getElementById('hostSignup');

    if (guestBtn) { // Check if the buttons exist
        guestBtn.addEventListener('click', () => {
            guestBtn.classList.add('active');
            hostBtn.classList.remove('active');
            guestFormSection.classList.add('active');
            hostFormSection.classList.remove('active');
        });

        hostBtn.addEventListener('click', () => {
            hostBtn.classList.add('active');
            guestBtn.classList.remove('active');
            hostFormSection.classList.add('active');
            guestFormSection.classList.remove('active');
        });
    }

    // --- PART 2: ADD SIGNUP LOGIC TO THE GUEST FORM ---
    
    // Select the GUEST form
    const guestForm = document.querySelector("#guestSignup form");
    
    // Select the inputs from the GUEST form
    const emailInput = guestForm.querySelector('input[type="email"]');
    const passwordInput = guestForm.querySelector('input[type="password"]');
    const submitButton = guestForm.querySelector('button[type="submit"]');

    // This will hold our message element
    let messageEl = null;

    // Helper function to show messages
    function showMessage(text, type) {
        // Create the message element if it doesn't exist
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            // Insert it before the "Create Account" button
            guestForm.insertBefore(messageEl, submitButton);
        }
        
        messageEl.textContent = text;
        messageEl.style.color = (type === 'error') ? '#e74c3c' : '#2ecc71'; // Red for error, green for success
        messageEl.style.marginTop = '15px';
        messageEl.style.textAlign = 'center';
    }

    // Add the submit event listener
    guestForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the form from submitting

        const email = emailInput.value;
        const password = passwordInput.value;

        showMessage("Creating account...", "success");

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            showMessage("Signup successful! Redirecting to login...", "success");
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "/login.html";
            }, 2000);
        } else {
            showMessage(`Error: ${result.error}`, "error");
        }
    });

    // We don't add a listener to the host form yet, as the backend doesn't support it
});
