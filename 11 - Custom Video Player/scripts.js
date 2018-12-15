const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type=range]');

function toggleVideo() {
  video[video.paused ? "play" : "pause"]();
}

function updateToggle() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function updateProgress() {
  const persent = (video.currentTime/video.duration)*100;
  progressBar.style.flexBasis = `${persent}%`;
}

function scrub(e) {

  video.currentTime = (e.offsetX/progress.offsetWidth)*video.duration;
}

toggle.addEventListener('click', toggleVideo);
video.addEventListener('click', toggleVideo);
video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('timeupdate', updateProgress);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
})
let mousedown = false
progress.addEventListener('click',scrub);
progress.addEventListener('mousedown',()=> mousedown=true);
progress.addEventListener('mouseup',()=> mousedown=false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
