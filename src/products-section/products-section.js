import { productsData, appState } from "../../data/db.js";
import { addProduct } from "../cart/cart.js";

const productsCardContainer = document.querySelector(".products-card-container");
const filterBtnContainer = document.querySelector(".filter-buttons");
const filterButtons = document.querySelectorAll(".filter-btn");
const showMoreBtn = document.querySelector(".btn-showmore");

const createCard = (product) => {
  const { id, productName, precio, img } = product;
  return `<div class="product-card">
      <img
        class="product-card-img"
        src="${img}"
        alt="${productName}"
      />
      <div class="product-card-info">
        <p class="card-title">${productName}</p>
        <span class="card-price">$${precio}</span>
      </div>
      <button class="add-to-cart-btn" data-id='${id}' data-name='${productName}' data-precio='${precio}' data-img='${img}'>
        AGREGAR<img
          class="add-btn-img"
          src="./assets/img/products/cards-img/mas.png"
          alt="cart icon"
        />
      </button>
    </div>`;
};

const renderProductCards = (productsList) => {
  productsCardContainer.innerHTML += productsList.map(createCard).join("");
};

const isLastIndexOf = () => {
  return appState.currentIndex === appState.productLimit - 1;
};

// Funcion para renderizar mas productos cuando se apriete el boton Ver Más
const loadMoreProducts = () => {
  appState.currentIndex += 1;
  let { products, currentIndex } = appState;
  renderProductCards(products[currentIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.style.display = "none";
  }
};

// Funcion para ocultat/mostrar el boton de ver más

const toggleShowMorebtn = () => {
  if (!appState.activeFilter) {
    showMoreBtn.style.display = "block";
    return;
  }
  showMoreBtn.style.display = "none";
};

// Logica para los filtros
// Funcion para cambiar el estado de los botones del filtro/categoria
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...filterButtons];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

//  Funcion para cambiar el estado del filtro activo
const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  toggleShowMorebtn(appState.activeFilter);
};

// Funcion para saber si el boton que se presiono es un boton de categoria y no esta activo

const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("filter-btn") &&
    !element.classList.contains("active")
  );
};

// FUncion para aplicar el filtro cuando se aprieta el boton de categoria

const applyFilter = (event) => {
  const { target } = event;

  if (!isInactiveFilterBtn(target)) return;
  productsCardContainer.innerHTML = "";
  changeFilterState(target);
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentIndex = 0;
    return;
  }

  /* Si no hay un filtro activo xq el usuario toco el boton de TODOS */
  renderProductCards(appState.products[0]);
};

// Funcion para filtrar los prouctos por categoria y mostrarlos / renderizarlos

const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.categoria === appState.activeFilter
  );
  renderProductCards(filteredProducts);
};

export const productsSection = () => {
  renderProductCards(appState.products[0]);
  showMoreBtn.addEventListener("click", loadMoreProducts);
  filterBtnContainer.addEventListener("click", applyFilter);
  productsCardContainer.addEventListener("click", addProduct);
};
