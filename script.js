import products from "./product.js";

// DOM elements
const showProductsElement = document.querySelector(".show-products");
const inputSearchElement = document.querySelector(".inputSearch");
const sortSelectElement = document.querySelector("#sortSelect");

// App state
let state = {
  allProducts: products,
  visibleProducts: products,
  searchQuery: "",
  sortBy: "default",
  cartArray: [],
};
  console.log("🚀 ~ state.cartArray:", state.cartArray)

function addToCart(productId) {

  let product = state.allProducts.find(product=>product.id === Number(productId));
  state.cartArray.push(product);
  // UI Update
  console.log(state.cartArray);
  
}

function removeFromCart(index) {
  state.cartArray.splice(index, 1);
  // UI Update
}

// Render function
function renderProducts(products) {
  showProductsElement.innerHTML = "";

  products.forEach((product) => {
    showProductsElement.innerHTML += `
      <div class="product">
        <img src="${product.image}" alt="${product.name}" />
        <div class="content">
          <p>${product.name}</p>
          <p>${product.description}</p>
          <p>$${product.price}</p>
          <button class="btn add-to-cart-btn" data-id="${product.id}">Add To Cart</button>
        </div>
      </div>
    `;
  });
}

// State updater
function updateState() {
  let updatedProducts = [...state.allProducts];

  // 🔍 Filter by search
  if (state.searchQuery) {
    updatedProducts = updatedProducts.filter((product) =>
      product.name.toLowerCase().includes(state.searchQuery),
    );
  }

  // 🔃 Sort
  if (state.sortBy === "low-to-high") {
    updatedProducts.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "high-to-low") {
    updatedProducts.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === "name") {
    updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  state.visibleProducts = updatedProducts;
  renderProducts(state.visibleProducts);
}

// Initial render
renderProducts(state.visibleProducts);

// Search input listener
inputSearchElement.addEventListener("input", (e) => {
  state.searchQuery = e.target.value.trim().toLowerCase();
  updateState();
});

// sorting the products
sortSelectElement.addEventListener("change", (e) => {
  state.sortBy = e.target.value;
  updateState();
});

// adding product to cart
showProductsElement.addEventListener("click", (e) => {
  if (e.target.classList[1] === "add-to-cart-btn") {
    let id = e.target.dataset.id;
    addToCart(id);
  }
});


