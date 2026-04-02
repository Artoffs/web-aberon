let refreshProducts;

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const countDisplay = document.getElementById('productCount');
    
    if (!grid) return;
    
    let filtered = filterProducts(productList);
    filtered = sortProducts(filtered);
    
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
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

refreshProducts = renderProducts;

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletter();
    loadCart();
    initFilters();
    renderProducts();
    lucide.createIcons();
});