document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.setAttribute("aria-expanded", "false");

    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains("active");

      // Andere schließen
      headers.forEach(h => {
        if (h !== header) {
          h.classList.remove("active");
          h.setAttribute("aria-expanded", "false");
          const c = h.nextElementSibling;
          c.style.maxHeight = null;
          c.style.display = "none";
        }
      });

      // Toggle öffnen/schließen
      header.classList.toggle("active");
      header.setAttribute("aria-expanded", String(!isOpen));

      if (isOpen) {
        content.style.maxHeight = null;
        content.style.display = "none";
      } else {
        content.style.display = "block";
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
