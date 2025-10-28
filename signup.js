document.addEventListener('DOMContentLoaded', () => {
    const guestBtn = document.getElementById('guestBtn');
    const hostBtn = document.getElementById('hostBtn');
    const guestSignup = document.getElementById('guestSignup');
    const hostSignup = document.getElementById('hostSignup');

    // Function to switch forms
    const switchForms = (activeBtn, inactiveBtn, activeForm, inactiveForm) => {
        // Update button styles
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');

        // Hide the currently active form
        inactiveForm.classList.remove('active');
        
        // After a brief delay for the fade-out effect, show the new form
        setTimeout(() => {
            activeForm.classList.add('active');
        }, 50); // A small delay is enough to trigger the transition
    };

    guestBtn.addEventListener('click', () => {
        switchForms(guestBtn, hostBtn, guestSignup, hostSignup);
    });

    hostBtn.addEventListener('click', () => {
        switchForms(hostBtn, guestBtn, hostSignup, guestSignup);
    });
});