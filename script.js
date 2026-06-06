const products = [
  { name: "Saber X Pro", category: "phones", label: "هاتف ذكي 5G", price: 499, rating: 4.8, icon: "📱" },
  { name: "LapMate Air", category: "electronics", label: "لابتوب خفيف للعمل", price: 899, rating: 4.6, icon: "💻" },
  { name: "SoundPods Mini", category: "electronics", label: "سماعات لاسلكية", price: 49, rating: 4.4, icon: "🎧" },
  { name: "Urban Sneaker", category: "fashion", label: "حذاء يومي مريح", price: 39, rating: 4.5, icon: "👟" },
  { name: "Smart Watch Fit", category: "electronics", label: "ساعة رياضية", price: 79, rating: 4.3, icon: "⌚" },
  { name: "Home Chef Fryer", category: "home", label: "قلاية هوائية", price: 119, rating: 4.7, icon: "🍳" },
  { name: "Cozy Sofa Set", category: "home", label: "كنبة لغرفة المعيشة", price: 699, rating: 4.2, icon: "🛋️" },
  { name: "Summer Shirt Pack", category: "fashion", label: "مجموعة قمصان", price: 29, rating: 4.1, icon: "👕" },
];

const productsEl = document.querySelector("#products");
const filterEl = document.querySelector("#categoryFilter");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const cartCountEl = document.querySelector("#cartCount");
let cartCount = 0;
let query = "";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

function renderProducts() {
  const category = filterEl.value;
  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesSearch = !normalizedQuery || `${product.name} ${product.label}`.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  productsEl.innerHTML = visibleProducts.length
    ? visibleProducts.map((product, index) => `
      <article>
        <div class="product-icon" aria-hidden="true">${product.icon}</div>
        <h3>${product.name}</h3>
        <p class="product-meta">${product.label}</p>
        <div class="price-row">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="rating">★ ${product.rating}</span>
        </div>
        <button class="add-btn" type="button" data-index="${index}">أضف إلى السلة</button>
      </article>
    `).join("")
    : `<p class="empty-state">لا توجد منتجات مطابقة. جرّب كلمة بحث أخرى أو اختر كل الأقسام.</p>`;
}

productsEl.addEventListener("click", (event) => {
  if (!event.target.matches(".add-btn")) return;
  cartCount += 1;
  cartCountEl.textContent = cartCount;
  event.target.textContent = "تمت الإضافة ✓";
  setTimeout(() => {
    event.target.textContent = "أضف إلى السلة";
  }, 1200);
});

filterEl.addEventListener("change", renderProducts);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  query = searchInput.value;
  renderProducts();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth", block: "start" });
});

renderProducts();
