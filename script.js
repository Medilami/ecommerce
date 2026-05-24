// PRODUCT DATA

const products = [

          {
                    id: 1,
                    name: "Wireless Headphones",
                    category: "electronics",
                    price: 2999,
                    image: "images/headphone.jpg"
          },

          {
                    id: 2,
                    name: "Smart Watch",
                    category: "electronics",
                    price: 4999,
                    image: "images/smartwatch.jpg"
          },

          {
                    id: 3,
                    name: "Men T-Shirt",
                    category: "clothing",
                    price: 799,
                    image: "images/shirt.jpg"
          },

          {
                    id: 4,
                    name: "men Jacket",
                    category: "clothing",
                    price: 2499,
                    image: "images/jacket.jpg"
          },

          {
                    id: 5,
                    name: "Leather Bag",
                    category: "accessories",
                    price: 1999,
                    image: "images/bag.jpg"
          },

          {
                    id: 6,
                    name: "Stylish Sunglasses",
                    category: "accessories",
                    price: 999,
                    image: "images/sunglasses.jpg"
          }

];



// SELECT PRODUCT GRID

const productGrid = document.getElementById("productGrid");



// SELECT FILTER ELEMENTS

const categoryButtons =
          document.querySelectorAll(".category-btn");

const priceFilter =
          document.getElementById("priceFilter");

const searchInput =
          document.getElementById("searchInput");



// MODAL ELEMENTS

const productModal =
          document.getElementById("productModal");

const closeModal =
          document.getElementById("closeModal");

const modalImage =
          document.getElementById("modalImage");

const modalTitle =
          document.getElementById("modalTitle");

const modalCategory =
          document.getElementById("modalCategory");

const modalPrice =
          document.getElementById("modalPrice");



// CART VARIABLES

const cartItemsContainer =
          document.getElementById("cartItems");

const cartTotal =
          document.getElementById("cartTotal");

let cart =
          JSON.parse(localStorage.getItem("cart")) || [];



// DISPLAY PRODUCTS

function displayProducts(products) {

          productGrid.innerHTML = "";

          products.forEach(product => {

                    const productCard =
                              document.createElement("div");

                    productCard.classList.add("product-card");

                    productCard.innerHTML = `

                              <img src="${product.image}"
                                        alt="${product.name}">

                              <div class="product-info">

                                        <h3>${product.name}</h3>

                                        <p>
                                                  Category:
                                                  ${product.category}
                                        </p>

                                        <p class="price">
                                                  ₹${product.price.toLocaleString()}
                                        </p>

                                        <button class="add-to-cart-btn">
                                                  Add To Cart
                                        </button>

                              </div>

                    `;

                    productGrid.appendChild(productCard);




                    // OPEN PRODUCT MODAL

                    productCard.addEventListener("click",
                              (event) => {

                    if (
                              event.target.classList.contains(
                                        "add-to-cart-btn"
                              )
                    ) {

                              return;

                    }

                    productModal.style.display = "block";

                    modalImage.src = product.image;

                    modalTitle.innerText = product.name;

                    modalCategory.innerText =
                              `Category: ${product.category}`;

                    modalPrice.innerText =
                              `Price: ₹${product.price.toLocaleString()}`;

                    });




                    // ADD TO CART EVENT

                    const addToCartButton =
                              productCard.querySelector(
                                        ".add-to-cart-btn"
                              );

                    addToCartButton.addEventListener("click",
                              () => {

                    cart.push(product);

                    localStorage.setItem(
                              "cart",
                              JSON.stringify(cart)
                    );

                    displayCart();

                    });

          });

}




// DISPLAY CART

function displayCart() {

          cartItemsContainer.innerHTML = "";

          let total = 0;

          cart.forEach(item => {

                    total += item.price;

                    const cartItem =
                              document.createElement("div");

                    cartItem.classList.add("cart-item");

                    cartItem.innerHTML = `

                              <p>
                                        ${item.name}
                                        -
                                        ₹${item.price.toLocaleString()}
                              </p>

                              <button class="remove-btn">
                                        Remove
                              </button>

                    `;

                    cartItemsContainer.appendChild(cartItem);




                    // REMOVE ITEM

                    const removeButton =
                              cartItem.querySelector(".remove-btn");

                    removeButton.addEventListener("click",
                              () => {

                    cart = cart.filter(cartProduct =>
                              cartProduct.id !== item.id
                    );

                    localStorage.setItem(
                              "cart",
                              JSON.stringify(cart)
                    );

                    displayCart();

                    });

          });

          cartTotal.innerText =
                    `Total: ₹${total.toLocaleString()}`;

}




// CLOSE MODAL

closeModal.addEventListener("click", () => {

          productModal.style.display = "none";

});




// CATEGORY FILTER

categoryButtons.forEach(button => {

          button.addEventListener("click", () => {

                    const category =
                              button.dataset.category;

                    if (category === "all") {

                              displayProducts(products);

                    }

                    else {

                              const filteredProducts =
                                        products.filter(product =>

                              product.category === category

                                        );

                              displayProducts(filteredProducts);

                    }

          });

});




// PRICE FILTER

priceFilter.addEventListener("change", () => {

          const value = priceFilter.value;

          if (value === "all") {

                    displayProducts(products);

                    return;

          }

          const prices = value.split("-");

          const min = Number(prices[0]);

          const max = Number(prices[1]);

          const filteredProducts =
                    products.filter(product =>

          product.price >= min &&
          product.price <= max

                    );

          displayProducts(filteredProducts);

});




// SEARCH FILTER

searchInput.addEventListener("keyup", () => {

          const searchValue =
                    searchInput.value.toLowerCase();

          const filteredProducts =
                    products.filter(product =>

          product.name
                    .toLowerCase()
                    .includes(searchValue)

                    );

          displayProducts(filteredProducts);

});




// INITIAL DISPLAY

displayProducts(products);

displayCart();