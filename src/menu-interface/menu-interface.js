const cartBtn = document.querySelector(".cart-label");
const cartList = document.querySelector(".cart");
const menuBtn = document.querySelector(".menu-label");
const menuList = document.querySelector(".nav-links");
const blurOverlay = document.querySelector(".blur-overlay"); 


// Funcion para mostrar/ocultar menu hamburguesa y el overlay
const toggleMenu = () => {
    menuList.classList.toggle("open-menu");
    if (cartList.classList.contains("open-cart")) {
      cartList.classList.remove("open-cart");
      return;
    }
    blurOverlay.classList.toggle("show-overlay");
  };
  
  const toggleCart = () => {
    cartList.classList.toggle("open-cart");
    if (menuList.classList.contains("open-menu")) {
      menuList.classList.remove("open-menu");
      return;
    }
    blurOverlay.classList.toggle("show-overlay");
  };
  
  // Funcion para cerrar el menu hamburguesa cuando se hace click en un link del navbar
  const closeOnClick = (e) => {
    if (!e.target.classList.contains("nav-link")) return;
    menuList.classList.remove("open-menu");
    blurOverlay.classList.remove("show-overlay");
  };
  
  // Funcion para cerrar el menu hamburguesa cuando se hace scroll
  const closeOnScroll = () => {
    if (
      !menuList.classList.contains("open-menu") &&
      !cartList.classList.contains("open-cart")
    )
      return;
  
      menuList.classList.remove("open-menu");
      cartList.classList.remove("open-cart");
      blurOverlay.classList.remove("show-overlay");
  };
  
  
  // Funcion para cerrar el menu o carrito cuando se cuando se hace click sobre el overlay (fondo)
  const closeOutsideClick = () => {
    menuList.classList.remove("open-menu");
    cartList.classList.remove("open-cart");
    blurOverlay.classList.remove("show-overlay");
  }

  export const menuFunctionsInit = () => {
    cartBtn.addEventListener("click", toggleCart)
    menuBtn.addEventListener("click", toggleMenu)
    window.addEventListener("scroll", closeOnScroll)
    menuList.addEventListener("click", closeOnClick)
    blurOverlay.addEventListener("click", closeOutsideClick)
  }