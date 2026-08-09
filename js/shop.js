/* =========================================================
   ShopSphere — Shop Page Logic (search, filter, sort, paginate)
   ========================================================= */

const PAGE_SIZE = 8;
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  buildCategoryFilters();
  const params = new URLSearchParams(window.location.search);

  if(params.get("search")) document.getElementById("shopSearchInput").value = params.get("search");
  if(params.get("category")){
    const cb = document.querySelector(`.cat-filter[value="${params.get("category")}"]`);
    if(cb) cb.checked = true;
  }
  if(params.get("deals")) document.getElementById("dealsOnlyFilter").checked = true;

  document.getElementById("shopSearchInput").addEventListener("input", () => { currentPage = 1; renderShop(); });
  document.querySelectorAll(".cat-filter").forEach(cb => cb.addEventListener("change", () => { currentPage = 1; renderShop(); }));
  document.querySelectorAll(".rating-filter").forEach(rb => rb.addEventListener("change", () => { currentPage = 1; renderShop(); }));
  document.getElementById("priceRange").addEventListener("input", (e) => {
    document.getElementById("priceRangeValue").textContent = formatPrice(e.target.value);
    currentPage = 1;
    renderShop();
  });
  document.getElementById("dealsOnlyFilter").addEventListener("change", () => { currentPage = 1; renderShop(); });
  document.getElementById("sortSelect").addEventListener("change", () => renderShop());
  document.getElementById("clearFiltersBtn").addEventListener("click", clearFilters);

  renderShop();
});

function buildCategoryFilters(){
  const wrap = document.getElementById("categoryFilterList");
  if(!wrap) return;
  wrap.innerHTML = Object.keys(CATEGORY_ICONS).map(cat => {
    const count = PRODUCTS.filter(p => p.category === cat).length;
    return `
    <div class="form-check">
      <input class="form-check-input cat-filter" type="checkbox" value="${cat}" id="cat-${cat.replace(/\s/g,'')}">
      <label class="form-check-label" for="cat-${cat.replace(/\s/g,'')}">${cat} <span class="text-muted">(${count})</span></label>
    </div>`;
  }).join("");
}

function clearFilters(){
  document.getElementById("shopSearchInput").value = "";
  document.querySelectorAll(".cat-filter").forEach(cb => cb.checked = false);
  document.querySelectorAll(".rating-filter").forEach(rb => rb.checked = false);
  document.getElementById("ratingAny").checked = true;
  document.getElementById("priceRange").value = 30000;
  document.getElementById("priceRangeValue").textContent = formatPrice(30000);
  document.getElementById("dealsOnlyFilter").checked = false;
  document.getElementById("sortSelect").value = "default";
  currentPage = 1;
  renderShop();
}

function getFilteredProducts(){
  const search = document.getElementById("shopSearchInput").value.trim().toLowerCase();
  const checkedCats = Array.from(document.querySelectorAll(".cat-filter:checked")).map(cb => cb.value);
  const maxPrice = Number(document.getElementById("priceRange").value);
  const minRating = Number(document.querySelector(".rating-filter:checked")?.value || 0);
  const dealsOnly = document.getElementById("dealsOnlyFilter").checked;

  let list = PRODUCTS.filter(p => {
    if(search && !p.name.toLowerCase().includes(search)) return false;
    if(checkedCats.length && !checkedCats.includes(p.category)) return false;
    if(p.price > maxPrice) return false;
    if(p.rating < minRating) return false;
    if(dealsOnly && !p.discount) return false;
    return true;
  });

  const sort = document.getElementById("sortSelect").value;
  switch(sort){
    case "price-asc": list.sort((a,b) => a.price - b.price); break;
    case "price-desc": list.sort((a,b) => b.price - a.price); break;
    case "rating": list.sort((a,b) => b.rating - a.rating); break;
    case "newest": list.sort((a,b) => b.id - a.id); break;
    case "popular": list.sort((a,b) => b.reviews - a.reviews); break;
    default: break;
  }
  return list;
}

function renderShop(){
  const grid = document.getElementById("shopGrid");
  const noResults = document.getElementById("shopNoResults");
  const countLabel = document.getElementById("shopResultCount");
  const filtered = getFilteredProducts();

  countLabel.textContent = `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`;

  if(filtered.length === 0){
    grid.innerHTML = "";
    noResults.classList.remove("d-none");
    document.getElementById("shopPagination").innerHTML = "";
    return;
  }
  noResults.classList.add("d-none");

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  if(currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  grid.innerHTML = pageItems.map(productCardHTML).join("");
  renderPagination(totalPages);
}

function renderPagination(totalPages){
  const pag = document.getElementById("shopPagination");
  if(totalPages <= 1){ pag.innerHTML = ""; return; }
  let html = "";
  html += `<li class="page-item ${currentPage===1?'disabled':''}"><a class="page-link" href="#" onclick="goToPage(${currentPage-1});return false;">Previous</a></li>`;
  for(let i=1;i<=totalPages;i++){
    html += `<li class="page-item ${i===currentPage?'active':''}"><a class="page-link" href="#" onclick="goToPage(${i});return false;">${i}</a></li>`;
  }
  html += `<li class="page-item ${currentPage===totalPages?'disabled':''}"><a class="page-link" href="#" onclick="goToPage(${currentPage+1});return false;">Next</a></li>`;
  pag.innerHTML = html;
}

function goToPage(p){
  currentPage = p;
  renderShop();
  document.getElementById("shopGrid").scrollIntoView({ behavior: "smooth", block: "start" });
}
