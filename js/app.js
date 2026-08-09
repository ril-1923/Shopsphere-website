/* =========================================================
   ShopSphere — App Shell (navbar, footer, toasts, utilities)
   ========================================================= */

/* ---------- Cart / Wishlist storage helpers (shared) ---------- */
function getCart(){
  return JSON.parse(localStorage.getItem("ss_cart") || "[]");
}
function saveCart(cart){
  localStorage.setItem("ss_cart", JSON.stringify(cart));
  updateHeaderCounts();
}
function getWishlist(){
  return JSON.parse(localStorage.getItem("ss_wishlist") || "[]");
}
function saveWishlist(list){
  localStorage.setItem("ss_wishlist", JSON.stringify(list));
  updateHeaderCounts();
}
function cartItemCount(){
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateHeaderCounts(){
  const cartBadge = document.getElementById("cartCount");
  const wishBadge = document.getElementById("wishCount");
  if(cartBadge) cartBadge.textContent = cartItemCount();
  if(wishBadge) wishBadge.textContent = getWishlist().length;
}

/* ---------- Toast notifications ---------- */
function showToast(message, type = "success"){
  const container = document.getElementById("toastContainer");
  if(!container) return;
  const icons = {
    success: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    info: "bi-info-circle-fill"
  };
  const colors = { success: "text-teal", error: "text-coral", info: "text-teal" };
  const id = "t" + Date.now();
  const toastHTML = `
    <div id="${id}" class="toast align-items-center border-0 shadow-soft" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi ${icons[type]} ${colors[type]} fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", toastHTML);
  const toastEl = document.getElementById(id);
  const toast = new bootstrap.Toast(toastEl, { delay: 2600 });
  toast.show();
  toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
}

/* ---------- Navbar / Footer markup ---------- */
function headerHTML(active){
  const link = (href, label, key) => `<a class="nav-link ss-nav-link ${active===key?'active':''}" href="${href}">${label}</a>`;
  return `
  <div class="ss-topbar py-1 d-none d-md-block">
    <div class="container d-flex justify-content-between align-items-center">
      <span><i class="bi bi-truck me-1"></i> Free shipping on orders over ₹2,000</span>
      <div class="d-flex gap-3">
        <a href="about.html"><i class="bi bi-question-circle me-1"></i>Help</a>
        <a href="contact.html"><i class="bi bi-geo-alt me-1"></i>Track Order</a>
      </div>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg ss-navbar sticky-top">
    <div class="container">
      <a class="navbar-brand ss-brand" href="index.html">ShopSphere<span class="dot">.</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#ssNav" aria-controls="ssNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="ssNav">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">${link("index.html","Home","home")}</li>
          <li class="nav-item">${link("shop.html","Shop","shop")}</li>
          <li class="nav-item dropdown">
            <a class="nav-link ss-nav-link dropdown-toggle ${active==='categories'?'active':''}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categories</a>
            <ul class="dropdown-menu">
              ${Object.keys(CATEGORY_ICONS).map(c => `<li><a class="dropdown-item" href="shop.html?category=${encodeURIComponent(c)}"><i class="bi ${CATEGORY_ICONS[c]} me-2"></i>${c}</a></li>`).join("")}
            </ul>
          </li>
          <li class="nav-item">${link("shop.html?deals=1","Deals","deals")}</li>
          <li class="nav-item">${link("about.html","About","about")}</li>
          <li class="nav-item">${link("contact.html","Contact","contact")}</li>
        </ul>
        <form class="ss-search d-flex me-3 my-2 my-lg-0" style="max-width:280px;" role="search" onsubmit="return doHeaderSearch(event)">
          <input class="form-control" type="search" id="headerSearchInput" placeholder="Search products..." aria-label="Search">
          <button class="btn" type="submit" aria-label="Search"><i class="bi bi-search"></i></button>
        </form>
        <div class="d-flex align-items-center gap-2">
          <a href="wishlist.html" class="btn-icon-circle position-relative" aria-label="Wishlist">
            <i class="bi bi-heart"></i><span class="wish-badge" id="wishCount">0</span>
          </a>
          <a href="cart.html" class="btn-icon-circle position-relative" aria-label="Cart">
            <i class="bi bi-bag"></i><span class="cart-badge" id="cartCount">0</span>
          </a>
          <a href="login.html" class="btn btn-coral btn-sm px-3 py-2 rounded-2 d-none d-md-inline-flex align-items-center gap-1">
            <i class="bi bi-person"></i> Login
          </a>
        </div>
      </div>
    </div>
  </nav>`;
}

function footerHTML(){
  return `
  <footer class="ss-footer pt-5 pb-4 mt-5">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <h5 class="text-white font-display mb-3">ShopSphere<span class="text-coral">.</span></h5>
          <p class="pe-lg-4">ShopSphere is a modern online marketplace bringing together electronics, fashion, home goods, and more — curated for quality and priced fairly.</p>
          <div class="d-flex gap-2 mt-3">
            <a href="#" class="social-circle" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" class="social-circle" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="social-circle" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
            <a href="#" class="social-circle" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="#" class="social-circle" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-6">
          <h6 class="mb-3">Quick Links</h6>
          <ul class="list-unstyled d-grid gap-2">
            <li><a href="index.html">Home</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6">
          <h6 class="mb-3">Customer Service</h6>
          <ul class="list-unstyled d-grid gap-2">
            <li><a href="contact.html#faq">FAQ</a></li>
            <li><a href="contact.html#faq">Shipping</a></li>
            <li><a href="contact.html#faq">Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6">
          <h6 class="mb-3">Contact</h6>
          <ul class="list-unstyled d-grid gap-2">
            <li><i class="bi bi-envelope me-2"></i>support@shopsphere.example</li>
            <li><i class="bi bi-telephone me-2"></i>+91 98765 43210</li>
            <li><i class="bi bi-geo-alt me-2"></i>142 Anna Salai, Chennai, TN 600002</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="ss-footer-bottom mt-4 py-3">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 text-center">
        <span>&copy; ${new Date().getFullYear()} ShopSphere. All rights reserved.</span>
        <span>Built as a frontend portfolio project.</span>
      </div>
    </div>
  </footer>`;
}

function doHeaderSearch(e){
  e.preventDefault();
  const q = document.getElementById("headerSearchInput").value.trim();
  window.location.href = "shop.html" + (q ? ("?search=" + encodeURIComponent(q)) : "");
  return false;
}

/* ---------- Init shell on every page ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const headerEl = document.getElementById("header-placeholder");
  const footerEl = document.getElementById("footer-placeholder");
  if(headerEl) headerEl.innerHTML = headerHTML(document.body.dataset.page || "");
  if(footerEl) footerEl.innerHTML = footerHTML();
  updateHeaderCounts();

  // Back to top button
  const btn = document.getElementById("backToTop");
  if(btn){
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show", window.scrollY > 400);
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Enable all Bootstrap tooltips if present
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
});

/* ---------- Reusable: build a product card ---------- */
function productCardHTML(p){
  const inWishlist = getWishlist().includes(p.id);
  return `
  <div class="col-6 col-md-4 col-lg-3">
    <div class="product-card">
      <a href="product-details.html?id=${p.id}" class="text-decoration-none">
        <div class="product-thumb">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="badge-category">${p.category}</span>
          ${p.discount ? `<span class="badge-discount">-${p.discount}%</span>` : ""}
        </div>
      </a>
      <button class="wishlist-toggle ${inWishlist ? 'active' : ''}" onclick="toggleWishlistFromCard(event, ${p.id})" aria-label="Toggle wishlist">
        <i class="bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}"></i>
      </button>
      <div class="product-body">
        <div class="product-cat-label">${p.category}</div>
        <a href="product-details.html?id=${p.id}" class="text-decoration-none">
          <div class="product-name">${p.name}</div>
        </a>
        <div class="product-rating my-1 stars">${renderStars(p.rating)} <span class="count">(${p.reviews})</span></div>
        <div class="d-flex align-items-baseline gap-2 mb-2">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-oldprice">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <div class="d-grid gap-2 d-md-flex">
          <button class="btn btn-coral btn-sm flex-grow-1" onclick="addToCartFromCard(event, ${p.id})">
            <i class="bi bi-bag-plus me-1"></i>Add to Cart
          </button>
          <a href="product-details.html?id=${p.id}" class="btn btn-outline-ink btn-sm">View</a>
        </div>
      </div>
    </div>
  </div>`;
}

function addToCartFromCard(e, id){
  e.preventDefault();
  addToCart(id, 1);
  showToast("Added to cart", "success");
}

function toggleWishlistFromCard(e, id){
  e.preventDefault();
  const list = getWishlist();
  const idx = list.indexOf(id);
  if(idx === -1){
    list.push(id);
    showToast("Added to wishlist", "success");
  } else {
    list.splice(idx, 1);
    showToast("Removed from wishlist", "info");
  }
  saveWishlist(list);
  const btn = e.currentTarget;
  btn.classList.toggle("active");
  btn.querySelector("i").className = "bi " + (btn.classList.contains("active") ? "bi-heart-fill" : "bi-heart");
}

/* ---------- Add to cart (shared, defined here so every page can use it) ---------- */
function addToCart(id, qty = 1, options = {}){
  const cart = getCart();
  const existing = cart.find(i => i.id === id && i.color === (options.color || null) && i.size === (options.size || null));
  if(existing){
    existing.qty += qty;
  } else {
    cart.push({ id, qty, color: options.color || null, size: options.size || null });
  }
  saveCart(cart);
}
