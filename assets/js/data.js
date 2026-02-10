// Default Configuration (Fallback if nothing in LocalStorage)
const defaultConfig = {
    company: {
        name: "My Company",
        subname: "(Pvt) Ltd",
        logo: "shopping-bag", // Lucide icon name or URL
        mobile1: "+94 77 123 4567",
        mobile2: "+94 71 987 6543",
        email: "info@rubikmarketing.com",
        address: "No. 123, Main Street, Anuradhapura",
        aboutTitle: "Premium Products for Every Home",
        aboutDesc: "From aromatic spices to refreshing beverages and household essentials. Experience quality delivered to your doorstep.",
        aboutImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        founded: "2020",
        chairmanMsg: "We are committed to delivering the best quality to your doorstep."
    },
    social: {
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        tiktok: "https://tiktok.com",
        instagram: "https://instagram.com"
    },
    heroSlides: [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            offer: "10% OFF",
            title: "Fresh Juices"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1621451537084-482c73073a0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            offer: "New Arrival",
            title: "Cleaning Kits"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            offer: "Best Seller",
            title: "Premium Spices"
        }
    ],
    testimonials: [
        { name: "John Doe", comment: "Amazing products and fast delivery!", rating: 5 },
        { name: "Jane Smith", comment: "The detergent quality is top-notch. Highly recommended.", rating: 5 },
        { name: "Kumar Perera", comment: "Great service and reasonable prices.", rating: 4 }
    ],
    delivery: {
        cityFee: 250, // Anuradhapura awata
        outstationFee: 350, // Pita
        freeThreshold: 5000 // Free delivery if order > 5000 (Optional feature)
    }
};

// Default Products (Fallback)
const defaultProducts = [
    {
        id: 1,
        name: "Premium Washing Powder",
        category: "detergent",
        price: 850,
        costPrice: 600,
        oldPrice: 1000,
        image: "https://images.unsplash.com/photo-1610991912440-ad27a23c34e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "High quality washing powder for brilliant white clothes.",
        discount: 15,
        reviews: [
            { name: "Saman Kumara", rating: 5, comment: "Best washing powder I used!", date: "2024-01-15" }
        ]
    },
    {
        id: 2,
        name: "Liquid Dish Wash",
        category: "detergent",
        price: 450,
        costPrice: 300,
        oldPrice: 500,
        image: "https://images.unsplash.com/photo-1585836894080-6060c58e77c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        description: "Tough on grease, gentle on hands.",
        discount: 10
    },
    {
        id: 3,
        name: "Sandalwood Incense Sticks",
        category: "incense",
        price: 150,
        costPrice: 80,
        oldPrice: 180,
        image: "https://images.unsplash.com/photo-1602738328654-51ab2ae6c4ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        description: "Premium sandalwood fragrance for a peaceful atmosphere.",
        discount: 16
    },
    {
        id: 4,
        name: "Jasmine Incense Pack",
        category: "incense",
        price: 120,
        costPrice: 70,
        oldPrice: 150,
        image: "https://img.freepik.com/free-photo/incense-sticks-wooden-holder_23-2148705008.jpg",
        rating: 4.7,
        description: "Sweet jasmine scent to refresh your home.",
        discount: 20
    },
    {
        id: 5,
        name: "Chilli Powder (Miris Kudu) 100g",
        category: "spices",
        price: 350,
        costPrice: 250,
        oldPrice: 400,
        image: "https://images.unsplash.com/photo-1588612195000-0974cc9e2978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        description: "Pure and spicy chilli powder.",
        discount: 12
    },
    {
        id: 6,
        name: "Curry Powder (Thuna Paha) 100g",
        category: "spices",
        price: 300,
        costPrice: 200,
        oldPrice: 350,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "Traditional Sri Lankan roasted curry powder.",
        discount: 14
    },
    {
        id: 7,
        name: "Black Pepper Powder (Gammiris) 50g",
        category: "spices",
        price: 250,
        costPrice: 150,
        oldPrice: 300,
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        description: "Freshly ground black pepper for that extra kick.",
        discount: 16
    },
    {
        id: 8,
        name: "Basmati Rice 1kg",
        category: "food",
        price: 650,
        costPrice: 500,
        oldPrice: 750,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        description: "Premium long grain Basmati rice.",
        discount: 13
    },
    {
        id: 9,
        name: "Red Lentils (Dhal) 500g",
        category: "food",
        price: 320,
        costPrice: 250,
        oldPrice: 350,
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.4,
        description: "High quality red lentils.",
        discount: 8
    },
    {
        id: 10,
        name: "Fruit Cordial 750ml",
        category: "beverages",
        price: 550,
        costPrice: 400,
        oldPrice: 650,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        description: "Refreshing mixed fruit cordial.",
        discount: 15
    },
    {
        id: 11,
        name: "Ceylon Tea 500g",
        category: "beverages",
        price: 900,
        costPrice: 650,
        oldPrice: 1000,
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        description: "Premium pure Ceylon tea.",
        discount: 10
    },
    {
        id: 12,
        name: "Vanilla Ice Cream 1L",
        category: "icecream",
        price: 600,
        costPrice: 450,
        oldPrice: 700,
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        description: "Creamy vanilla delight.",
        discount: 14
    },
    {
        id: 13,
        name: "Chocolate Ice Cream 1L",
        category: "icecream",
        price: 650,
        costPrice: 480,
        oldPrice: 750,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        description: "Rich chocolate flavor.",
        discount: 13
    }
];

// Default Categories (Fallback)
const defaultCategories = [
    { id: 'detergent', name: 'Detergents', icon: 'droplets', color: 'blue' },
    { id: 'incense', name: 'Incense Sticks', icon: 'flame', color: 'purple' },
    { id: 'spices', name: 'Spices', icon: 'utensils', color: 'red' },
    { id: 'food', name: 'Foods', icon: 'shopping-basket', color: 'yellow' },
    { id: 'beverages', name: 'Beverages', icon: 'cup-soda', color: 'green' },
    { id: 'icecream', name: 'Ice Cream', icon: 'snowflake', color: 'pink' }
];

// Initialize Data if not in LocalStorage
if (!localStorage.getItem('rubik_config')) {
    localStorage.setItem('rubik_config', JSON.stringify(defaultConfig));
}
if (!localStorage.getItem('rubik_products')) {
    localStorage.setItem('rubik_products', JSON.stringify(defaultProducts));
}
if (!localStorage.getItem('rubik_categories')) {
    localStorage.setItem('rubik_categories', JSON.stringify(defaultCategories));
}

// Load Data to Global Scope
try {
    window.rubikConfig = JSON.parse(localStorage.getItem('rubik_config')) || defaultConfig;
    // Migration: Replace old default name if found
    if (window.rubikConfig.company.name === "Rubik Marketing") {
        window.rubikConfig.company.name = "My Company";
        // Also reset subname if needed or other defaults
        localStorage.setItem('rubik_config', JSON.stringify(window.rubikConfig));
    }
} catch (e) {
    console.error("Config corrupted, resetting", e);
    window.rubikConfig = defaultConfig;
    localStorage.setItem('rubik_config', JSON.stringify(defaultConfig));
}

try {
    window.products = JSON.parse(localStorage.getItem('rubik_products')) || defaultProducts;
} catch (e) {
    console.error("Products corrupted, resetting", e);
    window.products = defaultProducts;
    localStorage.setItem('rubik_products', JSON.stringify(defaultProducts));
}

try {
    window.categories = JSON.parse(localStorage.getItem('rubik_categories')) || defaultCategories;
} catch (e) {
    console.error("Categories corrupted, resetting", e);
    window.categories = defaultCategories;
    localStorage.setItem('rubik_categories', JSON.stringify(defaultCategories));
}

// Helper to save changes
window.saveConfig = function () {
    localStorage.setItem('rubik_config', JSON.stringify(window.rubikConfig));
    updateSiteContent(); // Real-time update
}

window.saveProducts = function () {
    localStorage.setItem('rubik_products', JSON.stringify(window.products));
    // If on shop page, re-render logic is handled by specific pages
    if (typeof renderProducts === 'function') renderProducts();
    if (typeof renderShopProducts === 'function') renderShopProducts();
}

window.saveCategories = function () {
    localStorage.setItem('rubik_categories', JSON.stringify(window.categories));
    // Refresh UI if needed
    if (typeof renderCategories === 'function') renderCategories();
}

// Function to update static content on the page (Header, Footer, Contact Info)
function updateSiteContent() {
    const config = window.rubikConfig;

    if (!config || !config.company) return;

    // Update Document Title
    if (config.company.name) {
        let pagePart = document.title.split('-')[0].trim();
        if (pagePart === 'Rubik Marketing' || pagePart === 'My Company') pagePart = 'Home';
        // Don't duplicate if already set
        if (!document.title.endsWith(config.company.name)) {
            document.title = `${pagePart} - ${config.company.name}`;
        }
    }

    // Update Company Name
    const nameEls = document.querySelectorAll('.app-company-name');
    nameEls.forEach(el => {
        if (config.company.name) {
            const parts = config.company.name.split(' ');
            if (parts.length > 1) {
                const first = parts[0];
                const rest = parts.slice(1).join(' ');
                el.innerHTML = `${first} <span class="text-primary">${rest}</span>`;
            } else {
                el.textContent = config.company.name;
            }
        }
    });

    // Update Subname
    document.querySelectorAll('.app-company-subname').forEach(el => {
        el.textContent = config.company.subname || '(PVT) LTD';
    });

    // Update Contact Details
    document.querySelectorAll('.app-mobile').forEach(el => el.textContent = config.company.mobile1 || '');
    document.querySelectorAll('.app-mobile-2').forEach(el => el.textContent = config.company.mobile2 || '');
    document.querySelectorAll('.app-email').forEach(el => el.textContent = config.company.email || '');
    document.querySelectorAll('.app-address').forEach(el => el.textContent = config.company.address || '');

    // Update About Section
    const aboutTitle = document.getElementById('about-title-display');
    if (aboutTitle) aboutTitle.textContent = config.company.aboutTitle;

    const aboutDesc = document.getElementById('about-desc');
    if (aboutDesc && config.company.aboutDesc) aboutDesc.textContent = config.company.aboutDesc;

    const aboutImage = document.getElementById('about-image-display');
    if (aboutImage && config.company.aboutImage) aboutImage.src = config.company.aboutImage;

    const foundedDate = document.querySelector('.app-founded-date');
    if (foundedDate) foundedDate.textContent = config.company.founded || '2020';

    // Update Logo
    const logoContainers = document.querySelectorAll('.app-logo-container');
    const logoIcons = document.querySelectorAll('.app-logo-icon');
    const logoImgs = document.querySelectorAll('.app-logo-img');

    if (config.company.logo && config.company.logo.startsWith('data:image')) {
        // Show Image, Hide Icon
        logoIcons.forEach(el => el.classList.add('hidden'));
        logoImgs.forEach(el => {
            el.src = config.company.logo;
            el.classList.remove('hidden');
        });
    } else {
        // Show Icon, Hide Image
        logoIcons.forEach(el => el.classList.remove('hidden'));
        logoImgs.forEach(el => el.classList.add('hidden'));
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    updateSiteContent();
});
