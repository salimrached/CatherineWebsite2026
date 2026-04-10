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
