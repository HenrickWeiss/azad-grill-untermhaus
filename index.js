// Mobiles Burger-Menü (auf allen Seiten eingebunden)
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Menü nach Klick auf einen Link automatisch schließen (mobil)
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// "Hier Bestellen" Button auf der Startseite
const hierBestellenBtn = document.getElementById("hierbestellen");
if (hierBestellenBtn) {
  hierBestellenBtn.addEventListener("click", () => {
    window.location.href = "bestellen.html";
  });
}
