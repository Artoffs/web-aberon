// Состояние фильтров
let currentMinPrice = 0;
let currentMaxPrice = 3000;
let selectedRatings = [];
let currentSort = "featured";
let priceGap = 100;

// DOM элементы
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const labelMin = document.getElementById('label-min');
const labelMax = document.getElementById('label-max');
const progress = document.querySelector('.filter-sidebar .slider-progress');

const mobilePriceMin = document.getElementById('mobilePriceMin');
const mobilePriceMax = document.getElementById('mobilePriceMax');
const mobileLabelMin = document.getElementById('mobile-label-min');
const mobileLabelMax = document.getElementById('mobile-label-max');
const mobileProgress = document.getElementById('mobileSliderProgress');

// Фильтрация товаров
function filterProducts(products) {
    return products.filter(p => {
        if (p.price < currentMinPrice || p.price > currentMaxPrice) return false;
        if (selectedRatings.length > 0 && !selectedRatings.some(r => p.rating >= r)) return false;
        return true;
    });
}

// Сортировка товаров
function sortProducts(products) {
    const sorted = [...products];
    switch (currentSort) {
        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);
        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);
        case "rating-desc":
            return sorted.sort((a, b) => b.rating - a.rating);
        case "name-asc":
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "name-desc":
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return sorted.sort((a, b) => a.id - b.id);
    }
}

// Обновление UI слайдера
function updatePriceUI() {
    if (labelMin) labelMin.innerText = "$" + currentMinPrice;
    if (labelMax) labelMax.innerText = "$" + currentMaxPrice;
    if (priceMinInput) priceMinInput.value = currentMinPrice;
    if (priceMaxInput) priceMaxInput.value = currentMaxPrice;
    
    const minPercent = (currentMinPrice / 3000) * 100;
    const maxPercent = (currentMaxPrice / 3000) * 100;
    if (progress) {
        progress.style.left = minPercent + "%";
        progress.style.right = (100 - maxPercent) + "%";
    }
    
    if (mobileLabelMin) mobileLabelMin.innerText = "$" + currentMinPrice;
    if (mobileLabelMax) mobileLabelMax.innerText = "$" + currentMaxPrice;
    if (mobilePriceMin) mobilePriceMin.value = currentMinPrice;
    if (mobilePriceMax) mobilePriceMax.value = currentMaxPrice;
    if (mobileProgress) {
        mobileProgress.style.left = minPercent + "%";
        mobileProgress.style.right = (100 - maxPercent) + "%";
    }
}

// Инициализация слайдеров
function initPriceSliders() {
    if (!priceMinInput || !priceMaxInput) return;
    
    const updateFromDesktop = () => {
        let minVal = parseInt(priceMinInput.value);
        let maxVal = parseInt(priceMaxInput.value);
        if (maxVal - minVal < priceGap) {
            if (document.activeElement === priceMinInput) {
                minVal = maxVal - priceGap;
                priceMinInput.value = minVal;
            } else {
                maxVal = minVal + priceGap;
                priceMaxInput.value = maxVal;
            }
        }
        currentMinPrice = minVal;
        currentMaxPrice = maxVal;
        updatePriceUI();
        if (typeof refreshProducts === 'function') refreshProducts();
    };
    
    priceMinInput.addEventListener("input", updateFromDesktop);
    priceMaxInput.addEventListener("input", updateFromDesktop);
    
    if (mobilePriceMin && mobilePriceMax) {
        mobilePriceMin.addEventListener("input", () => {
            let minVal = parseInt(mobilePriceMin.value);
            let maxVal = parseInt(mobilePriceMax.value);
            if (maxVal - minVal < priceGap) {
                minVal = maxVal - priceGap;
                mobilePriceMin.value = minVal;
            }
            currentMinPrice = minVal;
            currentMaxPrice = maxVal;
            updatePriceUI();
            if (typeof refreshProducts === 'function') refreshProducts();
        });
        
        mobilePriceMax.addEventListener("input", () => {
            let minVal = parseInt(mobilePriceMin.value);
            let maxVal = parseInt(mobilePriceMax.value);
            if (maxVal - minVal < priceGap) {
                maxVal = minVal + priceGap;
                mobilePriceMax.value = maxVal;
            }
            currentMinPrice = minVal;
            currentMaxPrice = maxVal;
            updatePriceUI();
            if (typeof refreshProducts === 'function') refreshProducts();
        });
    }
}

// Инициализация чекбоксов рейтинга
function initRatingCheckboxes() {
    const desktopCheckboxes = document.querySelectorAll('.filter-sidebar .checkbox-container input');
    const mobileCheckboxes = document.querySelectorAll('.mobile-rating');
    
    function updateRatings() {
        selectedRatings = [];
        document.querySelectorAll('.filter-sidebar .checkbox-container input:checked').forEach(cb => {
            selectedRatings.push(parseInt(cb.value));
        });
        document.querySelectorAll('.mobile-rating:checked').forEach(cb => {
            const val = parseInt(cb.value);
            if (!selectedRatings.includes(val)) selectedRatings.push(val);
        });
        if (typeof refreshProducts === 'function') refreshProducts();
    }
    
    desktopCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            mobileCheckboxes.forEach(mcb => {
                if (mcb.value === cb.value) mcb.checked = cb.checked;
            });
            updateRatings();
        });
    });
    
    mobileCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            desktopCheckboxes.forEach(dcb => {
                if (dcb.value === cb.value) dcb.checked = cb.checked;
            });
            updateRatings();
        });
    });
}

// Сброс фильтров
function resetFilters() {
    currentMinPrice = 0;
    currentMaxPrice = 3000;
    selectedRatings = [];
    currentSort = "featured";
    
    document.querySelectorAll('.filter-sidebar .checkbox-container input').forEach(cb => cb.checked = false);
    document.querySelectorAll('.mobile-rating').forEach(cb => cb.checked = false);
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = "featured";
    
    updatePriceUI();
    if (typeof refreshProducts === 'function') refreshProducts();
}

// Инициализация фильтров на странице
function initFilters() {
    initPriceSliders();
    initRatingCheckboxes();
    updatePriceUI();
    
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) clearBtn.addEventListener('click', resetFilters);
    
    const mobileClearBtn = document.getElementById('mobileClearFiltersBtn');
    if (mobileClearBtn) mobileClearBtn.addEventListener('click', resetFilters);
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            if (typeof refreshProducts === 'function') refreshProducts();
        });
    }
}