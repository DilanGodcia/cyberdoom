const audio = document.getElementById("audioPlayer"); 
    const playPauseBtn = document.getElementById("playPauseBtn"); 
    const progressBar = document.getElementById("progressBar"); 

    playPauseBtn.addEventListener("click", () => { 
        if (audio.paused) { audio.play(); playPauseBtn.textContent = "⏸"; } else { audio.pause(); playPauseBtn.textContent = "▶";

     } 
});