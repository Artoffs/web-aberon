function getRelatedProducts(currentProduct, limit = 3) {
    return Object.values(productsDB)
        .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
        .slice(0, limit);
}

function renderProductPage() {
    const productId = getProductIdFromUrl();
    const product = productsDB[productId];
    const container = document.getElementById('productContainer');
    
    if (!container) return;
    
    if (!product) {
        container.innerHTML = `
            <div class="not-found">
                <h2>Product Not Found</h2>
                <p>Sorry, the product you're looking for doesn't exist.</p>
                <a href="index.html" class="continue-shopping-btn">Back to Shop</a>
            </div>
        `;
        return;
    }
    
    const relatedProducts = getRelatedProducts(product);
    let quantity = 1;
    
    container.innerHTML = `
        <div class="breadcrumb">
            <a href="index.html">Home</a>
            <span>/</span>
            <a href="index.html" class="category-link">${product.category}</a>
            <span>/</span>
            <span class="current">${escapeHtml(product.name)}</span>
        </div>

        <div class="product-layout">
            <!-- GALLERY -->
            <div class="gallery">
                <div class="main-image-container">
                    <img src="${product.mainImage}" alt="${escapeHtml(product.name)}" class="main-image" id="mainImage">
                    <button class="gallery-nav gallery-prev" id="galleryPrev" aria-label="Previous image">
                        <i data-lucide="chevron-left"></i>
                    </button>
                    <button class="gallery-nav gallery-next" id="galleryNext" aria-label="Next image">
                        <i data-lucide="chevron-right"></i>
                    </button>
                </div>
                <div class="thumbnail-list" id="thumbnailList">
                    ${product.images.map((img, idx) => `
                        <div class="thumbnail ${idx === 0 ? 'active' : ''}" data-image="${img}" data-index="${idx}">
                            <img src="${img}" alt="Thumbnail ${idx + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- PRODUCT INFO -->
            <div class="product-info">
                <h1 class="product-title">${escapeHtml(product.name)}</h1>
                
                <div class="rating">
                    <div class="stars">${renderStars(product.rating)}</div>
                    <span class="rating-value">${product.rating}</span>
                    <span class="reviews-count">(${product.reviewCount} reviews)</span>
                </div>

                <div>
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <div class="free-shipping">✓ Free shipping</div>
                </div>

                <div class="highlights">
                    <h3>Key Highlights</h3>
                    <ul>
                        ${product.highlights.map(h => `
                            <li><div class="highlight-dot"></div><span><strong>${h.label}:</strong> ${h.value}</span></li>
                        `).join('')}
                    </ul>
                </div>

                <div class="description">
                    <h2>Description</h2>
                    <p>${escapeHtml(product.description)}</p>
                </div>

                <div class="quantity">
                    <label>Quantity</label>
                    <div class="quantity-control">
                        <button class="qty-btn" id="qtyMinus">-</button>
                        <span class="qty-value" id="qtyValue">1</span>
                        <button class="qty-btn" id="qtyPlus">+</button>
                    </div>
                </div>

                <button class="add-to-cart-btn" id="addToCartBtn">
                    <i data-lucide="shopping-cart"></i>
                    Add to Cart
                </button>

                <div class="accordion">
                    <div class="accordion-item">
                        <button class="accordion-header">
                            Technical Specifications
                            <span class="accordion-icon">▼</span>
                        </button>
                        <div class="accordion-content">
                            <table class="specs-table">
                                ${Object.entries(product.specs).map(([key, value]) => `
                                    <tr>
                                        <td class="spec-label">${key}</td>
                                        <td class="spec-value">${value}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="related-section">
            <h2>Related Products</h2>
            <div class="related-grid">
                ${relatedProducts.map(p => `
                    <a class="related-card" href="product.html?id=${p.id}">
                        <div class="related-image">
                            <img src="${p.mainImage}" alt="${escapeHtml(p.name)}" loading="lazy">
                        </div>
                        <div class="related-info">
                            <div class="related-title">${escapeHtml(p.name)}</div>
                            <div class="related-price">$${p.price.toFixed(2)}</div>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    
    // ========== ГАЛЕРЕЯ ==========
    let currentIndex = 0;
    const images = product.images;
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    
    function updateImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        mainImage.src = images[currentIndex];
        
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentIndex);
        });
    }
    
    if (prevBtn) prevBtn.addEventListener('click', () => updateImage(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateImage(currentIndex + 1));
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateImage(index));
    });
    
    // ========== КОЛИЧЕСТВО ==========
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyValue = document.getElementById('qtyValue');
    
    if (qtyMinus && qtyPlus && qtyValue) {
        qtyMinus.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qtyValue.textContent = quantity;
            }
        });
        
        qtyPlus.addEventListener('click', () => {
            quantity++;
            qtyValue.textContent = quantity;
        });
    }
    
    // ========== КОРЗИНА ==========
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            addToCart(product, quantity);
            addToCartBtn.innerHTML = '<i data-lucide="check"></i> Added!';
            setTimeout(() => {
                addToCartBtn.innerHTML = '<i data-lucide="shopping-cart"></i> Add to Cart';
                lucide.createIcons();
            }, 1500);
            lucide.createIcons();
        });
    }
    
    // ========== АККОРДЕОН ==========
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            item.classList.toggle('open');
        });
    });
    
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletter();
    loadCart();
    renderProductPage();
});