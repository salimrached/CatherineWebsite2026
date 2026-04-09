const card = document.querySelector(".intown-card");
const overlay = document.getElementById("video-overlay");
const player = document.getElementById("video-overlay-player");
const caption = document.getElementById("video-overlay-caption");
const closeBtn = document.getElementById("video-overlay-close");

let currentVolume = 0.2;

function openVideo() {
  player.src = card.dataset.video;
  player.volume = currentVolume;
  caption.textContent = card.dataset.description || "";
  overlay.classList.add("active");
  player.play();
}

function closeVideo() {
  overlay.classList.remove("active");
  player.pause();
  player.src = "";
}

player.addEventListener("volumechange", () => {
  currentVolume = player.volume;
});

card.addEventListener("click", openVideo);
closeBtn.addEventListener("click", closeVideo);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeVideo();
});

document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("active")) return;
  if (e.key === "Escape") closeVideo();
});
