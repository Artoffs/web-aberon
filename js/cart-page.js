let appliedDiscount = 0;
let activePromo = null;

// Загрузка промокода из localStorage
function loadPromoFromStorage() {
    const savedPromo = localStorage.getItem('techstore_promo');
    if (savedPromo) {
        try {
            const promoData = JSON.parse(savedPromo);
            activePromo = promoData.code;
            appliedDiscount = promoData.discount;
        } catch(e) {
            return null;
        }
    }
}

// Сохранение промокода в localStorage
function savePromoToStorage() {
    if (activePromo) {
        localStorage.setItem('techstore_promo', JSON.stringify({ code: activePromo, discount: appliedDiscount }));
    } else {
        localStorage.removeItem('techstore_promo');
    }
}

// Пересчёт итогов с учётом скидки
function calculateTotalsWithDiscount() {
    const { subtotal: originalSubtotal, tax: originalTax, total: originalTotal } = calculateCartTotals();
    const discountedSubtotal = originalSubtotal - appliedDiscount;
    const tax = discountedSubtotal * 0.08;
    const total = discountedSubtotal + tax;
    return { subtotal: discountedSubtotal, tax, total, originalSubtotal };
}

// Обновление отображения итогов
function updateTotalsDisplay() {
    const { subtotal, tax, total } = calculateTotalsWithDiscount();
    document.getElementById('subtotal').textContent = formatPrice(subtotal);
    document.getElementById('taxAmount').textContent = formatPrice(tax);
    document.getElementById('totalAmount').textContent = formatPrice(total);
}

// Применение промокода
function applyPromo(code) {
    if (!code || !code.trim()) {
        alert('Please enter a promo code');
        return false;
    }
    
    if (code === 'SAVE10') {
        if (activePromo === 'SAVE10') {
            alert('Promo code already applied!');
            return false;
        }
        const { originalSubtotal } = calculateTotalsWithDiscount();
        appliedDiscount = originalSubtotal * 0.1;
        activePromo = 'SAVE10';
        savePromoToStorage();
        alert('Promo code SAVE10 applied! 10% discount added.');
        renderCartPage();
        return true;
    } else {
        alert('Invalid promo code. Try "SAVE10"');
        return false;
    }
}

// Рендер страницы корзины
function renderCartPage() {
    const emptyCartDiv = document.getElementById('emptyCartState');
    const cartWithItemsDiv = document.getElementById('cartWithItemsState');
    const cartItemsContainer = document.getElementById('cartItemsList');
    
    if (!emptyCartDiv || !cartWithItemsDiv) return;
    
    if (cartItems.length === 0) {
        emptyCartDiv.style.display = 'block';
        cartWithItemsDiv.style.display = 'none';
        updateCartBadge();
        return;
    }
    
    emptyCartDiv.style.display = 'none';
    cartWithItemsDiv.style.display = 'block';
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cartItems.map(item => `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-header">
                        <div>
                            <a href="product.html?id=${item.id}" class="cart-item-title">${escapeHtml(item.name)}</a>
                            <div class="cart-item-category">${item.category}</div>
                        </div>
                        <button class="remove-btn" data-id="${item.id}" aria-label="Remove item">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                    <div class="cart-item-footer">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease" ${item.quantity <= 1 ? 'disabled' : ''}>
                                <i data-lucide="minus"></i>
                            </button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">
                                <i data-lucide="plus"></i>
                            </button>
                        </div>
                        <div class="item-price">
                            <div class="current-price">${formatPrice(item.price * item.quantity)}</div>
                            <div class="each-price">${formatPrice(item.price)} each</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Обновляем итоги
    updateTotalsDisplay();
    updateCartBadge();
    
    // Показываем применённый промокод
    const promoInfo = document.getElementById('appliedPromoInfo');
    if (promoInfo) {
        if (activePromo) {
            promoInfo.textContent = `✓ Promo code "${activePromo}" applied! ${formatPrice(appliedDiscount)} off`;
            promoInfo.style.color = '#10b981';
        } else {
            promoInfo.textContent = '';
        }
    }
    
    // Добавляем обработчики
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            if (action === 'increase') updateQuantity(id, 1);
            else if (action === 'decrease') updateQuantity(id, -1);
        });
    });
    
    lucide.createIcons();
}

// Инициализация страницы корзины
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletter();
    loadCart();
    loadPromoFromStorage();
    renderCartPage();
    
    // Применение промокода
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const promoInput = document.getElementById('promoInput');
    if (applyPromoBtn && promoInput) {
        applyPromoBtn.addEventListener('click', () => {
            applyPromo(promoInput.value.trim().toUpperCase());
            promoInput.value = '';
        });
    }
    
    // Кнопка checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to checkout (demo)');
        });
    }
    
    // Кнопка continue shopping
    const continueBtn = document.getElementById('continueShoppingBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
    
    lucide.createIcons();
});