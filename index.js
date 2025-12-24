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
