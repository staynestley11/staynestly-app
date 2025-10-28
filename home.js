document.addEventListener('DOMContentLoaded', () => {
    // --- User Profile Dropdown Logic ---
    const userProfileMenu = document.getElementById('userProfileMenu');
    const dropdownMenu = document.getElementById('dropdownMenu');

    userProfileMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    window.addEventListener('click', (event) => {
        if (!userProfileMenu.contains(event.target)) {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });

    // --- ShareStay Toggle Logic ---
    const shareStayToggle = document.querySelector('.share-stay-toggle input[type="checkbox"]');
    const shareStayFilters = document.getElementById('shareStayFilters');

    shareStayToggle.addEventListener('change', () => {
        if (shareStayToggle.checked) {
            shareStayFilters.classList.add('visible');
        } else {
            shareStayFilters.classList.remove('visible');
        }
    });

    // --- AI Chatbot Logic ---
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatBody = document.getElementById('chatBody');

    chatIcon.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
    });
    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    const sendMessage = () => {
        const userText = userInput.value.trim();
        if (userText === "") return;
        addMessage(userText, 'user-message');
        userInput.value = '';
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(userText);
            addMessage(botResponse, 'bot-message');
        }, 1500);
    };

    sendMessageBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.classList.add('message', 'typing-indicator');
        typingDiv.innerHTML = `<p>Bot is typing...</p>`;
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function getBotResponse(userText) {
        const lowerUserText = userText.toLowerCase();
        if (lowerUserText.includes('book') || lowerUserText.includes('find')) {
            return "I can help with that! Where are you looking to travel?";
        } else if (lowerUserText.includes('sharestay') || lowerUserText.includes('share')) {
            return "ShareStay is a great way to save money! You can enable it on the home page search bar to find properties available for sharing.";
        } else if (lowerUserText.includes('help') || lowerUserText.includes('support')) {
            return "Of course. What do you need help with? You can ask me about bookings, payments, or your account.";
        } else {
            return "I'm still learning, but I'd be happy to help you find a place to stay. Try asking me to 'find a property in Paris'.";
        }
    }
});