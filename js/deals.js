// Товары для страницы со скидками
const dealsProducts = [productsDB[1], productsDB[2], productsDB[3], productsDB[4]];

// Рендер товаров со скидками
function renderDeals() {
    const grid = document.getElementById('dealsGrid');
    if (!grid) return;
    
    grid.innerHTML = dealsProducts.map(product => `
        <div class="deal-card">
            <div class="discount-badge">Save 20%</div>
            <a class="product-card" href="product.html?id=${product.id}">
                <div class="product-image">
                    <img src="${product.mainImage}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${escapeHtml(product.name)}</h3>
                    <div class="product-rating">
                        <div class="stars">${renderStars(product.rating)}</div>
                        <span class="rating-number">(${product.rating})</span>
                    </div>
                    <div class="product-price-row">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <span class="product-category">${product.category.toUpperCase()}</span>
                    </div>
                </div>
            </a>
        </div>
    `).join('');
}

// Обновление таймера флеш-продажи
function updateTimer() {
    const timerSpan = document.getElementById('timerDays');
    if (timerSpan) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 2);
        targetDate.setHours(0, 0, 0, 0);
        const now = new Date();
        const diff = targetDate - now;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        timerSpan.textContent = days > 0 ? days : 0;
    }
}

// Инициализация страницы со скидками
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletter();
    loadCart();
    renderDeals();
    updateTimer();
    lucide.createIcons();
});