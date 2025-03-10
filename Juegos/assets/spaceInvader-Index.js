// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the necessary elements
    const commentForm = document.querySelector('.input-group');
    const nameInput = document.querySelector('.name-input');
    const usernameInput = document.querySelector('.username-input');
    const commentInput = document.querySelector('.comment-input');
    const sendButton = document.querySelector('.btn-send');
    const commentList = document.querySelector('.comment-list');

    // Check if we found all necessary elements
    if (!nameInput || !usernameInput || !commentInput || !sendButton || !commentList) {
        console.error('Could not find one or more required elements');
        return;
    }

    // Function to create a new comment
    function createComment(name, username, text) {
        const li = document.createElement('li');
        li.className = 'comment';
        
        li.innerHTML = `
            <img src="./img/gato.jpg" alt="User Avatar" class="comment-avatar">
            <div class="comment-content">
                <strong>${name}</strong> ${username}
                <p>${text}</p>
            </div>
        `;
        
        return li;
    }

    // Event listener for the send button
    sendButton.addEventListener('click', () => {
        // Get input values and ensure they exist before calling trim()
        const name = nameInput ? nameInput.value.trim() : '';
        const username = usernameInput ? usernameInput.value.trim() : '';
        const text = commentInput ? commentInput.value.trim() : '';
        
        // Basic validation
        if (!name || !username || !text) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Create and add the new comment
        const newComment = createComment(name, username, text);
        commentList.insertBefore(newComment, commentList.firstChild);
        
        // Clear the input fields
        nameInput.value = '';
        usernameInput.value = '';
        commentInput.value = '';
    });

    // Optional: Allow sending comment with Enter key
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendButton.click();
        }
    });
    const audio = document.getElementById("audioPlayer"); 
    const playPauseBtn = document.getElementById("playPauseBtn"); 
    const progressBar = document.getElementById("progressBar"); 

    playPauseBtn.addEventListener("click", () => { 
        if (audio.paused) { audio.play(); playPauseBtn.textContent = "⏸"; } else { audio.pause(); playPauseBtn.textContent = "▶";

     } 
});
});