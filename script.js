const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navLinks");

menuToggle.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();
