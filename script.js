const products = [
          { id: 1, name: "Wireless Headphones", category: "electronics", price: 2999, image:  "images/headphone.jpg", description: "High-quality wireless headphones with noise cancellation and 20-hour battery life." },
          { id: 2, name: "Smart Watch", category: "electronics", price: 4999, image: "images/smartwatch.jpg", description: "Fitness tracker with heart rate monitor, GPS, and smartphone notifications." },
          { id: 3, name: "Men T-Shirt", category: "clothing", price: 799, image: "images/tshirt.jpg", description: "Comfortable cotton t-shirt available in multiple colors and sizes." },
          { id: 4, name: "Men Jacket", category: "clothing", price: 2499, image: "images/jacket.jpg", description: "Stylish winter jacket with warm lining and multiple pockets." },
          { id: 5, name: "Leather Bag", category: "accessories", price: 1999, image: "images/bag.jpg", description: "Genuine leather bag perfect for daily use or travel." },
          { id: 6, name: "Stylish Sunglasses", category: "accessories", price: 999, image: "images/sunglasses.jpg", description: "UV protection sunglasses with premium frame material." },
          { id: 7, name: "Laptop Backpack", category: "accessories", price: 1499, image: "images/backpack.jpg", description: "Water-resistant backpack with laptop compartment and USB charging port." },
          { id: 8, name: "Wireless Mouse", category: "electronics", price: 899, image: "images/mouse.jpg", description: "Ergonomic wireless mouse with silent clicks and long battery life." },
          { id: 9, name: "Women Scarf", category: "clothing", price: 499, image: "images/scarf.jpg", description: "Soft wool blend scarf perfect for cold weather." },
          { id: 10, name: "Smartphone Stand", category: "accessories", price: 299, image: "images/stand.jpg", description: "Adjustable phone stand for desk or bedside table." }
      ];
      
      
      let cart = [];
      
      
      function loadCart() {
          const savedCart = localStorage.getItem('cart');
          if (savedCart) {
              cart = JSON.parse(savedCart);
          }
          updateCartCount();
      }
      
      
      function saveCart() {
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
      }
      
      
      function updateCartCount() {
          const cartCountElement = document.getElementById('cart-count');
          if (cartCountElement) {
              const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
              cartCountElement.textContent = totalItems;
          }
      }
      
      
      function addToCart(productId) {
          const product = products.find(p => p.id === productId);
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
          alert(`${product.name} added to cart!`);
      }
      
      
      let currentCategory = 'all';
      let currentMaxPrice = 5000;
      
      // Display products based on filters
      function displayProducts() {
          const productsGrid = document.getElementById('products-grid');
          if (!productsGrid) return;
          
          
          let filteredProducts = products.filter(product => {
              const categoryMatch = currentCategory === 'all' || product.category === currentCategory;
              const priceMatch = product.price <= currentMaxPrice;
              return categoryMatch && priceMatch;
          });
          
          
          productsGrid.innerHTML = '';
          
      
          if (filteredProducts.length === 0) {
              productsGrid.innerHTML = '<div class="no-products">No products found. Try adjusting your filters!</div>';
              return;
          }
          
          // Display each product card
          filteredProducts.forEach(product => {
              const productCard = document.createElement('div');
              productCard.className = 'product-card';
              productCard.innerHTML = `
                  <div class="product-image"><img src="${product.image}" alt="${product.name}"></div>
                  <div class="product-info">
                      <h4 class="product-title">${product.name}</h4>
                      <p class="product-category">${product.category}</p>
                      <p class="product-price">₹${product.price.toLocaleString()}</p>
                      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                  </div>
              `;
              
              
              productCard.addEventListener('click', (e) => {
                  
                  if (e.target.classList.contains('add-to-cart')) return;
                
                  sessionStorage.setItem('selectedProduct', JSON.stringify(product));
                  window.location.href = 'products.html';
              });
              
              productsGrid.appendChild(productCard);
          });
          
          
          document.querySelectorAll('.add-to-cart').forEach(button => {
              button.addEventListener('click', (e) => {
                  e.stopPropagation();
                  const productId = parseInt(button.dataset.id);
                  addToCart(productId);
              });
          });
      }
      
      // Setup event listeners
      function setupEventListeners() {
          
          const categoryButtons = document.querySelectorAll('.cat-btn');
          categoryButtons.forEach(button => {
              button.addEventListener('click', () => {
                 
                  categoryButtons.forEach(btn => btn.classList.remove('active'));
                  button.classList.add('active');
                  
                  
                  currentCategory = button.dataset.category;
                  displayProducts();
              });
          });
          
          
          const priceRange = document.getElementById('price-range');
          const priceValue = document.getElementById('price-value');
          
          if (priceRange && priceValue) {
              priceRange.addEventListener('input', (e) => {
                  currentMaxPrice = parseInt(e.target.value);
                  priceValue.textContent = currentMaxPrice;
                  displayProducts();
              });
          }
          
          
          const clearFilters = document.getElementById('clear-filters');
          if (clearFilters) {
              clearFilters.addEventListener('click', () => {
                  currentCategory = 'all';
                  currentMaxPrice = 5000;
                  
                  
                  document.querySelectorAll('.cat-btn').forEach(btn => {
                      btn.classList.remove('active');
                      if (btn.dataset.category === 'all') {
                          btn.classList.add('active');
                      }
                  });
                  
                  if (priceRange) {
                      priceRange.value = '5000';
                      if (priceValue) priceValue.textContent = '5000';
                  }
                  
                  displayProducts();
              });
          }
      }
      
      // Product Details Pag
      function loadProductDetails() {
          const selectedProduct = sessionStorage.getItem('selectedProduct');
          if (!selectedProduct) {
              
              window.location.href = 'index.html';
              return;
          }
          
          const product = JSON.parse(selectedProduct);
          const productDetailContainer = document.getElementById('product-detail');
          
          if (productDetailContainer) {
              productDetailContainer.innerHTML = `
                  <div class="product-detail-card">
                      <div class="product-detail-image"><img src="${product.image}" alt="${product.name}"></div>
                      <div class="product-detail-info">
                          <h2>${product.name}</h2>
                          <p class="detail-category">Category: ${product.category}</p>
                          <p class="detail-price">₹${product.price.toLocaleString()}</p>
                          <p class="detail-description">${product.description}</p>
                          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                          <button class="back-btn" onclick="window.location.href='index.html'">Back to Products</button>
                      </div>
                  </div>
              `;
              
              const addButton = document.querySelector('.add-to-cart');
              if (addButton) {
                  addButton.addEventListener('click', () => {
                      addToCart(product.id);
                  });
              }
          }
      }
      
      // Cart Page 
      function loadCartPage() {
          const cartContainer = document.getElementById('cart-container');
          const cartTotalElement = document.getElementById('cart-total');
          
          if (!cartContainer) return;
          
          if (cart.length === 0) {
              cartContainer.innerHTML = '<div class="empty-cart"><h3>Your cart is empty!</h3><p>Go back to <a href="index.html">shop</a> to add items.</p></div>';
              if (cartTotalElement) cartTotalElement.textContent = '0';
              return;
          }
          
          
          let cartHTML = '<div class="cart-items">';
          let total = 0;
          
          cart.forEach((item, index) => {
              const itemTotal = item.price * item.quantity;
              total += itemTotal;
              
              cartHTML += `
                  <div class="cart-item">
                      <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                      <div class="cart-item-details">
                          <h4>${item.name}</h4>
                          <p>₹${item.price.toLocaleString()}</p>
                      </div>
                      <div class="cart-item-quantity">
                          <button class="qty-btn minus" data-index="${index}">-</button>
                          <span>${item.quantity}</span>
                          <button class="qty-btn plus" data-index="${index}">+</button>
                      </div>
                      <div class="cart-item-total">₹${itemTotal.toLocaleString()}</div>
                      <button class="remove-btn" data-index="${index}">Remove</button>
                  </div>
              `;
          });
          
          cartHTML += '</div>';
          cartContainer.innerHTML = cartHTML;
          if (cartTotalElement) cartTotalElement.textContent = total.toLocaleString();
          
          
          document.querySelectorAll('.minus').forEach(button => {
              button.addEventListener('click', (e) => {
                  const index = parseInt(button.dataset.index);
                  if (cart[index].quantity > 1) {
                      cart[index].quantity -= 1;
                  } else {
                      cart.splice(index, 1);
                  }
                  saveCart();
                  loadCartPage();
              });
          });
          
          document.querySelectorAll('.plus').forEach(button => {
              button.addEventListener('click', (e) => {
                  const index = parseInt(button.dataset.index);
                  cart[index].quantity += 1;
                  saveCart();
                  loadCartPage();
              });
          });
          
          document.querySelectorAll('.remove-btn').forEach(button => {
              button.addEventListener('click', (e) => {
                  const index = parseInt(button.dataset.index);
                  cart.splice(index, 1);
                  saveCart();
                  loadCartPage();
              });
          });
      }
      
      
      document.addEventListener('DOMContentLoaded', () => {
          loadCart();
          
          
          if (window.location.pathname.includes('products.html')) {
              loadProductDetails();
          } else if (window.location.pathname.includes('cart.html')) {
              loadCartPage();
          } else {
              
              displayProducts();
              setupEventListeners();
          }
      });