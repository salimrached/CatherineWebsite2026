const burger = document.getElementById("burger");
const navUl = document.querySelector("nav ul");

burger.addEventListener("click", () => {
  navUl.classList.toggle("open");
  burger.classList.toggle("open");
});

// Close menu when a nav link is clicked
navUl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navUl.classList.remove("open");
    burger.classList.remove("open");
  });
});

// Close menu when clicking outside the nav or burger
document.addEventListener("click", (e) => {
  if (
    navUl.classList.contains("open") &&
    !navUl.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navUl.classList.remove("open");
    burger.classList.remove("open");
  }
});
