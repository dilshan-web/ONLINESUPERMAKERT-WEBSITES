// Cart Logic
let cart = JSON.parse(localStorage.getItem('rubik_cart')) || [];

// Constants
const DELIVERY_FEE = 350;

// Update Cart Count in UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        if (totalItems > 0) {
            cartCountElement.classList.remove('hidden');
        } else {
            cartCountElement.classList.add('hidden');
        }
    }
}

// Add Item to Cart
function addToCart(productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    // Show toast notification
    showToast(`Added ${product.name} to cart!`);
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart(); // Re-render cart page if on it
    updateCartCount();
}

// Increase Quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// Decrease Quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('rubik_cart', JSON.stringify(cart));
}

// Calculate Total
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Render Cart Items (for cart.html)
function renderCart() {
    const config = window.rubikConfig || { delivery: { cityFee: 250, outstationFee: 350 } };
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('subtotal-price');
    const totalElement = document.getElementById('total-price');
    const deliveryElement = document.getElementById('delivery-fee');
    const finalTotalElement = document.getElementById('final-total');
    const deliverySelect = document.getElementById('delivery-fee-select');

    if (!cartItemsContainer) return; // Not on cart page

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="shopping-basket" class="w-8 h-8 text-gray-500"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                <p class="text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
                <a href="shop.html" class="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-orange-600 text-white rounded-lg transition-colors">
                    Start Shopping
                </a>
            </div>
        `;
        if (subtotalElement) subtotalElement.textContent = 'Rs. 0';
        if (totalElement) totalElement.textContent = 'Rs. 0';
        if (deliveryElement) deliveryElement.textContent = 'Rs. 0';
        if (finalTotalElement) finalTotalElement.textContent = 'Rs. 0';
        lucide.createIcons();
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex items-center gap-4 bg-white/5 p-4 rounded-xl mb-4 border border-white/5">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg bg-gray-700">
            <div class="flex-1">
                <h3 class="font-bold text-white text-lg">${item.name}</h3>
                <p class="text-primary font-medium">Rs. ${item.price}</p>
            </div>
            <div class="flex items-center gap-3 bg-black/20 rounded-lg p-1">
                <button onclick="decreaseQuantity(${item.id})" class="p-1 hover:text-white text-gray-400 disabled:opacity-50">
                    <i data-lucide="minus" class="w-4 h-4"></i>
                </button>
                <span class="font-bold w-6 text-center text-white">${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})" class="p-1 hover:text-white text-gray-400">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                </button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
        </div>
    `).join('');

    // Handle Delivery Fee Selection
    let deliveryFee = config.delivery.cityFee;
    if (deliverySelect) {
        if (deliverySelect.value === 'outstation') {
            deliveryFee = config.delivery.outstationFee;
        } else {
            deliveryFee = config.delivery.cityFee;
        }
    }

    const subtotal = calculateTotal();
    const finalTotal = subtotal + deliveryFee;

    if (subtotalElement) subtotalElement.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (deliveryElement) deliveryElement.textContent = `Rs. ${deliveryFee.toLocaleString()}`;
    if (finalTotalElement) finalTotalElement.textContent = `Rs. ${finalTotal.toLocaleString()}`;

    lucide.createIcons();
}

// Toast Notification
function showToast(message) {
    // Check if toast container exists
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2';
        document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'bg-gray-800 border border-primary/50 text-white px-6 py-4 rounded-lg shadow-2xl transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3 min-w-[300px]';
    toast.innerHTML = `
        <i data-lucide="check-circle" class="text-green-500 w-5 h-5"></i>
        <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    lucide.createIcons({ root: toast });

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Render Products on Shop Page
function renderShopProducts(categoryFilter = 'all', searchQuery = '') {
    const shopContainer = document.getElementById('shop-products-container');
    if (!shopContainer) return;

    let filteredProducts = window.products;

    // Filter by Category
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
    }

    // Filter by Search Query
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
    }

    if (filteredProducts.length === 0) {
        shopContainer.innerHTML = `
            <div class="col-span-full text-center py-20">
                <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="search-x" class="w-8 h-8 text-gray-500"></i>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">No products found</h3>
                <p class="text-gray-400">Try adjusting your search or category.</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    shopContainer.innerHTML = filteredProducts.map(product => {
        // Determine image to show
        let displayImage = product.image;
        if (product.images && product.images.length > 0) {
            displayImage = product.images[0];
        } else if (!displayImage) {
            displayImage = 'https://via.placeholder.com/300';
        }

        return `
        <div class="glass-card rounded-2xl p-4 group hover:border-primary/50 transition-all duration-300 animate-slide-up cursor-pointer" 
             onclick="openProductModal(${product.id})">
            <div class="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-800">
                ${product.discount ? `
                <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10">
                    -${product.discount}% OFF
                </div>
                ` : ''}
                
                ${product.freeDelivery ? `
                <div class="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10 flex items-center gap-1">
                    <i data-lucide="truck" class="w-3 h-3"></i> Free
                </div>
                ` : ''}
                
                <img src="${displayImage}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://via.placeholder.com/300'">
                
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="absolute bottom-2 right-2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white z-20">
                    <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                </button>
            </div>
            
            ${product.freeDelivery ? `
            <div class="mb-2">
                <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    <i data-lucide="truck" class="w-3 h-3"></i> Free Delivery
                </span>
            </div>
            ` : ''}

            <div class="space-y-1">
                <div class="flex justify-between items-start">
                    <span class="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">${product.category}</span>
                    <div class="flex items-center text-yellow-400 text-xs">
                        <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                        <span class="ml-1">${product.rating || 4.5}</span>
                    </div>
                </div>
                <h3 class="font-bold text-lg text-white leading-tight">${product.name}</h3>
                <p class="text-gray-400 text-xs line-clamp-2 h-8">${product.description || ''}</p>
                <div class="flex items-center justify-between pt-2">
                    <div class="flex flex-col">
                        ${product.oldPrice ? `<span class="text-sm text-gray-500 line-through">Rs. ${product.oldPrice}</span>` : '<span class="text-sm text-transparent">.</span>'}
                        <span class="text-xl font-bold text-white">Rs. ${product.price}</span>
                    </div>
                    <button onclick="event.stopPropagation(); addToCart(${product.id})" class="p-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-colors z-20">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `}).join('');
    lucide.createIcons();
}

// Modal Functions
function openProductModal(productId) {
    const product = window.products.find(p => p.id === productId);
    if (!product) return;

    // Elements
    const modal = document.getElementById('product-modal');
    if (!modal) return; // Guard for index page or other pages

    const mainImage = document.getElementById('modal-main-image');
    const title = document.getElementById('modal-title');
    const price = document.getElementById('modal-price');
    const oldPrice = document.getElementById('modal-old-price');
    const category = document.getElementById('modal-category');
    const description = document.getElementById('modal-description');
    const ratingText = document.getElementById('modal-rating-text');
    const ratingStars = document.getElementById('modal-rating-stars');
    const discountBadge = document.getElementById('modal-discount-badge');
    const thumbnailsContainer = document.getElementById('modal-thumbnails');
    const addToCartBtn = document.getElementById('modal-add-to-cart');

    // Check images
    let images = [];
    if (product.images && product.images.length > 0) {
        images = product.images;
    } else if (product.image) {
        images = [product.image];
    } else {
        images = ['https://via.placeholder.com/300'];
    }

    // Set Main Image (first one)
    mainImage.src = images[0];

    // Thumbnails
    if (images.length > 1) {
        thumbnailsContainer.innerHTML = images.map((img, idx) => `
            <button onclick="setModalMainImage('${img}')" class="w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all flex-shrink-0">
                <img src="${img}" class="w-full h-full object-cover">
            </button>
        `).join('');
        thumbnailsContainer.classList.remove('hidden');
    } else {
        thumbnailsContainer.innerHTML = '';
        thumbnailsContainer.classList.add('hidden');
    }

    // Details
    title.textContent = product.name;
    price.textContent = `Rs. ${product.price}`;
    category.textContent = product.category;
    description.textContent = product.description || "No description available.";

    if (product.oldPrice) {
        oldPrice.textContent = `Rs. ${product.oldPrice}`;
        oldPrice.classList.remove('hidden');
    } else {
        oldPrice.classList.add('hidden');
    }

    if (product.discount) {
        discountBadge.textContent = `-${product.discount}% OFF`;
        discountBadge.classList.remove('hidden');
    } else {
        discountBadge.classList.add('hidden');
    }

    // Rating
    const rating = product.rating || 4.5;
    ratingText.textContent = `(${rating})`;

    // Generate Stars
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(rating)) {
            starsHtml += `<i data-lucide="star" class="w-4 h-4 fill-current text-yellow-500"></i>`;
        } else {
            starsHtml += `<i data-lucide="star" class="w-4 h-4 text-gray-600"></i>`;
        }
    }
    ratingStars.innerHTML = starsHtml;

    // --- Reviews Section ---
    const reviewsContainer = document.getElementById('modal-reviews-container');
    if (!reviewsContainer) { // Create if doesn't exist (it won't in original HTML, so we inject or expect it)
        // Since we can't easily change HTML structure on the fly without replace_file, 
        // let's append it to the details section if not present, OR we assume I update the HTML separately.
        // For now, I will inject the HTML structure into the modal description area 
        // to avoid complex HTML edits.

        // Actually, let's create a container "modal-extra-content" in HTML later.
        // For now, I'll append to the description parent using create element if not there.
        let extra = document.getElementById('modal-reviews-section');
        if (!extra) {
            extra = document.createElement('div');
            extra.id = 'modal-reviews-section';
            extra.className = 'mt-8 pt-8 border-t border-white/10';
            description.parentNode.insertBefore(extra, addToCartBtn.parentNode);
        }

        const reviews = product.reviews || [];

        let reviewsHtml = `
            <h3 class="text-xl font-bold text-white mb-4">Customer Reviews</h3>
            <div class="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                ${reviews.length > 0 ? reviews.map(r => `
                    <div class="bg-black/20 p-3 rounded-lg border border-white/5">
                        <div class="flex items-center justify-between mb-1">
                            <span class="font-bold text-white text-sm">${r.name}</span>
                            <span class="text-xs text-gray-400">${r.date || ''}</span>
                        </div>
                        <div class="flex text-yellow-500 mb-1">
                            ${Array(5).fill(0).map((_, i) => `<i data-lucide="star" class="w-3 h-3 ${i < r.rating ? 'fill-current' : 'text-gray-600'}"></i>`).join('')}
                        </div>
                        <p class="text-gray-300 text-sm">"${r.comment}"</p>
                    </div>
                `).join('') : '<p class="text-gray-500 text-sm">No reviews yet. Be the first!</p>'}
            </div>
            
            <!-- Add Review Form -->
            <div class="bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 class="text-sm font-bold text-gray-300 mb-3">Write a Review</h4>
                <div class="space-y-3">
                    <input type="text" id="new-review-name" placeholder="Your Name" class="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm">
                    <textarea id="new-review-comment" placeholder="Your Experience..." rows="2" class="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"></textarea>
                    <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-400">Rating:</span>
                        <select id="new-review-rating" class="bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-white text-sm">
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                        <button onclick="submitProductReview(${product.id})" class="ml-auto bg-primary hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        `;
        extra.innerHTML = reviewsHtml;
    }

    // Button Action
    addToCartBtn.onclick = () => {
        addToCart(product.id);
        closeProductModal();
    };

    // Show Modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    lucide.createIcons();
}

function submitProductReview(productId) {
    const name = document.getElementById('new-review-name').value;
    const comment = document.getElementById('new-review-comment').value;
    const rating = parseInt(document.getElementById('new-review-rating').value);

    if (!name || !comment) {
        showToast('Name and Comment required!');
        return;
    }

    // Find Product
    // Look in window.products
    const pIndex = window.products.findIndex(p => p.id === productId);
    if (pIndex === -1) return;

    if (!window.products[pIndex].reviews) window.products[pIndex].reviews = [];

    window.products[pIndex].reviews.unshift({
        name,
        comment,
        rating,
        date: new Date().toLocaleDateString()
    });

    // Recalculate Average Rating
    const total = window.products[pIndex].reviews.reduce((acc, r) => acc + r.rating, 0);
    window.products[pIndex].rating = parseFloat((total / window.products[pIndex].reviews.length).toFixed(1));

    window.saveProducts(); // Persist

    // Re-render modal to show new review
    openProductModal(productId);
    showToast('Review Submitted!');
}

function setModalMainImage(src) {
    document.getElementById('modal-main-image').src = src;
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Place Order Function
function placeOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    const config = window.rubikConfig || { delivery: { cityFee: 250, outstationFee: 350 } };
    const deliverySelect = document.getElementById('delivery-fee-select');
    let deliveryFee = config.delivery.cityFee;
    let deliveryLabel = "Inner City";

    if (deliverySelect && deliverySelect.value === 'outstation') {
        deliveryFee = config.delivery.outstationFee;
        deliveryLabel = "Outstation";
    }

    const name = document.getElementById('customer-name').value;
    const address = document.getElementById('customer-address').value;
    const mobile1 = document.getElementById('customer-mobile1').value;
    const mobile2 = document.getElementById('customer-mobile2').value;

    if (!name || !address || !mobile1 || !mobile2) {
        showToast("Please fill in all details");
        return;
    }

    // Simulate order placement
    const orderData = {
        id: 'ORD-' + Date.now().toString().slice(-6),
        items: cart,
        total: calculateTotal() + deliveryFee,
        deliveryFee: deliveryFee,
        deliveryType: deliveryLabel,
        customer: { name, address, mobile1, mobile2 },
        date: new Date().toISOString(),
        status: 'pending'
    };

    console.log('Order Placed:', orderData);

    // Save Order to Local Storage (Simulating a Database for Admin Panel)
    const allOrders = JSON.parse(localStorage.getItem('rubik_orders')) || [];
    allOrders.unshift(orderData); // Add new order to the top
    localStorage.setItem('rubik_orders', JSON.stringify(allOrders));

    // Clear cart
    cart = [];
    saveCart();
    renderCart();
    updateCartCount();

    // Reset form
    document.getElementById('checkout-form').reset();

    // Show Success Message
    showToast("Order placed successfully!");

    // Optional: Alert
    alert("Thank you! Your order has been placed successfully.");
}

// Render Categories on Shop Page
function renderCategoryFilters(activeCategory = 'all') {
    const container = document.getElementById('category-filters');
    if (!container) return;

    if (!window.categories) return;

    // Add 'All' button
    let html = `
        <button onclick="filterByCategory('all')"
            class="category-filter-btn px-6 py-2 rounded-full font-medium transition-all border border-white/5 ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary'}">
            All
        </button>
    `;

    // Add other categories
    html += window.categories.map(cat => `
        <button onclick="filterByCategory('${cat.id}')"
            class="category-filter-btn px-6 py-2 rounded-full font-medium transition-all border border-white/5 ${activeCategory === cat.id ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-primary/20 hover:text-primary'}">
            ${cat.name}
        </button>
    `).join('');

    container.innerHTML = html;
}

function filterByCategory(catId) {
    renderShopProducts(catId);
    renderCategoryFilters(catId);
}

// Render Categories on Home Page
function renderHomeCategories() {
    const container = document.getElementById('categories-grid');
    if (!container) return;

    if (!window.categories) return;

    container.innerHTML = window.categories.map(cat => `
        <a href="shop.html?cat=${cat.id}"
            class="group relative overflow-hidden rounded-2xl glass-card aspect-square flex flex-col items-center justify-center p-4 hover:border-primary/50 transition-all cursor-pointer">
            <div class="w-16 h-16 bg-${cat.color || 'blue'}-500/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i data-lucide="${cat.icon || 'tag'}" class="w-8 h-8 text-${cat.color || 'blue'}-400"></i>
            </div>
            <h3 class="font-semibold text-center group-hover:text-primary transition-colors text-white">${cat.name}</h3>
        </a>
    `).join('');
    lucide.createIcons();
}

// Render Featured Products on Home Page
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container || !window.products) return;

    // Show more products (e.g., 8)
    const html = window.products.slice(0, 8).map(product => {
        let displayImage = product.image;
        if (product.images && product.images.length > 0) displayImage = product.images[0];
        if (!displayImage) displayImage = 'https://via.placeholder.com/300';

        return `
        <div class="glass-card rounded-2xl p-4 group hover:border-primary/30 transition-all duration-300 cursor-pointer" onclick="openProductModal(${product.id})">
            <div class="relative aspect-square rounded-xl overflow-hidden mb-4 bg-gray-800">
                ${product.discount ? `
                <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10">
                    -${product.discount}% OFF
                </div>
                ` : ''}
                
                ${product.freeDelivery ? `
                <div class="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10 flex items-center gap-1">
                    <i data-lucide="truck" class="w-3 h-3"></i> Free
                </div>
                ` : ''}

                <img src="${displayImage}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://via.placeholder.com/300'">
                
                <button onclick="event.stopPropagation(); addToCart(${product.id})" class="absolute bottom-2 right-2 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary hover:text-white z-20">
                    <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                </button>
            </div>
            
            ${product.freeDelivery ? `
            <div class="mb-2">
                <span class="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    <i data-lucide="truck" class="w-3 h-3"></i> Free Delivery
                </span>
            </div>
            ` : ''}

            <div class="space-y-2">
                <span class="text-xs font-medium text-primary uppercase tracking-wider">${product.category}</span>
                <h3 class="font-bold text-lg text-white leading-tight hover:text-primary transition-colors">${product.name}</h3>
                <div class="flex items-baseline gap-2">
                    <span class="text-xl font-bold text-white">Rs. ${product.price}</span>
                    ${product.oldPrice ? `<span class="text-sm text-gray-500 line-through">Rs. ${product.oldPrice}</span>` : ''}
                </div>
            </div>
        </div>
        `;
    }).join('');

    container.innerHTML = html;
    lucide.createIcons();
}

// Render Social Links
function renderSocialLinks() {
    const containers = document.querySelectorAll('#footer-social-links, #about-social-links'); // Add about-social-links selector
    if (containers.length === 0 || !window.rubikConfig || !window.rubikConfig.social) return;

    const social = window.rubikConfig.social;
    const platforms = [
        { key: 'facebook', icon: 'facebook', name: 'Facebook', url: social.facebook },
        { key: 'instagram', icon: 'instagram', name: 'Instagram', url: social.instagram },
        { key: 'twitter', icon: 'twitter', name: 'Twitter', url: social.twitter },
        { key: 'youtube', icon: 'youtube', name: 'YouTube', url: social.youtube },
        { key: 'tiktok', icon: 'music', name: 'TikTok', url: social.tiktok }
    ];

    const validLinks = platforms.filter(p => p.url && p.url.trim() !== '');

    const html = validLinks.map(link => `
        <a href="${link.url}" target="_blank" title="${link.name}"
            class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
            <i data-lucide="${link.icon}" class="w-5 h-5"></i>
        </a>
    `).join('');

    containers.forEach(c => {
        c.innerHTML = html;
        lucide.createIcons({ root: c });
    });
}


// Hero Slider
// Hero Slider
function initHeroSlider() {
    const container = document.getElementById('hero-slider-container');
    if (!container || !window.rubikConfig || !window.rubikConfig.heroSlides) return;

    const slides = window.rubikConfig.heroSlides;
    if (slides.length === 0) {
        container.innerHTML = '<div class="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600">No slides</div>';
        return;
    }

    let currentSlide = 0;

    container.innerHTML = slides.map((slide, index) => {
        let offerText = slide.offer;
        if (offerText && /^\d+$/.test(offerText.trim())) {
            offerText += '%';
        }

        return `
        <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'} slide-item" data-index="${index}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 rounded-2xl"></div>
            <img src="${slide.image}" class="w-full h-full object-cover rounded-2xl animate-ken-burns transform origin-center" alt="${slide.title || 'Slide'}">
            
            ${(slide.offer || slide.title) ? `
            <div class="absolute bottom-6 left-6 z-20 max-w-sm animate-slide-up">
                 <div class="glass-card px-5 py-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-xl flex items-center gap-4 group hover:border-primary/50 transition-colors">
                     
                     ${slide.offer ? `
                     <div class="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                        <i data-lucide="gift" class="w-7 h-7 text-white animate-pulse"></i>
                     </div>
                     
                     <div>
                        <p class="text-[10px] text-primary font-bold uppercase tracking-widest mb-0.5">Limited Deal</p>
                        <h2 class="text-3xl font-black text-white leading-none tracking-tight">
                            ${offerText} <span class="text-lg font-bold text-gray-400">OFF</span>
                        </h2>
                     </div>
                     ` : ''}

                     ${(!slide.offer && slide.title) ? `
                     <div>
                        <h2 class="text-xl font-bold text-white leading-tight">${slide.title}</h2>
                     </div>
                     ` : ''}
                 </div>
                 
                 ${(slide.offer && slide.title) ? `
                 <div class="mt-2 ml-2">
                    <p class="text-sm text-gray-300 font-medium text-shadow">${slide.title}</p>
                 </div>
                 ` : ''}
            </div>
            ` : ''}
        </div>
        `;
    }).join('');

    lucide.createIcons();

    if (slides.length > 1) {
        // Clear any existing interval to prevent duplicates on re-init
        if (window.sliderInterval) clearInterval(window.sliderInterval);

        window.sliderInterval = setInterval(() => {
            const items = container.querySelectorAll('.slide-item');
            if (items.length === 0) return;

            items[currentSlide].classList.remove('opacity-100');
            items[currentSlide].classList.add('opacity-0');

            currentSlide = (currentSlide + 1) % slides.length;

            items[currentSlide].classList.remove('opacity-0');
            items[currentSlide].classList.add('opacity-100');
        }, 5000);
    }
}

// Render Reviews
function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container || !window.rubikConfig || !window.rubikConfig.testimonials) return;

    const reviews = window.rubikConfig.testimonials;

    if (reviews.length === 0) {
        document.getElementById('reviews-section').classList.add('hidden');
        return;
    }

    document.getElementById('reviews-section').classList.remove('hidden');

    container.innerHTML = reviews.map(review => `
            < div class="glass-card p-6 rounded-2xl border border-white/5 relative" >
            <i data-lucide="quote" class="absolute top-6 right-6 text-white/10 w-8 h-8"></i>
            <div class="flex items-center gap-1 text-yellow-500 mb-4">
                ${Array(5).fill(0).map((_, i) =>
        `<i data-lucide="star" class="w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-600'}"></i>`
    ).join('')}
            </div>
            <p class="text-gray-300 mb-6 leading-relaxed">"${review.comment}"</p>
            <div>
                <p class="font-bold text-white">${review.name}</p>
                <p class="text-xs text-primary">Verified Customer</p>
            </div>
        </div >
            `).join('');

    lucide.createIcons();
}

// Consolidated DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    updateCartCount();

    // Date & Time
    function updateDateTime() {
        const now = new Date();
        const dateEl = document.getElementById('current-date');
        const timeEl = document.getElementById('current-time');
        const mobileTimeEl = document.getElementById('current-time-mobile');

        // Format: Monday, 12 Oct 2024
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        const dateStr = now.toLocaleDateString('en-US', options);

        // Format: 10:30:05 AM
        const timeStr = now.toLocaleTimeString('en-US');

        if (dateEl) dateEl.textContent = dateStr;
        if (timeEl) timeEl.textContent = timeStr;

        if (mobileTimeEl) mobileTimeEl.textContent = timeStr;
        const mobileDateEl = document.getElementById('current-date-mobile');
        if (mobileDateEl) mobileDateEl.textContent = dateStr;
    }

    // Update immediately and then every second
    updateDateTime();
    setInterval(updateDateTime, 1000);

    if (document.getElementById('shop-products-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat') || 'all';
        renderShopProducts(category);
        renderCategoryFilters();
    }

    if (document.getElementById('categories-grid')) {
        renderHomeCategories();
    }

    if (document.getElementById('featured-products')) {
        renderFeaturedProducts();
    }

    if (document.getElementById('reviews-grid')) {
        renderReviews();
    }

    initHeroSlider();
    renderSocialLinks();

    if (document.getElementById('cart-items-container')) {
        renderCart();

        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', placeOrder);
        }
    }

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuSidebar = document.getElementById('mobile-menu-sidebar');

    function openMobileMenu() {
        if (mobileMenuOverlay && mobileMenuSidebar) {
            mobileMenuOverlay.classList.remove('hidden');
            // distinct delay for transition
            setTimeout(() => {
                mobileMenuOverlay.classList.remove('opacity-0');
                mobileMenuSidebar.classList.remove('translate-x-full');
            }, 10);
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenuOverlay && mobileMenuSidebar) {
            mobileMenuOverlay.classList.add('opacity-0');
            mobileMenuSidebar.classList.add('translate-x-full');

            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Expose closeMobileMenu to window so onclick works
    window.closeMobileMenu = closeMobileMenu;

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // --- PWA & Bottom Navigation Logic ---

    // 1. Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered', reg))
            .catch(err => console.log('Service Worker Failed', err));
    }

    // 2. Inject Manifest Link
    if (!document.querySelector('link[rel="manifest"]')) {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = 'manifest.json';
        document.head.appendChild(link);
    }

    // 3. Deferred Install Prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        console.log('App install prompt captured');
    });

    // Helper to update bottom nav cart count specific
    function updateBottomNavCartCount() {
        const countEl = document.getElementById('bottom-nav-cart-count');
        if (countEl && window.cart) {
            const totalItems = window.cart.reduce((sum, item) => sum + item.quantity, 0);
            countEl.textContent = totalItems;
            if (totalItems > 0) countEl.classList.remove('hidden');
            else countEl.classList.add('hidden');
        }
    }

    // Hook into existing updateCartCount to also update bottom nav
    const originalUpdateCartCount = window.updateCartCount;
    window.updateCartCount = function () {
        if (originalUpdateCartCount) originalUpdateCartCount();
        updateBottomNavCartCount();
    };

    // Install App Function
    window.installApp = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('User response to install prompt:', outcome);
            deferredPrompt = null;
        } else {
            // Check if already in standalone mode
            if (window.matchMedia('(display-mode: standalone)').matches) {
                showToast('App is already installed!');
            } else {
                // Determine OS for better instructions
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (isIOS) {
                    showToast('Tap share button and "Add to Home Screen"');
                } else {
                    showToast('App installation not available or already installed.');
                }
            }
        }
    };

    // Run injection
    updateBottomNavCartCount();

});
