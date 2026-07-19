'use strict';

/**
 * All music information (Metadata & Paths)
 * Contains existing tracks plus the 6 recommended additions
 */
const tracks = [
  {
    backgroundImage: "https://i1.sndcdn.com/artworks-000198573644-ayznj3-t500x500.jpg",
    posterUrl: "https://i1.sndcdn.com/artworks-000198573644-ayznj3-t500x500.jpg",
    title: "Warriyo - Mortals (feat. Laura Brehm)",
    album: "NCS Release",
    year: 2016,
    artist: "Warriyo",
    musicPath: "./assets/music/Warriyo_-_Mortals__feat__Laura_Brehm___NCS_Release_.mp3",
    durationStr: "3:48"
  },
  {
    backgroundImage: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/378/1000x0/dreamer-1680825643-xI8uIuthxk.jpg",
    posterUrl: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/378/1000x0/dreamer-1680825643-xI8uIuthxk.jpg",
    title: "Alan Walker - Dreamer",
    album: "NCS Release",
    year: 2023,
    artist: "Alan Walker",
    musicPath: "./assets/music/Alan_Walker_-_Dreamer__NCS_Release_.mp3",
    durationStr: "2:43"
  },
  {
    backgroundImage: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/107/1000x0/rubik-1586946615-pjMMuCVdoZ.jpg",
    posterUrl: "https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/107/1000x0/rubik-1586946615-pjMMuCVdoZ.jpg",
    title: "Distrion & Electro-Light - Rubik",
    album: "NCS Release",
    year: 2015,
    artist: "Distrion & Electro-Light",
    musicPath: "./assets/music/Distrion___Electro-Light_-_Rubik__NCS_Release_.mp3",
    durationStr: "3:20"
  },
  {
    backgroundImage: "https://linkstorage.linkfire.com/medialinks/images/b89f7721-6c29-4b24-9eb5-d520be4b9887/artwork-440x440.jpg",
    posterUrl: "https://linkstorage.linkfire.com/medialinks/images/b89f7721-6c29-4b24-9eb5-d520be4b9887/artwork-440x440.jpg",
    title: "Janji - Heroes Tonight (feat. Johnning)",
    album: "NCS Release",
    year: 2015,
    artist: "Janji",
    musicPath: "./assets/music/Janji_-_Heroes_Tonight__feat__Johnning___NCS_Release_.mp3",
    durationStr: "3:28"
  },
  {
    backgroundImage: "https://i1.sndcdn.com/artworks-000175505526-iwx2m4-t500x500.jpg",
    posterUrl: "https://i1.sndcdn.com/artworks-000175505526-iwx2m4-t500x500.jpg",
    title: "JPB - High",
    album: "NCS Release",
    year: 2016, 
    artist: "JPB",
    musicPath: "./assets/music/JPB_-_High__NCS_Release_.mp3",
    durationStr: "3:12"
  }
];

/**
 * Event Utility Helper
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * RENDER PLAYLIST
 */
const playlist = document.querySelector("[data-music-list]");
const totalTracksLabel = document.getElementById("totalTracksLabel");

const renderPlaylist = function () {
  playlist.innerHTML = "";
  for (let i = 0, len = tracks.length; i < len; i++) {
    playlist.innerHTML += `
    <li data-index="${i}">
      <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-item="${i}">
        <!-- Index Badge -->
        <span class="track-index">${i + 1}</span>
        
        <!-- EQ Equalizer bars (Visible only if playing) -->
        <div class="eq-bar-container">
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
          <span class="eq-bar"></span>
        </div>

        <!-- Poster Thumbnail -->
        <div class="track-poster">
          <img src="${tracks[i].posterUrl}" alt="${tracks[i].title} Poster">
        </div>

        <!-- Track info details -->
        <div class="track-details">
          <p class="track-name">${tracks[i].title}</p>
          <p class="track-artist">${tracks[i].artist}</p>
        </div>

        <!-- Duration display -->
        <span class="track-duration-badge">${tracks[i].durationStr}</span>
      </button>
    </li>
    `;
  }
  if (totalTracksLabel) {
    totalTracksLabel.textContent = `${tracks.length} Songs`;
  }
}

renderPlaylist();

/**
 * PLAYLIST MODAL SIDEBAR TOGGLE
 * Controls the slide-in drawer effect on mobile viewports
 */
const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);

/**
 * PLAYLIST ITEM SWITCHING
 */
let playlistItems;
const refreshPlaylistItems = function() {
  playlistItems = document.querySelectorAll("[data-playlist-item]");
}
refreshPlaylistItems();

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
}

// Attach clicks to playlist item switch
const setupPlaylistItemEvents = function() {
  addEventOnElements(playlistItems, "click", function () {
    lastPlayedMusic = currentMusic;
    currentMusic = Number(this.dataset.playlistItem);
    changePlaylistItem();
    changePlayerInfo();
  });
}
setupPlaylistItemEvents();

/**
 * MUSIC SEARCH & FILTER
 */
const searchInput = document.getElementById("playlistSearch");
if (searchInput) {
  searchInput.addEventListener("input", function() {
    const filterText = this.value.toLowerCase().trim();
    const listItems = playlist.querySelectorAll("li");

    listItems.forEach(item => {
      const idx = Number(item.dataset.index);
      const track = tracks[idx];
      const titleMatch = track.title.toLowerCase().includes(filterText);
      const artistMatch = track.artist.toLowerCase().includes(filterText);

      if (titleMatch || artistMatch) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
}

/**
 * PLAYER METADATA & AUDIO INITIALIZATION
 */
const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");
const bgBlur = document.getElementById("bgBlur");
const vinylDisc = document.getElementById("vinylDisc");
const tonearmNeedle = document.getElementById("tonearmNeedle");
const visualizer = document.getElementById("visualizer");

const audioSource = new Audio(tracks[currentMusic].musicPath);
audioSource.volume = 0.8; // Default initial volume

// Function to handle image blur and cover load matching
const changePlayerInfo = function () {
  playerBanner.src = tracks[currentMusic].posterUrl;
  playerBanner.setAttribute("alt", `${tracks[currentMusic].title} Poster`);
  
  if (bgBlur) {
    bgBlur.style.backgroundImage = `url(${tracks[currentMusic].posterUrl})`;
  }
  
  playerTitle.textContent = tracks[currentMusic].title;
  playerAlbum.textContent = tracks[currentMusic].album;
  playerYear.textContent = tracks[currentMusic].year;
  playerArtist.textContent = tracks[currentMusic].artist;

  audioSource.src = tracks[currentMusic].musicPath;
  audioSource.addEventListener("loadeddata", updateDuration);

  // Play automatically on switch
  playMusic();
}

/** Audio Loading Error Fallback Handling */
audioSource.addEventListener("error", function(e) {
  console.warn("Audio file failed to load: ", tracks[currentMusic].musicPath);
  
  // Update status title to let user know it's a placeholder
  playerTitle.textContent = `⚠️ (File Missing) ${tracks[currentMusic].title}`;
  
  // Reset buttons & turntable states
  playBtn.classList.remove("active");
  if (vinylDisc) vinylDisc.classList.remove("spinning");
  if (tonearmNeedle) tonearmNeedle.classList.remove("playing");
  if (visualizer) visualizer.classList.remove("playing");
  clearInterval(playInterval);
});

/** update player duration metadata label */
const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");

/** pass seconds and get timecode format (mm:ss) */
const getTimecode = function (duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - (minutes * 60));
  const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return timecode;
}

const updateDuration = function () {
  playerSeekRange.max = Math.floor(audioSource.duration);
  playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
}

audioSource.addEventListener("loadeddata", updateDuration);

/**
 * PLAY / PAUSE LOGIC
 */
const playBtn = document.querySelector("[data-play-btn]");
let playInterval;

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play().then(() => {
      playBtn.classList.add("active");
      if (vinylDisc) vinylDisc.classList.add("spinning");
      if (tonearmNeedle) tonearmNeedle.classList.add("playing");
      if (visualizer) visualizer.classList.add("playing");
      
      clearInterval(playInterval);
      playInterval = setInterval(updateRunningTime, 500);
    }).catch(err => {
      // Handle playback error (e.g. missing placeholder MP3 file)
      console.warn("Playback could not start. Please verify MP3 path.", err);
      playBtn.classList.remove("active");
      if (vinylDisc) vinylDisc.classList.remove("spinning");
      if (tonearmNeedle) tonearmNeedle.classList.remove("playing");
      if (visualizer) visualizer.classList.remove("playing");
    });
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
    if (vinylDisc) vinylDisc.classList.remove("spinning");
    if (tonearmNeedle) tonearmNeedle.classList.remove("playing");
    if (visualizer) visualizer.classList.remove("playing");
    
    clearInterval(playInterval);
  }
}

playBtn.addEventListener("click", playMusic);

/** update running time while playing music */
const playerRunningTime = document.querySelector("[data-running-time]");

const updateRunningTime = function () {
  playerSeekRange.value = Math.floor(audioSource.currentTime);
  playerRunningTime.textContent = getTimecode(audioSource.currentTime);

  updateRangeFill(playerSeekRange);
  isMusicEnd();
}

/**
 * RANGE SLIDER GLOWING PROGRESS FILL
 */
const ranges = document.querySelectorAll("[data-range]");

const updateRangeFill = function (element) {
  let el = element || this;
  if (!el.max) el.max = 100;
  const rangeValue = (el.value / el.max) * 100;
  el.nextElementSibling.style.width = `${rangeValue}%`;
}

// Attach updates to ranges
ranges.forEach(range => {
  range.addEventListener("input", function() {
    updateRangeFill(this);
  });
});

/**
 * SEEKING POSITION
 */
const seek = function () {
  audioSource.currentTime = playerSeekRange.value;
  playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);

/**
 * MUSIC END DETECTOR
 */
const isMusicEnd = function () {
  if (audioSource.ended) {
    playBtn.classList.remove("active");
    if (vinylDisc) vinylDisc.classList.remove("spinning");
    if (tonearmNeedle) tonearmNeedle.classList.remove("playing");
    if (visualizer) visualizer.classList.remove("playing");
    audioSource.currentTime = 0;
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    updateRangeFill(playerSeekRange);
    
    // Auto trigger next song
    skipNext();
  }
}

/**
 * SKIP TO NEXT SONG
 */
const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic >= tracks.length - 1 ? currentMusic = 0 : currentMusic++;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipNextBtn.addEventListener("click", skipNext);

/**
 * SKIP TO PREVIOUS SONG
 */
const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function () {
  lastPlayedMusic = currentMusic;

  if (isShuffled) {
    shuffleMusic();
  } else {
    currentMusic <= 0 ? currentMusic = tracks.length - 1 : currentMusic--;
  }

  changePlayerInfo();
  changePlaylistItem();
}

playerSkipPrevBtn.addEventListener("click", skipPrev);

/**
 * SHUFFLE SYSTEM
 */
const getRandomMusic = () => Math.floor(Math.random() * tracks.length);

const shuffleMusic = () => {
  let randomMusic = getRandomMusic();
  while (currentMusic === randomMusic && tracks.length > 1) {
    randomMusic = getRandomMusic();
  }
  currentMusic = randomMusic;
}

const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

const shuffle = function () {
  playerShuffleBtn.classList.toggle("active");
  isShuffled = !isShuffled;
}

playerShuffleBtn.addEventListener("click", shuffle);

/**
 * REPEAT / LOOP TRACK
 */
const playerRepeatBtn = document.querySelector("[data-repeat]");

const repeat = function () {
  if (!audioSource.loop) {
    audioSource.loop = true;
    this.classList.add("active");
  } else {
    audioSource.loop = false;
    this.classList.remove("active");
  }
}

playerRepeatBtn.addEventListener("click", repeat);

/**
 * AUDIO VOLUME SLIDER
 */
const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  const iconSpan = playerVolumeBtn.children[0];
  if (audioSource.volume <= 0.02) {
    iconSpan.textContent = "volume_off";
  } else if (audioSource.volume <= 0.4) {
    iconSpan.textContent = "volume_down";
  } else {
    iconSpan.textContent = "volume_up";
  }
  updateRangeFill(playerVolumeRange);
}

playerVolumeRange.addEventListener("input", changeVolume);

/**
 * MUTE / UNMUTE BUTTON
 */
let storedVolume = 0.8;

const muteVolume = function () {
  const iconSpan = playerVolumeBtn.children[0];
  if (!audioSource.muted) {
    storedVolume = playerVolumeRange.value;
    audioSource.muted = true;
    playerVolumeRange.value = 0;
    iconSpan.textContent = "volume_off";
  } else {
    audioSource.muted = false;
    playerVolumeRange.value = storedVolume;
    if (storedVolume <= 0.02) {
      iconSpan.textContent = "volume_off";
    } else if (storedVolume <= 0.4) {
      iconSpan.textContent = "volume_down";
    } else {
      iconSpan.textContent = "volume_up";
    }
  }
  updateRangeFill(playerVolumeRange);
}

playerVolumeBtn.addEventListener("click", muteVolume);

/**
 * THEME SELECTOR & DROP-DOWN INTERACTION
 */
const userAvatarBtn = document.getElementById("userAvatarBtn");
const userMenu = document.getElementById("userMenu");
const themeButtons = document.querySelectorAll("[data-theme]");

// Open/Close Custom settings panel on avatar click
if (userAvatarBtn && userMenu) {
  userAvatarBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    userMenu.classList.toggle("active");
  });

  // Close panel on document click
  document.addEventListener("click", function(e) {
    if (!userMenu.contains(e.target) && e.target !== userAvatarBtn) {
      userMenu.classList.remove("active");
    }
  });
}

// Switch themes dynamically
themeButtons.forEach(btn => {
  btn.addEventListener("click", function() {
    const selectedTheme = this.dataset.theme;

    // Remove active class from buttons
    themeButtons.forEach(b => b.classList.remove("active"));
    this.classList.add("active");

    // Clear theme classes on body
    document.body.className = "";
    if (selectedTheme !== "midnight") {
      document.body.classList.add(`theme-${selectedTheme}`);
    }

    // Save in storage
    localStorage.setItem("auraplay-theme", selectedTheme);
  });
});

// Load saved theme on startup
const savedTheme = localStorage.getItem("auraplay-theme");
if (savedTheme && savedTheme !== "midnight") {
  const targetBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
  if (targetBtn) {
    targetBtn.click();
  }
}

// Initial update of fills
setTimeout(() => {
  updateRangeFill(playerSeekRange);
  updateRangeFill(playerVolumeRange);
  if (bgBlur) {
    bgBlur.style.backgroundImage = `url(${tracks[currentMusic].posterUrl})`;
  }
}, 300);
