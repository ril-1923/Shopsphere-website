/* =========================================================
   ShopSphere — Product Dataset
   ========================================================= */

const PRODUCTS = [
  { id: 1, name: "Aurora Wireless Over-Ear Headphones", category: "Electronics", price: 4999, oldPrice: 6999, discount: 29, rating: 4.6, reviews: 312, image: "https://picsum.photos/seed/ss1/600/600", description: "Immersive over-ear headphones with active noise cancellation, 40-hour battery life, and plush memory-foam ear cushions for all-day comfort.", stock: 24, colors: ["#12203A","#FF6B4A","#E4E8EF"], sizes: [] },
  { id: 2, name: "Pulse Smartwatch Series 4", category: "Electronics", price: 8999, oldPrice: 10999, discount: 18, rating: 4.4, reviews: 198, image: "https://picsum.photos/seed/ss2/600/600", description: "Track heart rate, sleep, and workouts with a bright AMOLED display and 10-day battery life. Water resistant to 50 meters.", stock: 15, colors: ["#12203A","#0E9C8C"], sizes: [] },
  { id: 3, name: "Nimbus Bluetooth Speaker", category: "Electronics", price: 2499, oldPrice: 3299, discount: 24, rating: 4.3, reviews: 421, image: "https://picsum.photos/seed/ss3/600/600", description: "Compact speaker with 360° sound, IPX7 waterproofing, and 20 hours of playtime — perfect for the beach or the backyard.", stock: 40, colors: ["#12203A","#FF6B4A"], sizes: [] },
  { id: 4, name: "Zenith 27\" 4K Monitor", category: "Electronics", price: 24999, oldPrice: 28999, discount: 14, rating: 4.7, reviews: 87, image: "https://picsum.photos/seed/ss4/600/600", description: "Ultra-sharp 4K IPS display with 99% sRGB color accuracy, ideal for creative work and everyday productivity.", stock: 9, colors: [], sizes: [] },
  { id: 5, name: "Flux Mechanical Keyboard", category: "Electronics", price: 5499, oldPrice: 6499, discount: 15, rating: 4.5, reviews: 256, image: "https://picsum.photos/seed/ss5/600/600", description: "Hot-swappable mechanical keyboard with tactile switches, per-key RGB lighting, and a durable aluminum frame.", stock: 33, colors: ["#12203A"], sizes: [] },
  { id: 6, name: "Cascade Wireless Mouse", category: "Electronics", price: 1799, oldPrice: 2199, discount: 18, rating: 4.2, reviews: 143, image: "https://picsum.photos/seed/ss6/600/600", description: "Ergonomic wireless mouse with silent clicks and precision tracking for up to 4000 DPI.", stock: 58, colors: ["#12203A","#E4E8EF"], sizes: [] },

  { id: 7, name: "Everyday Linen Shirt", category: "Fashion", price: 1899, oldPrice: 2499, discount: 24, rating: 4.3, reviews: 176, image: "https://picsum.photos/seed/ss7/600/600", description: "Breathable linen-blend shirt with a relaxed fit — a warm-weather staple that pairs with everything.", stock: 60, colors: ["#F5B841","#12203A","#E4E8EF"], sizes: ["S","M","L","XL"] },
  { id: 8, name: "Drift Denim Jacket", category: "Fashion", price: 3299, oldPrice: 3999, discount: 18, rating: 4.5, reviews: 210, image: "https://picsum.photos/seed/ss8/600/600", description: "Classic mid-wash denim jacket with a tailored fit and reinforced stitching for everyday durability.", stock: 27, colors: ["#3A4A66"], sizes: ["S","M","L","XL","XXL"] },
  { id: 9, name: "Meadow Floral Midi Dress", category: "Fashion", price: 2599, oldPrice: 3599, discount: 28, rating: 4.6, reviews: 289, image: "https://picsum.photos/seed/ss9/600/600", description: "A flowing midi dress in a soft floral print, cut from breathable viscose for effortless summer wear.", stock: 34, colors: ["#FF6B4A","#0E9C8C"], sizes: ["XS","S","M","L"] },
  { id: 10, name: "Heritage Wool Sweater", category: "Fashion", price: 2999, oldPrice: 3799, discount: 21, rating: 4.4, reviews: 132, image: "https://picsum.photos/seed/ss10/600/600", description: "A cozy ribbed-knit sweater in soft merino wool, designed to layer well through every cold-weather season.", stock: 21, colors: ["#12203A","#F5B841"], sizes: ["S","M","L","XL"] },
  { id: 11, name: "Tailored Chino Trousers", category: "Fashion", price: 2199, oldPrice: 2799, discount: 21, rating: 4.2, reviews: 98, image: "https://picsum.photos/seed/ss11/600/600", description: "Slim-tapered chinos in stretch cotton twill, built for a sharp look that moves with you.", stock: 45, colors: ["#3A4A66","#E4E8EF"], sizes: ["30","32","34","36"] },

  { id: 12, name: "Trailrunner Mesh Sneakers", category: "Shoes", price: 3499, oldPrice: 4499, discount: 22, rating: 4.5, reviews: 341, image: "https://picsum.photos/seed/ss12/600/600", description: "Lightweight running sneakers with breathable mesh uppers and responsive cushioned soles.", stock: 38, colors: ["#12203A","#FF6B4A"], sizes: ["6","7","8","9","10","11"] },
  { id: 13, name: "Aspen Leather Boots", category: "Shoes", price: 5999, oldPrice: 7499, discount: 20, rating: 4.7, reviews: 156, image: "https://picsum.photos/seed/ss13/600/600", description: "Full-grain leather boots with a rugged sole, built to handle city streets and trailheads alike.", stock: 19, colors: ["#3A4A66"], sizes: ["7","8","9","10","11","12"] },
  { id: 14, name: "Cloudstep Slip-On Sneakers", category: "Shoes", price: 2799, oldPrice: 3299, discount: 15, rating: 4.3, reviews: 204, image: "https://picsum.photos/seed/ss14/600/600", description: "Slip-on sneakers with a knit upper and memory-foam insole — the easiest shoe you'll own.", stock: 52, colors: ["#E4E8EF","#12203A"], sizes: ["6","7","8","9","10"] },
  { id: 15, name: "Marina Leather Sandals", category: "Shoes", price: 1699, oldPrice: 2199, discount: 23, rating: 4.1, reviews: 88, image: "https://picsum.photos/seed/ss15/600/600", description: "Handcrafted leather sandals with an adjustable strap and cushioned footbed for warm-weather comfort.", stock: 30, colors: ["#F5B841","#3A4A66"], sizes: ["6","7","8","9"] },

  { id: 16, name: "Voyager Canvas Backpack", category: "Accessories", price: 2299, oldPrice: 2999, discount: 23, rating: 4.6, reviews: 267, image: "https://picsum.photos/seed/ss16/600/600", description: "A durable canvas backpack with a padded laptop sleeve and water-resistant coating for daily commutes.", stock: 41, colors: ["#12203A","#0E9C8C"], sizes: [] },
  { id: 17, name: "Meridian Leather Wallet", category: "Accessories", price: 999, oldPrice: 1399, discount: 29, rating: 4.4, reviews: 189, image: "https://picsum.photos/seed/ss17/600/600", description: "A slim bifold wallet in vegetable-tanned leather with six card slots and a coin pocket.", stock: 70, colors: ["#3A4A66"], sizes: [] },
  { id: 18, name: "Solstice Polarized Sunglasses", category: "Accessories", price: 1499, oldPrice: 1999, discount: 25, rating: 4.3, reviews: 145, image: "https://picsum.photos/seed/ss18/600/600", description: "UV400 polarized sunglasses with a lightweight acetate frame for all-day sun protection.", stock: 55, colors: ["#12203A","#F5B841"], sizes: [] },
  { id: 19, name: "Compass Leather Belt", category: "Accessories", price: 899, oldPrice: 1199, discount: 25, rating: 4.2, reviews: 76, image: "https://picsum.photos/seed/ss19/600/600", description: "A reversible leather belt with a brushed metal buckle, switching from black to brown in seconds.", stock: 64, colors: ["#12203A"], sizes: ["S","M","L"] },
  { id: 20, name: "Halo Gold-Plated Earrings", category: "Accessories", price: 1299, oldPrice: 1799, discount: 28, rating: 4.7, reviews: 231, image: "https://picsum.photos/seed/ss20/600/600", description: "Delicate gold-plated hoop earrings with a hypoallergenic post, designed for everyday wear.", stock: 48, colors: ["#F5B841"], sizes: [] },

  { id: 21, name: "Haven Ceramic Dinner Set", category: "Home & Living", price: 3999, oldPrice: 5299, discount: 25, rating: 4.6, reviews: 112, image: "https://picsum.photos/seed/ss21/600/600", description: "A 16-piece stoneware dinner set with a matte glaze finish, dishwasher and microwave safe.", stock: 22, colors: ["#E4E8EF","#12203A"], sizes: [] },
  { id: 22, name: "Lumen Ceramic Table Lamp", category: "Home & Living", price: 2199, oldPrice: 2799, discount: 21, rating: 4.4, reviews: 94, image: "https://picsum.photos/seed/ss22/600/600", description: "A warm-glow table lamp with a hand-finished ceramic base and linen shade.", stock: 26, colors: ["#F5B841","#E4E8EF"], sizes: [] },
  { id: 23, name: "Thicket Woven Throw Blanket", category: "Home & Living", price: 1599, oldPrice: 2199, discount: 27, rating: 4.5, reviews: 168, image: "https://picsum.photos/seed/ss23/600/600", description: "A soft cotton-blend throw woven in a chunky diamond pattern, generously sized for the sofa or bed.", stock: 37, colors: ["#0E9C8C","#F5B841","#E4E8EF"], sizes: [] },
  { id: 24, name: "Hearth Scented Candle Trio", category: "Home & Living", price: 1299, oldPrice: 1699, discount: 24, rating: 4.6, reviews: 201, image: "https://picsum.photos/seed/ss24/600/600", description: "Three soy-wax candles in cedarwood, sea salt, and amber — each burns for up to 45 hours.", stock: 63, colors: [], sizes: [] },
  { id: 25, name: "Foliage Faux Fiddle-Leaf Plant", category: "Home & Living", price: 1899, oldPrice: 2499, discount: 24, rating: 4.3, reviews: 65, image: "https://picsum.photos/seed/ss25/600/600", description: "A lifelike faux fiddle-leaf fig in a woven planter, bringing greenery anywhere without the upkeep.", stock: 18, colors: [], sizes: [] },

  { id: 26, name: "Velvet Matte Lipstick Set", category: "Beauty", price: 1499, oldPrice: 1999, discount: 25, rating: 4.5, reviews: 322, image: "https://picsum.photos/seed/ss26/600/600", description: "A set of four long-wear matte lipsticks in versatile everyday shades, formulated with shea butter.", stock: 80, colors: ["#FF6B4A","#12203A"], sizes: [] },
  { id: 27, name: "Dewdrop Vitamin C Serum", category: "Beauty", price: 1199, oldPrice: 1599, discount: 25, rating: 4.7, reviews: 402, image: "https://picsum.photos/seed/ss27/600/600", description: "A brightening serum with 15% vitamin C and hyaluronic acid to even tone and boost radiance.", stock: 71, colors: [], sizes: [] },
  { id: 28, name: "Silkline Hair Repair Oil", category: "Beauty", price: 899, oldPrice: 1199, discount: 25, rating: 4.4, reviews: 178, image: "https://picsum.photos/seed/ss28/600/600", description: "A lightweight repair oil blended with argan and jojoba to smooth frizz and add shine.", stock: 55, colors: [], sizes: [] },
  { id: 29, name: "Bloom Rose Clay Face Mask", category: "Beauty", price: 799, oldPrice: 1099, discount: 27, rating: 4.3, reviews: 134, image: "https://picsum.photos/seed/ss29/600/600", description: "A gentle detoxifying clay mask infused with rose water to purify and soften skin.", stock: 66, colors: [], sizes: [] },

  { id: 30, name: "Ridgeline Yoga Mat", category: "Sports", price: 1399, oldPrice: 1899, discount: 26, rating: 4.5, reviews: 245, image: "https://picsum.photos/seed/ss30/600/600", description: "A 6mm non-slip yoga mat with dual-texture grip, lightweight enough to carry to any studio.", stock: 44, colors: ["#0E9C8C","#12203A","#F5B841"], sizes: [] },
  { id: 31, name: "Momentum Adjustable Dumbbells", category: "Sports", price: 6499, oldPrice: 7999, discount: 19, rating: 4.6, reviews: 97, image: "https://picsum.photos/seed/ss31/600/600", description: "Space-saving adjustable dumbbells with a quick-dial system, ranging from 5 to 25 lbs per hand.", stock: 12, colors: [], sizes: [] },
  { id: 32, name: "Summit Insulated Water Bottle", category: "Sports", price: 999, oldPrice: 1299, discount: 23, rating: 4.7, reviews: 356, image: "https://picsum.photos/seed/ss32/600/600", description: "A double-wall insulated bottle that keeps drinks cold for 24 hours or hot for 12, leak-proof lid included.", stock: 90, colors: ["#12203A","#FF6B4A","#0E9C8C"], sizes: [] },
  { id: 33, name: "Endure Running Shorts", category: "Sports", price: 1199, oldPrice: 1599, discount: 25, rating: 4.4, reviews: 128, image: "https://picsum.photos/seed/ss33/600/600", description: "Quick-dry running shorts with a built-in liner and zip pocket for essentials.", stock: 58, colors: ["#12203A","#E4E8EF"], sizes: ["S","M","L","XL"] },
  { id: 34, name: "Basecamp Resistance Band Set", category: "Sports", price: 799, oldPrice: 1099, discount: 27, rating: 4.3, reviews: 143, image: "https://picsum.photos/seed/ss34/600/600", description: "Five resistance bands of increasing tension with a carry bag, ideal for strength training anywhere.", stock: 75, colors: [], sizes: [] }
];

/* Helper: get product by ID */
function getProductById(id){
  return PRODUCTS.find(p => p.id === Number(id));
}

/* Helper: currency formatter (INR) */
function formatPrice(value){
  return "₹" + Number(value).toLocaleString("en-IN");
}

/* Helper: render star rating HTML */
function renderStars(rating){
  let html = "";
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  for(let i=0;i<full;i++) html += '<i class="bi bi-star-fill"></i>';
  if(half) html += '<i class="bi bi-star-half"></i>';
  for(let i=full+(half?1:0);i<5;i++) html += '<i class="bi bi-star"></i>';
  return html;
}

const CATEGORY_ICONS = {
  "Electronics": "bi-cpu",
  "Fashion": "bi-bag-heart",
  "Shoes": "bi-boot",
  "Accessories": "bi-gem",
  "Home & Living": "bi-house-heart",
  "Beauty": "bi-flower2",
  "Sports": "bi-trophy"
};

const COUPONS = {
  "SAVE10": 10,
  "SAVE20": 20,
  "WELCOME": 15
};
