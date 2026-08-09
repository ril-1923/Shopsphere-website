/* =========================================================
   ShopSphere — Product Details Page Logic
   ========================================================= */

let currentProduct = null;
let selectedColor = null;
let selectedSize = null;
let selectedQty = 1;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id")) || PRODUCTS[0].id;
  currentProduct = getProductById(id);

  if(!currentProduct){
    document.getElementById("pdContent").innerHTML = `<div class="empty-state"><i class="bi bi-emoji-frown"></i><h4 class="mt-3">Product not found</h4><a href="shop.html" class="btn btn-coral mt-2">Back to Shop</a></div>`;
    return;
  }

  renderProductDetails();
  renderRelatedProducts();

  document.getElementById("qtyMinus").addEventListener("click", () => changeSelectedQty(-1));
  document.getElementById("qtyPlus").addEventListener("click", () => changeSelectedQty(1));
  document.getElementById("addToCartBtn").addEventListener("click", handleAddToCart);
  document.getElementById("buyNowBtn").addEventListener("click", handleBuyNow);
  document.getElementById("wishlistBtn").addEventListener("click", handleWishlistToggle);
});

function renderProductDetails(){
  const p = currentProduct;
  document.title = p.name + " — ShopSphere";

  document.getElementById("breadcrumbCategory").textContent = p.category;
  document.getElementById("breadcrumbCategory").href = `shop.html?category=${encodeURIComponent(p.category)}`;
  document.getElementById("breadcrumbName").textContent = p.name;

  document.getElementById("pdMainImage").src = p.image;
  document.getElementById("pdThumbs").innerHTML = [p.image, p.image, p.image].map((img, i) => `
    <div class="col-4">
      <div class="pd-thumb-small ${i===0?'active':''}" onclick="switchThumb(this, '${img}')">
        <img src="${img}" alt="${p.name} view ${i+1}">
      </div>
    </div>`).join("");

  document.getElementById("pdName").textContent = p.name;
  document.getElementById("pdRatingStars").innerHTML = renderStars(p.rating);
  document.getElementById("pdReviewCount").textContent = `${p.reviews} reviews`;
  document.getElementById("pdRatingValue").textContent = p.rating;
  document.getElementById("pdPrice").textContent = formatPrice(p.price);
  document.getElementById("pdOldPrice").textContent = p.oldPrice ? formatPrice(p.oldPrice) : "";
  document.getElementById("pdDiscountBadge").textContent = p.discount ? `${p.discount}% OFF` : "";
  document.getElementById("pdDiscountBadge").classList.toggle("d-none", !p.discount);
  document.getElementById("pdDescription").textContent = p.description;
  document.getElementById("pdSpecDescription").textContent = p.description;

  const stockEl = document.getElementById("pdStock");
  if(p.stock > 10){
    stockEl.innerHTML = `<i class="bi bi-check-circle-fill text-teal me-1"></i><span class="text-teal fw-semibold">In Stock</span> — ${p.stock} available`;
  } else if(p.stock > 0){
    stockEl.innerHTML = `<i class="bi bi-exclamation-circle-fill text-warning me-1"></i><span class="fw-semibold" style="color:#D99A1F">Low Stock</span> — only ${p.stock} left`;
  } else {
    stockEl.innerHTML = `<i class="bi bi-x-circle-fill text-coral me-1"></i><span class="text-coral fw-semibold">Out of Stock</span>`;
    document.getElementById("addToCartBtn").disabled = true;
    document.getElementById("buyNowBtn").disabled = true;
  }

  // Colors
  const colorWrap = document.getElementById("pdColors");
  const colorSection = document.getElementById("pdColorSection");
  if(p.colors && p.colors.length){
    colorSection.classList.remove("d-none");
    colorWrap.innerHTML = p.colors.map((c, i) => `<span class="color-swatch ${i===0?'active':''}" style="background:${c}" onclick="selectColor(this,'${c}')"></span>`).join("");
    selectedColor = p.colors[0];
  } else {
    colorSection.classList.add("d-none");
  }

  // Sizes
  const sizeWrap = document.getElementById("pdSizes");
  const sizeSection = document.getElementById("pdSizeSection");
  if(p.sizes && p.sizes.length){
    sizeSection.classList.remove("d-none");
    sizeWrap.innerHTML = p.sizes.map((s, i) => `<span class="size-swatch ${i===0?'active':''}" onclick="selectSize(this,'${s}')">${s}</span>`).join("");
    selectedSize = p.sizes[0];
  } else {
    sizeSection.classList.add("d-none");
  }

  // Specs table
  document.getElementById("pdSpecsTable").innerHTML = `
    <tr><th>Category</th><td>${p.category}</td></tr>
    <tr><th>Rating</th><td>${p.rating} / 5 (${p.reviews} reviews)</td></tr>
    <tr><th>Stock</th><td>${p.stock} units</td></tr>
    <tr><th>SKU</th><td>SS-${String(p.id).padStart(5,'0')}</td></tr>
    <tr><th>Availability</th><td>${p.stock > 0 ? "Ships in 2-4 business days" : "Currently unavailable"}</td></tr>
  `;

  // Sample reviews
  document.getElementById("pdReviewsList").innerHTML = buildSampleReviews(p);

  updateWishlistBtnState();
}

function switchThumb(el, src){
  document.getElementById("pdMainImage").src = src;
  document.querySelectorAll(".pd-thumb-small").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
}

function selectColor(el, color){
  selectedColor = color;
  document.querySelectorAll("#pdColors .color-swatch").forEach(s => s.classList.remove("active"));
  el.classList.add("active");
}

function selectSize(el, size){
  selectedSize = size;
  document.querySelectorAll("#pdSizes .size-swatch").forEach(s => s.classList.remove("active"));
  el.classList.add("active");
}

function changeSelectedQty(delta){
  selectedQty = Math.max(1, selectedQty + delta);
  document.getElementById("qtyInput").value = selectedQty;
}

function handleAddToCart(){
  addToCart(currentProduct.id, selectedQty, { color: selectedColor, size: selectedSize });
  showToast("Added to cart", "success");
}

function handleBuyNow(){
  addToCart(currentProduct.id, selectedQty, { color: selectedColor, size: selectedSize });
  window.location.href = "checkout.html";
}

function handleWishlistToggle(){
  const list = getWishlist();
  const idx = list.indexOf(currentProduct.id);
  if(idx === -1){
    list.push(currentProduct.id);
    showToast("Added to wishlist", "success");
  } else {
    list.splice(idx, 1);
    showToast("Removed from wishlist", "info");
  }
  saveWishlist(list);
  updateWishlistBtnState();
}

function updateWishlistBtnState(){
  const btn = document.getElementById("wishlistBtn");
  const active = getWishlist().includes(currentProduct.id);
  btn.innerHTML = active ? `<i class="bi bi-heart-fill me-2"></i>Wishlisted` : `<i class="bi bi-heart me-2"></i>Add to Wishlist`;
  btn.classList.toggle("btn-coral", active);
  btn.classList.toggle("btn-outline-ink", !active);
}

function renderRelatedProducts(){
  const related = PRODUCTS.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
  document.getElementById("relatedProductsGrid").innerHTML = related.map(productCardHTML).join("");
}

function buildSampleReviews(p){
  const names = ["Aarav Mehta", "Priya Nair", "Rohan Kapoor", "Sneha Iyer"];
  const comments = [
    "Exactly as described, and it arrived faster than expected. Would buy again.",
    "Good quality for the price. Packaging was excellent too.",
    "Does the job well. A couple of minor quirks but overall happy with it.",
    "Really impressed — better than similar products I've tried before."
  ];
  return names.slice(0, 3).map((name, i) => `
    <div class="border-bottom pb-3 mb-3">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <div class="d-flex align-items-center gap-2">
          <span class="avatar-circle">${name.charAt(0)}</span>
          <strong>${name}</strong>
        </div>
        <small class="text-muted">${["2 weeks ago","1 month ago","3 months ago"][i]}</small>
      </div>
      <div class="stars mb-1">${renderStars(Math.max(3.5, p.rating - i*0.3))}</div>
      <p class="mb-0 text-ink-soft">${comments[i]}</p>
    </div>`).join("");
}
