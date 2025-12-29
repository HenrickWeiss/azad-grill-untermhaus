const buttons = document.querySelectorAll(".btnM");
const contents = document.querySelectorAll(".content");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // alles zurücksetzen
    buttons.forEach(btn => btn.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // neuen Button aktivieren
    button.classList.add("active");

    // passenden Content anzeigen
    const target = button.dataset.target;
    document.getElementById(target).classList.add("active");
  });
});
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    // alle anderen schließen
    headers.forEach(h => {
      if (h !== header) {
        h.classList.remove("active");
        h.nextElementSibling.style.maxHeight = null;
      }
    });

    // aktuelles toggeln
    header.classList.toggle("active");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
