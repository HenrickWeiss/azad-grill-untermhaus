document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;

      // Andere schließen
      headers.forEach(h => {
        if (h !== header) {
          h.classList.remove("active");
          const c = h.nextElementSibling;
          c.style.maxHeight = null;
          c.style.display = "none";
        }
      });

      // Toggle öffnen/schließen
      header.classList.toggle("active");

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.display = "none";
      } else {
        content.style.display = "block";
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });
});
