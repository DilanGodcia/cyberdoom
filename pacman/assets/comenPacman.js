document.addEventListener('DOMContentLoaded', function() {
  
    const commentForm = document.querySelector('.left-panel .comments .input-group');
    const nameInput = document.querySelector('.left-panel .comments .name-input');
    const usernameInput = document.querySelector('.left-panel .comments .username-input');
    const commentInput = document.querySelector('.left-panel .comments .comment-input');
    const sendButton = document.querySelector('.left-panel .comments .btn-send');
    const commentList = document.querySelector('.left-panel .comments .comment-list');
    const copyButton = document.querySelector('.share .btn-copy');
    const shareInput = document.querySelector('.share .share-input');
    const pageKey = `comments_${window.location.pathname.split('/').pop()}`;

    // Load comments from local storage
    function loadComments() {
        const savedComments = JSON.parse(localStorage.getItem(pageKey)) || [];
        savedComments.forEach(comment => {
            addCommentToList(comment.name, comment.username, comment.text, false);
        });
    }
    
    // Save comments to local storage
    function saveComment(name, username, text) {
        const savedComments = JSON.parse(localStorage.getItem(pageKey)) || [];
        savedComments.unshift({ name, username, text });
        localStorage.setItem(pageKey, JSON.stringify(savedComments));
    }

    // Ensure spaces are allowed in the inputs
    [nameInput, usernameInput, commentInput].forEach(input => {
        if (input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === " ") {
                    e.stopPropagation(); 
                }
            });
        }
    });

    // Log elements to check if they're found
    console.log("Elements found:", { nameInput, usernameInput, commentInput, sendButton, commentList, copyButton, shareInput });
    
    function addCommentToList(name, username, commentText, save = true) {
        const newComment = document.createElement('li');
        newComment.className = 'comment';
        newComment.innerHTML = `
            <img src="./img/perfil.jpg" alt="User Avatar" class="comment-avatar">
            <div class="comment-content">
                <strong>${name}</strong> @${username.replace('@', '')}
                <p>${commentText}</p>
            </div>
        `;
        
        // Add comment to list
        commentList.prepend(newComment);
        
        // Save comment if needed
        if (save) {
            saveComment(name, username, commentText);
        }
    }
    
    // Only add the event listener if the button exists
    if (sendButton) {
        sendButton.addEventListener('click', function(e) {
            e.preventDefault();
            
           
            const name = nameInput ? nameInput.value.trim() : '';
            const username = usernameInput ? usernameInput.value.trim() : '';
            const commentText = commentInput ? commentInput.value.trim() : '';
            
            console.log("Comment values:", { name, username, commentText });
            
         
            if (name === '' || username === '' || commentText === '') {
                alert('Por favor, completa todos los campos');
                return;
            }
            
    
            addCommentToList(name, username, commentText);
            
           
            alert('Comentario guardado con éxito');
            
           
            nameInput.value = '';
            usernameInput.value = '';
            commentInput.value = '';
        });
    }
    
    
    loadComments();
   
    if (copyButton && shareInput) {
        copyButton.addEventListener('click', function() {
            shareInput.select();
            shareInput.setSelectionRange(0, shareInput.value.length);
            
            navigator.clipboard.writeText(shareInput.value).then(() => {
                alert('Enlace copiado con éxito'); 
                copyButton.textContent = 'Copied!';
                setTimeout(function() {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }).catch(err => {
                console.error('Error copying text: ', err);
                alert('Error al copiar el enlace'); 
            });
        });
    }
});
