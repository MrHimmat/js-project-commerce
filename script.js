import products from "./product";

// DOM elements
const showProductsElement = document.querySelector(".show-products");
const inputSearchElement = document.querySelector(".inputSearch");

// App state
let state = {
  allProducts: products,        // source of truth
  visibleProducts: products,    // what we render
  searchQuery: "",
  sortBy: "default",
};

// Render function
function renderProducts(products) {
  showProductsElement.innerHTML = "";

  products.forEach((product, index) => {
    showProductsElement.innerHTML += `
      <div class="product" data-id="${index}">
        <img src="${product.image}" />
        <div class="content">
          <p>${product.name}</p>
          <p>${product.description}</p>
          <p>${product.price}</p>
          <button class="btn">Add To Cart</button>
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
    updatedProducts = updatedProducts.filter(product =>
      product.name.toLowerCase().includes(state.searchQuery)
    );
  }

  // 🔃 Sort
  if (state.sortBy === "price-asc") {
    updatedProducts.sort((a, b) => a.price - b.price);
  }

  if (state.sortBy === "price-desc") {
    updatedProducts.sort((a, b) => b.price - a.price);
  }

  if (state.sortBy === "name") {
    updatedProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
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


