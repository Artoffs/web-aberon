// Показ toast-уведомления
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHtml = '';
    
    // Полные звёзды
    for (let i = 0; i < fullStars; i++) {
        starsHtml += `<i data-lucide="star" class="star-filled"></i>`;
    }
    
    // Половинная звезда
    if (hasHalfStar) {
        starsHtml += `<i data-lucide="star-half" class="star-half"></i>`;
    }
    
    // Пустые звёзды
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `<i data-lucide="star" class="star-empty-icon"></i>`;
    }
    
    return starsHtml;
}

function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// ... остальные функции

// Escape HTML для безопасности
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Инициализация мобильного меню
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav-links');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            if (nav.style.display === 'flex') {
                nav.style.display = '';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.backgroundColor = 'white';
                nav.style.padding = '1rem';
                nav.style.borderBottom = '1px solid #e5e7eb';
                nav.style.zIndex = '100';
            }
        });
    }
}

// Инициализация мобильных фильтров (sheet)
function initMobileFilters() {
    const mobileFilterBtn = document.getElementById('mobileFilterBtn');
    const sheetOverlay = document.getElementById('sheetOverlay');
    const mobileSheet = document.getElementById('mobileSheet');
    const closeSheetBtn = document.getElementById('closeSheetBtn');
    
    if (mobileFilterBtn && sheetOverlay && mobileSheet) {
        function openSheet() {
            sheetOverlay.classList.add('active');
            mobileSheet.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeSheet() {
            sheetOverlay.classList.remove('active');
            mobileSheet.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        mobileFilterBtn.addEventListener('click', openSheet);
        if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeSheet);
        sheetOverlay.addEventListener('click', closeSheet);
    }
}

// Инициализация формы подписки
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            alert(`Thanks for subscribing, ${email}!`);
            form.reset();
        });
    }
}

// Получение ID товара из URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || null;
}