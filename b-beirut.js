const cards = Array.from(document.querySelectorAll(".bb-card"));
const overlay = document.getElementById("video-overlay");
const player = document.getElementById("video-overlay-player");
const caption = document.getElementById("video-overlay-caption");
const closeBtn = document.getElementById("video-overlay-close");
const prevBtn = document.getElementById("video-overlay-prev");
const nextBtn = document.getElementById("video-overlay-next");

let currentIndex = 0;
let currentVolume = 0.2;

function openVideo(index) {
  currentIndex = index;
  player.src = cards[currentIndex].dataset.video;
  player.volume = currentVolume;
  caption.textContent = cards[currentIndex].dataset.description || "";
  overlay.classList.add("active");
  player.play();
}

function closeVideo() {
  overlay.classList.remove("active");
  player.pause();
  player.src = "";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  player.src = cards[currentIndex].dataset.video;
  player.volume = currentVolume;
  caption.textContent = cards[currentIndex].dataset.description || "";
  player.play();
}

function showNext() {
  currentIndex = (currentIndex + 1) % cards.length;
  player.src = cards[currentIndex].dataset.video;
  player.volume = currentVolume;
  caption.textContent = cards[currentIndex].dataset.description || "";
  player.play();
}

// Remember volume changes made by the user
player.addEventListener("volumechange", () => {
  currentVolume = player.volume;
});

cards.forEach((card, index) => {
  card.addEventListener("click", () => openVideo(index));
});

closeBtn.addEventListener("click", closeVideo);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Close when clicking the dark backdrop
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeVideo();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("active")) return;
  if (e.key === "Escape") closeVideo();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});

// Touch swipe navigation
let touchStartX = 0;

overlay.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

overlay.addEventListener("touchend", (e) => {
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) < 50) return;
  if (delta > 0) showNext();
  else showPrev();
});
