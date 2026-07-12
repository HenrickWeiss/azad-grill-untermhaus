// Supabase wird erst beim tatsächlichen Bestellen geladen (nicht beim Seitenaufruf).
// So funktioniert der Warenkorb (Hinzufügen/Entfernen) auch, falls supabase.js
// mal fehlt, falsch verlinkt ist oder das CDN kurz nicht erreichbar ist.

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
// BESTELLEN → SUPABASE (mit Checkout-Daten)
// ==========================
const bestellenBtn = document.getElementById("bestellenbtn");

bestellenBtn.addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Der Warenkorb ist leer.");
    return;
  }

  // Checkout-Daten
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (!name || !phone || !paymentMethod) {
    alert("Bitte Name, Telefonnummer und Zahlungsart ausfüllen.");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  bestellenBtn.disabled = true;

  let supabase;
  try {
    ({ supabase } = await import("./supabase.js"));
  } catch (err) {
    console.error("supabase.js konnte nicht geladen werden:", err);
    alert("Die Bestellung konnte nicht gesendet werden (Verbindung zum Server fehlt). Bitte Seite neu laden oder später erneut versuchen.");
    bestellenBtn.disabled = false;
    return;
  }

  const { data: orderId, error } = await supabase
    .rpc("create_order", {
      p_items: cart,
      p_total: total,
      p_customer_name: name,
      p_customer_phone: phone,
      p_payment_method: paymentMethod
    });

  bestellenBtn.disabled = false;

  if (error) {
    console.error(error);
    alert("Fehler beim Senden der Bestellung.");
    return;
  }

  alert(`Bestellung wurde erfolgreich an den Laden gesendet! Ihre Bestell-Nr.: ${orderId}`);

  cart = [];
  localStorage.removeItem("cart");
  renderCart();
});

// renderCart initial aufrufen
renderCart();