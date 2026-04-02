// База данных товаров
const productsDB = {
    1: {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Audio",
        categorySlug: "audio",
        price: 299.99,
        rating: 5.0,
        reviewCount: 128,
        description: "Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
        highlights: [
            { label: "Noise Cancellation", value: "Active ANC" },
            { label: "Battery Life", value: "30 hours" },
            { label: "Bluetooth", value: "5.3" },
            { label: "Weight", value: "250g" }
        ],
        specs: {
            "Driver Size": "40mm",
            "Frequency Response": "20Hz - 20kHz",
            "Impedance": "32Ω",
            "Charging Time": "2 hours",
            "Wireless Range": "10m"
        },
        mainImage: "https://images.unsplash.com/photo-1760708368699-69cb9ed56f52?w=800",
        images: [
            "https://images.unsplash.com/photo-1760708368699-69cb9ed56f52?w=800",
            "https://images.unsplash.com/photo-1760708368699-69cb9ed56f52?w=800",
            "https://images.unsplash.com/photo-1760708368699-69cb9ed56f52?w=800"
        ]
    },
    2: {
        id: 2,
        name: "Professional Laptop Pro",
        category: "Computers",
        categorySlug: "computers",
        price: 1899.99,
        rating: 4.5,
        reviewCount: 89,
        description: "Ultimate performance laptop for professionals. Features Intel Core i9 processor, 32GB RAM, 1TB SSD, and stunning 4K display.",
        highlights: [
            { label: "Processor", value: "Intel Core i9" },
            { label: "RAM", value: "32GB" },
            { label: "Storage", value: "1TB SSD" },
            { label: "Display", value: "16\" 4K" }
        ],
        specs: {
            "Graphics": "NVIDIA RTX 4080",
            "Weight": "2.2kg",
            "Battery": "10 hours",
            "Ports": "USB-C, HDMI, Thunderbolt"
        },
        mainImage: "https://images.unsplash.com/photo-1673431738089-c4fc9c2e96a7?w=800",
        images: [
            "https://images.unsplash.com/photo-1673431738089-c4fc9c2e96a7?w=800",
            "https://images.unsplash.com/photo-1673431738089-c4fc9c2e96a7?w=800"
        ]
    },
    3: {
        id: 3,
        name: "Smart Fitness Watch Ultra",
        category: "Wearables",
        categorySlug: "wearables",
        price: 449.99,
        rating: 4.0,
        reviewCount: 234,
        description: "Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.",
        highlights: [
            { label: "GPS", value: "Built-in" },
            { label: "Heart Rate", value: "Continuous" },
            { label: "Battery", value: "7 days" },
            { label: "Water Resistance", value: "50m" }
        ],
        specs: {
            "Display": "1.3\" AMOLED",
            "Sensors": "HR, SpO2, Accelerometer",
            "Connectivity": "Bluetooth 5.0",
            "Compatibility": "iOS & Android"
        },
        mainImage: "https://images.unsplash.com/photo-1665860455418-017fa50d29bc?w=800",
        images: [
            "https://images.unsplash.com/photo-1665860455418-017fa50d29bc?w=800",
            "https://images.unsplash.com/photo-1665860455418-017fa50d29bc?w=800"
        ]
    },
    4: {
        id: 4,
        name: "Professional DSLR Camera",
        category: "Photography",
        categorySlug: "photography",
        price: 2499.99,
        rating: 5.0,
        reviewCount: 56,
        description: "Capture stunning photos and videos with this professional-grade DSLR. 45MP sensor, 4K video, and advanced autofocus system.",
        highlights: [
            { label: "Megapixels", value: "45MP" },
            { label: "Video", value: "4K 60fps" },
            { label: "ISO Range", value: "100-51200" },
            { label: "Burst Speed", value: "10 fps" }
        ],
        specs: {
            "Lens Mount": "EF",
            "Screen": "3.2\" Touch",
            "Viewfinder": "Optical",
            "Storage": "Dual SD Card"
        },
        mainImage: "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?w=800",
        images: [
            "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?w=800",
            "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?w=800"
        ]
    },
    5: {
        id: 5,
        name: "Portable Bluetooth Speaker",
        category: "Audio",
        categorySlug: "audio",
        price: 129.99,
        rating: 4.5,
        reviewCount: 327,
        description: "Take your music anywhere with this powerful portable speaker. Waterproof design perfect for outdoor adventures.",
        highlights: [
            { label: "Output Power", value: "20W" },
            { label: "Battery Life", value: "15 hours" },
            { label: "Water Rating", value: "IPX7" },
            { label: "Bluetooth", value: "5.0" }
        ],
        specs: {
            "Drivers": "2x 10W",
            "Frequency": "60Hz-20kHz",
            "Charging": "USB-C",
            "Pairing": "TWS Stereo"
        },
        mainImage: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?w=800",
        images: [
            "https://images.unsplash.com/photo-1674303324806-7018a739ed11?w=800",
            "https://images.unsplash.com/photo-1674303324806-7018a739ed11?w=800"
        ]
    },
    6: {
        id: 6,
        name: "Ultra-Thin Tablet Pro",
        category: "Tablets",
        categorySlug: "tablets",
        price: 799.99,
        rating: 4.5,
        reviewCount: 112,
        description: "Versatile tablet for work and play. 11-inch Liquid Retina display, M2 chip, and all-day battery life.",
        highlights: [
            { label: "Display", value: "11\" Liquid Retina" },
            { label: "Chip", value: "M2" },
            { label: "Storage", value: "128GB" },
            { label: "Battery", value: "10 hours" }
        ],
        specs: {
            "Weight": "460g",
            "Cameras": "12MP + 12MP",
            "Connectivity": "Wi-Fi 6E, 5G",
            "Audio": "4 Speakers"
        },
        mainImage: "https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?w=800",
        images: [
            "https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?w=800",
            "https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?w=800"
        ]
    }
};

const productList = [
    { id: 5, name: "Portable Bluetooth Speaker", price: 129.99, category: "Audio", rating: 4.5, img: "https://images.unsplash.com/photo-1674303324806-7018a739ed11?w=500" },
    { id: 1, name: "Premium Wireless Headphones", price: 299.99, category: "Audio", rating: 5.0, img: "https://images.unsplash.com/photo-1760708368699-69cb9ed56f52?w=500" },
    { id: 2, name: "Professional Laptop Pro", price: 1899.99, category: "Computers", rating: 4.5, img: "https://images.unsplash.com/photo-1673431738089-c4fc9c2e96a7?w=500" },
    { id: 3, name: "Smart Fitness Watch Ultra", price: 449.99, category: "Wearables", rating: 4.0, img: "https://images.unsplash.com/photo-1665860455418-017fa50d29bc?w=500" },
    { id: 4, name: "Professional DSLR Camera", price: 2499.99, category: "Photography", rating: 5.0, img: "https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?w=500" },
    { id: 6, name: "Ultra-Thin Tablet Pro", price: 799.99, category: "Tablets", rating: 4.5, img: "https://images.unsplash.com/photo-1740637977676-c8040b41dc7a?w=500" }
];