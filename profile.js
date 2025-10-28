document.addEventListener('DOMContentLoaded', () => {
    // --- ADVANCED PROFILE PICTURE LOGIC ---
    const avatarUpload = document.querySelector('.avatar-upload');
    const imageUploadInput = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    const defaultAvatar = 'https://i.pravatar.cc/150?u=a042581f4e29026704d'; // Default image URL

    // 1. Trigger file selection when the user clicks the avatar
    avatarUpload.addEventListener('click', () => {
        imageUploadInput.click(); // This opens the file dialog
    });

    // 2. Handle the instant preview when a new file is chosen
    imageUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Set the image source to the newly selected file
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 3. Handle removing the photo
    removePhotoBtn.addEventListener('click', () => {
        profileImage.src = defaultAvatar;
        // It's good practice to clear the file input as well
        imageUploadInput.value = ""; 
        alert('Photo removed. Click "Save Changes" to confirm.');
    });


    // --- ORIGINAL SAVE CHANGES LOGIC ---
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const fullName = document.getElementById('fullName').value;
        alert(`Profile for ${fullName} has been updated successfully!`);
    });
});