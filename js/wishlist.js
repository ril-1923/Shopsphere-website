/* =========================================================
   ShopSphere — Wishlist Page Logic
   ========================================================= */

document.addEventListener("DOMContentLoaded", renderWishlistPage);

function renderWishlistPage(){
  const grid = document.getElementById("wishlistGrid");
  const emptyEl = document.getElementById("wishlistEmpty");
  if(!grid) return;

  const ids = getWishlist();
  if(ids.length === 0){
    grid.innerHTML = "";
    if(emptyEl) emptyEl.classList.remove("d-none");
    return;
  }
  if(emptyEl) emptyEl.classList.add("d-none");

  grid.innerHTML = ids.map(id => {
    const p = getProductById(id);
    if(!p) return "";
    return `
    <div class="col-sm-6 col-lg-4">
      <div class="product-card">
        <a href="product-details.html?id=${p.id}">
          <div class="product-thumb">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <span class="badge-category">${p.category}</span>
          </div>
        </a>
        <div class="product-body">
          <div class="product-name">${p.name}</div>
          <div class="product-rating my-1 stars">${renderStars(p.rating)} <span class="count">(${p.reviews})</span></div>
          <div class="product-price mb-2">${formatPrice(p.price)}</div>
          <div class="d-flex gap-2">
            <button class="btn btn-coral btn-sm flex-grow-1" onclick="moveToCart(${p.id})">
              <i class="bi bi-bag-plus me-1"></i>Add to Cart
            </button>
            <button class="btn btn-outline-coral btn-sm" onclick="removeFromWishlist(${p.id})" aria-label="Remove">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
}

function removeFromWishlist(id){
  const list = getWishlist().filter(x => x !== id);
  saveWishlist(list);
  renderWishlistPage();
  showToast("Removed from wishlist", "info");
}

function moveToCart(id){
  addToCart(id, 1);
  removeFromWishlist(id);
  showToast("Moved to cart", "success");
}
