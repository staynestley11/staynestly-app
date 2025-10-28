// Get the modal element
const modal = document.getElementById('authModal');

// Get all the "Book Now" buttons
const bookButtons = document.querySelectorAll('.book-now-btn');

// Get the close button for the modal
const closeBtn = document.querySelector('.close-btn');

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}

// Add click event listener to all "Book Now" buttons
bookButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

// Add click event listener to the close button
closeBtn.addEventListener('click', closeModal);

// Close the modal if the user clicks anywhere outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
});