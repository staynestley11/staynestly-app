document.addEventListener("DOMContentLoaded", () => {
    // Make sure your form in signup.html has: id="signup-form"
    const signupForm = document.getElementById("signup-form"); 
    
    // Make sure you add <div id="message"></div> to your signup.html
    const messageEl = document.getElementById("message");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the form from submitting normally

        // Make sure your inputs in signup.html have: id="email" and id="password"
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        messageEl.textContent = "Creating account...";
        messageEl.style.color = "black";

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            messageEl.textContent = "Signup successful! Redirecting to login...";
            messageEl.style.color = "green";
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = "/login.html"; //
            }, 2000);
        } else {
            messageEl.textContent = `Error: ${result.error}`;
            messageEl.style.color = "red";
        }
    });
});
