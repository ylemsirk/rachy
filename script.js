<script>
  const audio = document.getElementById('audio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const progressBar = document.getElementById('progressBar');

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '⏸️';
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶️';
    }
  });

  audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    progressBar.max = audio.duration;
  });

  progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
  });
</script>
