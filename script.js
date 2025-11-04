document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.player_video');
  const toggle = document.querySelector('.toggle');
  const skipButtons = document.querySelectorAll('[data-skip]');
  const ranges = document.querySelectorAll('.player__slider');
  const progress = document.querySelector('.progress');
  const progressBar = document.querySelector('.progress__filled');

  let mousedown = false;

  if (!video) {
    console.error('player_video element not found in DOM');
    return;
  }

  // Toggle play/pause
  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  // Update button icon
  function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
  }

  // Skip forward or backward
  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  // Adjust volume or playback speed
  function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  // Update progress bar
  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
  }

  // Scrub (seek) on progress bar
  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  // Event listeners
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);

  toggle.addEventListener('click', togglePlay);
  skipButtons.forEach(btn => btn.addEventListener('click', skip));

  ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
  });

  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', e => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => (mousedown = true));
  progress.addEventListener('mouseup', () => (mousedown = false));
});
