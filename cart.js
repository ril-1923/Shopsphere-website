/* =========================================================
   ShopSphere — Cart Page Logic
   ========================================================= */

const SHIPPING_FLAT = 99;
const TAX_RATE = 0.05; // 5%
let appliedCoupon = JSON.parse(localStorage.getItem("ss_coupon") || "null");

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  const couponForm = document.getElementById("couponForm");
  if(couponForm) couponForm.addEventListener("submit", applyCoupon);
});

function renderCartPage(){
  const cart = getCart();
  const listEl = document.getElementById("cartList");
  const emptyEl = document.getElementById("cartEmpty");
  const summaryEl = document.getElementById("cartSummaryWrap");

  if(!listEl) return;

  if(cart.length === 0){
    listEl.innerHTML = "";
    if(emptyEl) emptyEl.classList.remove("d-none");
    if(summaryEl) summaryEl.classList.add("d-none");
    return;
  }

  if(emptyEl) emptyEl.classList.add("d-none");
  if(summaryEl) summaryEl.classList.remove("d-none");

  listEl.innerHTML = cart.map(item => {
    const p = getProductById(item.id);
    if(!p) return "";
    return `
    <div class="cart-item-row p-3 mb-3">
      <div class="row align-items-center g-3">
        <div class="col-3 col-md-2">
          <img src="${p.image}" class="cart-thumb w-100" alt="${p.name}">
        </div>
        <div class="col-9 col-md-4">
          <a href="product-details.html?id=${p.id}" class="fw-bold text-ink text-decoration-none d-block">${p.name}</a>
          <small class="text-muted">${item.color ? `Color: <span class="d-inline-block rounded-circle" style="width:12px;height:12px;background:${item.color};vertical-align:middle;"></span> ` : ""}${item.size ? `Size: ${item.size}` : ""}</small>
        </div>
        <div class="col-4 col-md-2">
          <div class="qty-control">
            <button type="button" onclick="changeQty(${p.id}, '${item.color}', '${item.size}', -1)" aria-label="Decrease quantity">−</button>
            <input type="text" readonly value="${item.qty}" aria-label="Quantity">
            <button type="button" onclick="changeQty(${p.id}, '${item.color}', '${item.size}', 1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="col-4 col-md-2 fw-bold">${formatPrice(p.price * item.qty)}</div>
        <div class="col-4 col-md-2 text-end">
          <button class="btn btn-outline-coral btn-sm" onclick="removeFromCart(${p.id}, '${item.color}', '${item.size}')">
            <i class="bi bi-trash3 me-1"></i>Remove
          </button>
        </div>
      </div>
    </div>`;
  }).join("");

  updateCartTotals();
}

function findCartIndex(cart, id, color, size){
  return cart.findIndex(i => i.id === Number(id) &&
    String(i.color) === String(color === "null" ? null : color) &&
    String(i.size) === String(size === "null" ? null : size));
}

function changeQty(id, color, size, delta){
  const cart = getCart();
  const idx = findCartIndex(cart, id, color, size);
  if(idx === -1) return;
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  renderCartPage();
}

function removeFromCart(id, color, size){
  const cart = getCart();
  const idx = findCartIndex(cart, id, color, size);
  if(idx !== -1) cart.splice(idx, 1);
  saveCart(cart);
  renderCartPage();
  showToast("Item removed from cart", "info");
}

function cartSubtotal(){
  return getCart().reduce((sum, item) => {
    const p = getProductById(item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

function updateCartTotals(){
  const subtotal = cartSubtotal();
  const discount = appliedCoupon ? Math.round(subtotal * (appliedCoupon.percent / 100)) : 0;
  const shipping = subtotal > 0 ? (subtotal > 2000 ? 0 : SHIPPING_FLAT) : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + shipping + tax;

  setText("sumSubtotal", formatPrice(subtotal));
  setText("sumDiscount", "-" + formatPrice(discount));
  setText("sumShipping", shipping === 0 ? "Free" : formatPrice(shipping));
  setText("sumTax", formatPrice(tax));
  setText("sumTotal", formatPrice(total));

  const couponNote = document.getElementById("couponAppliedNote");
  if(couponNote){
    couponNote.textContent = appliedCoupon ? `Coupon "${appliedCoupon.code}" applied (-${appliedCoupon.percent}%)` : "";
  }
}

function setText(id, text){
  const el = document.getElementById(id);
  if(el) el.textContent = text;
}

function applyCoupon(e){
  e.preventDefault();
  const input = document.getElementById("couponInput");
  const code = input.value.trim().toUpperCase();
  if(!code){ showToast("Enter a coupon code", "error"); return; }
  if(COUPONS[code]){
    appliedCoupon = { code, percent: COUPONS[code] };
    localStorage.setItem("ss_coupon", JSON.stringify(appliedCoupon));
    showToast(`Coupon applied: ${COUPONS[code]}% off`, "success");
  } else {
    showToast("Invalid coupon code", "error");
  }
  updateCartTotals();
}
