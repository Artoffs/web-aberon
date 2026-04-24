// Функция обновления товаров
function refreshProducts() {
    renderProducts();
}

// Рендер товаров на главной странице
// js/index.js

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countDisplay = document.getElementById('productCount');
    
    if (!grid) return;
    
    let filtered = productList.filter(p => {
        if (p.price < currentMinPrice || p.price > currentMaxPrice) return false;
        if (selectedRatings.length > 0 && !selectedRatings.some(r => p.rating >= r)) return false;
        return true;
    });
    
    switch (currentSort) {
        case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
        case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
        case "rating-desc": filtered.sort((a, b) => b.rating - a.rating); break;
        case "name-asc": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        default: filtered.sort((a, b) => a.id - b.id);
    }
    
    countDisplay.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:#6b7280;">No products found</div>`;
        return;
    }
    
    grid.innerHTML = filtered.map(p => `
        <a class="product-card" href="product.html?id=${p.id}">
            <div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
            <div class="product-info">
                <h3 class="product-title">${escapeHtml(p.name)}</h3>
                <div class="product-rating">
                    <div class="stars">${renderStars(p.rating)}</div>
                    <span class="rating-number">(${p.rating})</span>
                </div>
                <div class="product-price-row">
                    <span class="product-price">$${p.price.toFixed(2)}</span>
                    <span class="product-category">${p.category.toUpperCase()}</span>
                </div>
            </div>
        </a>
    `).join('');
    
    // Обновляем иконки Lucide после добавления новых элементов
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Инициализация главной страницы
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletter();
    initMobileFilters();
    loadCart();
    initFilters();
    renderProducts();
    lucide.createIcons();
});