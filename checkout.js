/* =========================================================
   ShopSphere — Checkout Page Logic
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
  setupPaymentToggle();

  const form = document.getElementById("checkoutForm");
  if(form){
    form.addEventListener("submit", handleCheckoutSubmit);
  }
});

function renderCheckoutSummary(){
  const cart = getCart();
  const listEl = document.getElementById("checkoutItems");
  if(!listEl) return;

  if(cart.length === 0){
    listEl.innerHTML = `<p class="text-muted">Your cart is empty. <a href="shop.html">Continue shopping</a>.</p>`;
    document.getElementById("placeOrderBtn").disabled = true;
  }

  listEl.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if(!p) return "";
    return `
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div class="d-flex align-items-center gap-2">
        <img src="${p.image}" alt="${p.name}" style="width:46px;height:46px;object-fit:cover;border-radius:8px;">
        <div>
          <div class="fw-semibold small">${p.name}</div>
          <small class="text-muted">Qty: ${item.qty}</small>
        </div>
      </div>
      <span class="fw-semibold small">${formatPrice(p.price * item.qty)}</span>
    </div>`;
  }).join("");

  const subtotal = cartSubtotalSafe();
  const coupon = JSON.parse(localStorage.getItem("ss_coupon") || "null");
  const discount = coupon ? Math.round(subtotal * (coupon.percent / 100)) : 0;
  const shipping = subtotal > 0 ? (subtotal > 2000 ? 0 : 99) : 0;
  const tax = Math.round((subtotal - discount) * 0.05);
  const total = subtotal - discount + shipping + tax;

  setTextSafe("coSubtotal", formatPrice(subtotal));
  setTextSafe("coDiscount", "-" + formatPrice(discount));
  setTextSafe("coShipping", shipping === 0 ? "Free" : formatPrice(shipping));
  setTextSafe("coTax", formatPrice(tax));
  setTextSafe("coTotal", formatPrice(total));
}

function cartSubtotalSafe(){
  return getCart().reduce((sum, item) => {
    const p = getProductById(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}
function setTextSafe(id, text){
  const el = document.getElementById(id);
  if(el) el.textContent = text;
}

function setupPaymentToggle(){
  const radios = document.querySelectorAll('input[name="paymentMethod"]');
  radios.forEach(r => r.addEventListener("change", () => {
    document.getElementById("cardFields").classList.toggle("d-none", r.value !== "card" || !r.checked);
    document.getElementById("upiFields").classList.toggle("d-none", r.value !== "upi" || !r.checked);
  }));
}

function handleCheckoutSubmit(e){
  e.preventDefault();
  const form = e.target;

  if(!validateCheckoutForm(form)){
    showToast("Please fix the highlighted fields", "error");
    return;
  }

  // Simulate order placement
  const btn = document.getElementById("placeOrderBtn");
  const originalHTML = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Placing order...`;

  setTimeout(() => {
    localStorage.removeItem("ss_cart");
    localStorage.removeItem("ss_coupon");
    const modal = new bootstrap.Modal(document.getElementById("orderSuccessModal"));
    modal.show();
    btn.innerHTML = originalHTML;
    updateHeaderCounts();
  }, 1200);
}
