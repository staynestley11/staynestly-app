document.addEventListener('DOMContentLoaded', () => {
    // --- Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // --- ShareStay Invitation Logic ---
    document.querySelectorAll('.invitation-actions .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.invitation-card');
            const guestName = card.querySelector('strong').textContent;
            
            if (e.target.classList.contains('btn-success')) { // Accept
                if (confirm(`Accept ShareStay invitation from ${guestName}?`)) {
                    alert(`Invitation accepted! You are now confirmed to share with ${guestName}.`);
                    card.innerHTML = `<p style="color: #155724; text-align: center; width: 100%;">You have accepted the invitation from <strong>${guestName}</strong>.</p>`;
                }
            } else if (e.target.classList.contains('btn-danger')) { // Decline
                if (confirm(`Decline ShareStay invitation from ${guestName}?`)) {
                    alert('Invitation declined.');
                    card.remove();
                }
            }
        });
    });

    // --- NEW: Partner Chat Modal Logic ---
    const chatModal = document.getElementById('partnerChatModal');
    const closeChatBtn = chatModal.querySelector('.close-btn');
    const partnerChatBody = document.getElementById('partnerChatBody');
    const partnerChatInput = document.getElementById('partnerChatInput');
    const sendPartnerMessageBtn = document.getElementById('sendPartnerMessageBtn');

    document.querySelectorAll('.chat-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const partnerName = e.currentTarget.dataset.partner;
            chatModal.querySelector('#chatPartnerName').textContent = `Chat with ${partnerName}`;
            chatModal.querySelector('.chat-header img').src = e.currentTarget.closest('.invitation-card').querySelector('img').src;
            chatModal.style.display = 'block';
        });
    });

    const closeChat = () => chatModal.style.display = 'none';
    closeChatBtn.addEventListener('click', closeChat);
    window.addEventListener('click', (e) => { if (e.target == chatModal) closeChat(); });

    const sendPartnerMessage = () => {
        const text = partnerChatInput.value.trim();
        if (text === "") return;
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'my-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        partnerChatBody.appendChild(messageDiv);
        partnerChatInput.value = '';
        partnerChatBody.scrollTop = partnerChatBody.scrollHeight;
    };
    sendPartnerMessageBtn.addEventListener('click', sendPartnerMessage);
    partnerChatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendPartnerMessage(); });
});