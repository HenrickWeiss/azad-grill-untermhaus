import { db } from "./firebase.js";
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const orderIdInput = document.getElementById("orderIdInput");
const checkStatusBtn = document.getElementById("checkStatusBtn");
const statusResult = document.getElementById("statusResult");

let unsubscribe = null;

checkStatusBtn.addEventListener("click", () => {
  const id = orderIdInput.value.trim();

  if (!id) {
    statusResult.innerText = "Bitte eine Bestell-ID eingeben.";
    return;
  }

  // wenn schon ein Listener existiert -> entfernen
  if (unsubscribe) unsubscribe();

  // Live Listener auf die Bestellung
  unsubscribe = onSnapshot(doc(db, "orders", id), (docSnap) => {
    if (!docSnap.exists()) {
      statusResult.innerText = "Bestellung nicht gefunden.";
      return;
    }

    const order = docSnap.data();
    statusResult.innerHTML = `
      <p><strong>Status:</strong> ${order.status}</p>
      <p><strong>Name:</strong> ${order.customer?.name || "—"}</p>
      <p><strong>Gesamt:</strong> ${order.total.toFixed(2)} €</p>
    `;
  });
});
