document.addEventListener("DOMContentLoaded", loadComments);

        function openModal() {
            document.getElementById("commentModal").style.display = "block";
        }
        function closeModal() {
            document.getElementById("commentModal").style.display = "none";
        }
        function likePost() {
            let likes = document.getElementById("likes-count");
            likes.textContent = parseInt(likes.textContent) + 1;
        }
        function copyLink() {
            let link = document.querySelector(".share input");
            link.select();
            document.execCommand("copy");
            alert("Link copiado al portapapeles!");
        }
        function addComment() {
            let commentText = document.getElementById("newComment").value;
            if (commentText.trim() === "") return;

            let newComment = {
                text: commentText,
                date: new Date().toLocaleString()
            };
            
            let comments = JSON.parse(localStorage.getItem("comments")) || [];
            comments.unshift(newComment);
            localStorage.setItem("comments", JSON.stringify(comments));
            
            displayComments();
            document.getElementById("newComment").value = "";
        }
        function loadComments() {
            displayComments();
        }
        function displayComments() {
            let commentContainer = document.getElementById("comments-container");
            commentContainer.innerHTML = "";
            let comments = JSON.parse(localStorage.getItem("comments")) || [];
            
            comments.forEach(comment => {
                let commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerHTML = `
                    <img src="profile.jpg" alt="Foto de perfil" class="profile-pic">
                    <div class="comment-content">
                        <span class="profile-name">Usuario</span>
                        <span class="profile-handle">@usuario</span>
                        <span class="comment-date">${comment.date}</span>
                        <p>${comment.text}</p>
                    </div>
                `;
                commentContainer.appendChild(commentElement);
            });
        }

        