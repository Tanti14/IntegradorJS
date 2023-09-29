import { cartFunctionsInit } from "./src/cart/cart.js";
import { menuFunctionsInit } from "./src/menu-interface/menu-interface.js";
import { productsSection } from "./src/products-section/products-section.js";

const loaderSpinnerContainer = document.querySelector("#contenedor-carga")

/* Creo la funcion del loader */
window.onload = () => {
  const load = () => {
    loaderSpinnerContainer.style.visibility = 'hidden';
    loaderSpinnerContainer.style.opacity = '0';
  }
  setTimeout(load, 1000)
}

const init = () => {
  productsSection();
  cartFunctionsInit();
  menuFunctionsInit();
}

init()