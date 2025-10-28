document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const listViewBtn = document.getElementById('listViewBtn');
    const calViewBtn = document.getElementById('calViewBtn');
    const listView = document.getElementById('listView');
    const calendarView = document.getElementById('calendarView');

    // --- Tab Switching Logic ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked tab
            button.classList.add('active');
            const targetTab = button.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- View Switching Logic (List vs. Calendar) ---
    listViewBtn.addEventListener('click', () => {
        listViewBtn.classList.add('active');
        calViewBtn.classList.remove('active');
        listView.classList.add('active');
        calendarView.classList.remove('active');
    });

    calViewBtn.addEventListener('click', () => {
        calViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        calendarView.classList.add('active');
        listView.classList.remove('active');
    });

    // Placeholder for booking card action buttons
    const actionButtons = document.querySelectorAll('.btn-action');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const iconClass = e.currentTarget.querySelector('i').classList;
            if (iconClass.contains('fa-comment-dots')) {
                alert('Opening messenger with guest...');
            } else if (iconClass.contains('fa-paper-plane')) {
                alert('Sending check-in instructions...');
            }
        });
    });
});