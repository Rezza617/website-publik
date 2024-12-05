const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPause');
const prevTrackBtn = document.getElementById('prevTrack');
const nextTrackBtn = document.getElementById('nextTrack');
const volumeSlider = document.getElementById('volume');
const songList = document.getElementById('song-list');
const songElements = songList.querySelectorAll('li'); // Get all song list items
let currentSongIndex = 0;  // Initialize current song index

// Function to update song information, play/pause state, and duration
function updateSongInfo(songIndex) {
  const song = songElements[songIndex];
  const songSource = song.dataset.song; // Get song source from data attribute
  audio.src = songSource;
  audio.load(); // Load the new audio source

  const songInfo = song.textContent.split('-'); // Extract song information from list item text
  document.getElementById('song-name').textContent = songInfo[0].trim();
  document.getElementById('song-artist').textContent = songInfo[1].trim();

  // Update song duration (assuming duration is available in the data attribute)
  const songDuration = song.dataset.duration || '7:49'; // Use data attribute or default
  document.getElementById('song-duration').textContent = songDuration;

  // Update play/pause button state
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    audio.pause();
    playPauseBtn.textContent = 'Play';
  }

  // Update button states based on current song index
  prevTrackBtn.disabled = currentSongIndex === 0;
  nextTrackBtn.disabled = currentSongIndex === songElements.length - 1;
}

// Event listeners for play/pause, previous track, and next track buttons
playPauseBtn.addEventListener('click', () => updateSongInfo(currentSongIndex));

prevTrackBtn.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = songElements.length - 1; // Wrap around to last song
  updateSongInfo(currentSongIndex);
});

nextTrackBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= songElements.length) currentSongIndex = 0; // Wrap around to first song
  updateSongInfo(currentSongIndex);
});

// Event listener for volume slider
volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Optional: Update play/pause button on audio events (play/pause)
audio.addEventListener('play', () => {
  playPauseBtn.textContent = 'Pause';
});
audio.addEventListener('pause', () => {
  playPauseBtn.textContent = 'Play';
});

// Call updateSongInfo initially to set up the first song
updateSongInfo(currentSongIndex);
