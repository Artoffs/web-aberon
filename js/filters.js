let currentMinPrice = 0;
let currentMaxPrice = 3000;
let selectedRatings = [];
let currentSort = "featured";

function filterProducts(products) {
    return products.filter(p => {
        if (p.price < currentMinPrice || p.price > currentMaxPrice) return false;
        if (selectedRatings.length > 0 && !selectedRatings.some(r => p.rating >= r)) return false;
        return true;
    });
}

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

// Инициализация слайдера
function initPriceSlider() {
    const sliderMin = document.getElementById('sliderMin');
    const sliderMax = document.getElementById('sliderMax');
    const minInput = document.getElementById('priceMinInput');
    const maxInput = document.getElementById('priceMaxInput');
    const minLabel = document.getElementById('minPriceLabel');
    const maxLabel = document.getElementById('maxPriceLabel');
    const filledTrack = document.getElementById('sliderFilled');
    
    if (!sliderMin || !sliderMax) return;
    
    function updateFromSlider() {
        let minVal = parseInt(sliderMin.value);
        let maxVal = parseInt(sliderMax.value);
        
        if (maxVal - minVal < 100) {
            if (document.activeElement === sliderMin) {
                minVal = maxVal - 100;
                sliderMin.value = minVal;
            } else {
                maxVal = minVal + 100;
                sliderMax.value = maxVal;
            }
        }
        
        currentMinPrice = minVal;
        currentMaxPrice = maxVal;
        
        minLabel.textContent = minVal;
        maxLabel.textContent = maxVal;
        minInput.value = minVal;
        maxInput.value = maxVal;
        
        const minPercent = (minVal / 3000) * 100;
        const maxPercent = (maxVal / 3000) * 100;
        filledTrack.style.left = minPercent + '%';
        filledTrack.style.right = (100 - maxPercent) + '%';
        
        if (typeof refreshProducts === 'function') refreshProducts();
    }
    
    function updateFromInputs() {
        let minVal = parseInt(minInput.value);
        let maxVal = parseInt(maxInput.value);
        
        if (isNaN(minVal)) minVal = 0;
        if (isNaN(maxVal)) maxVal = 3000;
        if (minVal < 0) minVal = 0;
        if (maxVal > 3000) maxVal = 3000;
        if (minVal > maxVal - 100) minVal = maxVal - 100;
        if (maxVal < minVal + 100) maxVal = minVal + 100;
        
        sliderMin.value = minVal;
        sliderMax.value = maxVal;
        updateFromSlider();
    }
    
    sliderMin.addEventListener('input', updateFromSlider);
    sliderMax.addEventListener('input', updateFromSlider);
    minInput.addEventListener('change', updateFromInputs);
    maxInput.addEventListener('change', updateFromInputs);
    
    updateFromSlider();
}

// Инициализация чекбоксов рейтинга
function initRatingCheckboxes() {
    const checkboxes = document.querySelectorAll('.rating-option input');
    
    function updateRatings() {
        selectedRatings = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                selectedRatings.push(parseInt(cb.value));
            }
        });
        if (typeof refreshProducts === 'function') refreshProducts();
    }
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateRatings);
    });
}

// Сброс фильтров
function initClearButton() {
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            document.querySelectorAll('.rating-option input').forEach(cb => cb.checked = false);
            selectedRatings = [];
            
            const sliderMin = document.getElementById('sliderMin');
            const sliderMax = document.getElementById('sliderMax');
            if (sliderMin && sliderMax) {
                sliderMin.value = 0;
                sliderMax.value = 3000;
                const filledTrack = document.getElementById('sliderFilled');
                if (filledTrack) {
                    filledTrack.style.left = '0%';
                    filledTrack.style.right = '0%';
                }
                document.getElementById('priceMinInput').value = 0;
                document.getElementById('priceMaxInput').value = 3000;
                document.getElementById('minPriceLabel').textContent = '0';
                document.getElementById('maxPriceLabel').textContent = '3000';
                currentMinPrice = 0;
                currentMaxPrice = 3000;
            }
            
            const sortSelect = document.getElementById('sortSelect');
            if (sortSelect) sortSelect.value = "featured";
            currentSort = "featured";
            
            if (typeof refreshProducts === 'function') refreshProducts();
        });
    }
}

// Инициализация сортировки
function initSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            if (typeof refreshProducts === 'function') refreshProducts();
        });
    }
}

// Запуск всех фильтров
function initFilters() {
    initPriceSlider();
    initRatingCheckboxes();
    initClearButton();
    initSort();
}