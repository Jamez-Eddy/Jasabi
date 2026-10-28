const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#navLinks");

// Replace this with Jasabi's official WhatsApp number, digits only.
// Example Nigeria format: 2348012345678
const WHATSAPP_NUMBER = "2340000000000";

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const today = new Date().toISOString().split("T")[0];
checkIn.min = today;
checkOut.min = today;

checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || today;
  if (checkOut.value && checkOut.value < checkIn.value) checkOut.value = "";
});

document.getElementById("bookingLink").addEventListener("click", e => {
  e.preventDefault();
  const guests = document.getElementById("guests").value;
  const message = `Hello Jasabi, I would like to enquire about a stay.${checkIn.value ? ` Check-in: ${checkIn.value}.` : ""}${checkOut.value ? ` Check-out: ${checkOut.value}.` : ""} Guests: ${guests}.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

let selectedPitch = "Full Soccer Pitch";
document.querySelectorAll(".pitch-option").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pitch-option").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    selectedPitch = button.dataset.pitch;
  });
});

const pitchDate = document.getElementById("pitchDate");
pitchDate.min = today;

document.getElementById("pitchForm").addEventListener("submit", e => {
  e.preventDefault();
  const date = pitchDate.value;
  const time = document.getElementById("pitchTime").value;
  const team = document.getElementById("teamName").value.trim();
  const message = `Hello Jasabi, I would like to request a pitch booking. Pitch: ${selectedPitch}. Date: ${date}. Preferred time: ${time}. Team/group: ${team}.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

function setWhatsAppLinks() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Jasabi, I would like to make an enquiry.")}`;
  ["whatsappCta", "footerWhatsApp"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = url;
  });
}
setWhatsAppLinks();

// Reveal-on-scroll
const revealItems = document.querySelectorAll(".feature-card, .sports-feature, .pitch-booking, .dining, .gallery-item, .quote-grid blockquote, .explore");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(el => el.classList.add("reveal"));
revealItems.forEach(el => observer.observe(el));
