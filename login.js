document.addEventListener("DOMContentLoaded", () => {
    // Make sure your form in login.html has: id="login-form"
    const loginForm = document.getElementById("login-form");
    
    // Make sure you add <div id="message"></div> to your login.html
    const messageEl = document.getElementById("message");
    
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Stop the form from submitting normally

        // Make sure your inputs in login.html have: id="email" and id="password"
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        messageEl.textContent = "Logging in...";
        messageEl.style.color = "black";

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (response.ok) {
            messageEl.textContent = "Login successful! Redirecting...";
            messageEl.style.color = "green";
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = "/"; // Redirect to your home page
            }, 2000);
        } else {
            messageEl.textContent = `Error: ${result.error}`;
            messageEl.style.color = "red";
        }
    });
});
