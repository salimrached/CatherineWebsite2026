const cards = Array.from(document.querySelectorAll(".getfit-card"));
const overlay = document.getElementById("video-overlay");
const player = document.getElementById("video-overlay-player");
const closeBtn = document.getElementById("video-overlay-close");
const prevBtn = document.getElementById("video-overlay-prev");
const nextBtn = document.getElementById("video-overlay-next");

let currentIndex = 0;

function openVideo(index) {
  currentIndex = index;
  player.src = cards[currentIndex].dataset.video;
  player.volume = 0.3;
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
  player.volume = 0.3;
  player.play();
}

function showNext() {
  currentIndex = (currentIndex + 1) % cards.length;
  player.src = cards[currentIndex].dataset.video;
  player.volume = 0.1;
  player.play();
}

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
