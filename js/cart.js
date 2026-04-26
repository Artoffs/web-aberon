let cartItems = [];

function loadCart() {
    const saved = localStorage.getItem('techstore_cart');
    if (saved) {
        try {
            cartItems = JSON.parse(saved);
        } catch(e) {
            cartItems = [];
        }
    }
    updateCartBadge();
}

function saveCart() {
    localStorage.setItem('techstore_cart', JSON.stringify(cartItems));
    updateCartBadge();
    location.reload();
}

function updateCartBadge() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadge');
    if (badge) {
        if (totalItems > 0) {
            badge.textContent = totalItems > 9 ? '9+' : totalItems;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function addToCart(product, quantity = 1) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            quantity: quantity,
            image: product.mainImage || product.img
        });
    }
    saveCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, delta) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
        }
    }
}

function calculateCartTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function formatPrice(price) {
    return '$' + price.toFixed(2);
}