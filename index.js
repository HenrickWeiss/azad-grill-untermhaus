// 🔥 IMPORTS MÜSSEN GANZ OBEN STEHEN
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ==========================
// ACCORDION
// ==========================
const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    headers.forEach(h => {
      if (h !== header) {
        h.classList.remove("active");
        h.nextElementSibling.style.maxHeight = null;
      }
    });

    header.classList.toggle("active");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// ==========================
// WARENKORB
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price.toFixed(2)} €</span>
      <button data-index="${index}">✖</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });

    cartItems.appendChild(div);
  });

  cartTotal.innerText = `Gesamt: ${total.toFixed(2)} €`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// ADD-BUTTONS
// ==========================
document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    cart.push({
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price)
    });

    renderCart();

    // visuelles Feedback
    const original = btn.innerText;
    btn.innerText = "✔";
    btn.classList.add("added");

    setTimeout(() => {
      btn.innerText = original;
      btn.classList.remove("added");
    }, 800);
  });
});


// ==========================
// BESTELLEN → FIREBASE
// ==========================
const bestellenBtn = document.getElementById("bestellenbtn");

bestellenBtn.addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Der Warenkorb ist leer.");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  try {
    await addDoc(collection(db, "orders"), {
      items: cart,
      total: total,
      status: "neu",
      createdAt: serverTimestamp()
    });

    alert("Bestellung wurde erfolgreich an den Laden gesendet!");

    cart = [];
    localStorage.removeItem("cart");
    renderCart();

  } catch (err) {
    console.error(err);
    alert("Fehler beim Senden der Bestellung.");
  }
});
