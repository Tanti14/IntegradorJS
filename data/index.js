const productsCardContainer = document.querySelector(".products-card-container");
const catalogoRenderAll = document.querySelector(".render-all")
const cartContainer = document.querySelector(".cart-container"); /* productsCart */
const totalPrice = document.querySelector(".total-price");
const btnComprar = document.querySelector(".pay-btn");
const btnLimpiar = document.querySelector(".clear-btn"); /* Boton Limpiar / Vaciar carrito */
const cartItemsCounter = document.querySelector(".cart-items-counter"); /* Numero arriba de icono carrito */
const cartBtn = document.querySelector(".cart-label"); /* Boton para abrir y cerrar el carrito */
const cartList = document.querySelector(".cart"); /* Esto es lo que se despliega cuando se toca el CartBTN */
const menuBtn = document.querySelector(".menu-label"); /* Boton para abrir y cerrar el menu hamburguesa */
const menuList = document.querySelector(".nav-links"); /* Esto es lo que se despliega cuando se toca el menuBTN */
const blurOverlay = document.querySelector(".blur-overlay"); /* Efecto de desenfoque al abrir el Cart o burguer menu */
const filterBtnContainer = document.querySelector(".filter-buttons"); /* CategoriesContainer */
const filterButtons = document.querySelectorAll(".filter-btn"); /* Categories List (Botones) */
const showMoreBtn = document.querySelector(".btn-showmore");
const successModal = document.querySelector(".add-modal");

/* Creamos el carrito en el local storage */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar el carrito en el local storage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

const createCard = (product) => {
  const { id, productName, precio, img } = product;
  return `<div class="product-card">
    <img
      class="product-card-img"
      src="${img}"
      alt="Imagen de Motherboard"
    />
    <div class="product-card-info">
      <p class="card-title">${productName}</p>
      <span class="card-price">$${precio}</span>
    </div>
    <button class="add-to-cart-btn btn-add" data-id='${id}' data-name='${productName}' data-precio='${precio}' data-img='${img}'>
      AGREGAR<img
        class="add-btn-img"
        src="./assets/img/products/cards-img/add.png"
        alt="cart icon"
      />
    </button>
  </div>`;
};

const renderProductCards = (productsList) => {
  productsCardContainer.innerHTML = productsList.map(createCard).join("");
};

const isLastIndexOf = () => {
  return appState.currentIndex === appState.productLimit - 1;
};

// Funcion para renderizar mas productos cuando se apriete el boton Ver Más
const loadMoreProducts = () => {
  appState.currentIndex += 1;
  let { products, currentIndex } = appState;
  renderPoductCards(products[currentIndex]);
  if (isLastIndexOf()) {
    showMoreBtn.style.display = "none";
    // showMoreBtn.classList.add("hidden")  corroborar si se oculta el boton de la forma hecha arriba
  }
};

// Funcion para ocultat/mostrar el boton de ver más

const toggleShowMorebtn = () => {
  if (appState.activeFilter) {
    showMoreBtn.style.display = "none";
    // showMoreBtn.classList.remove("hidden")
  }
  showMoreBtn.style.display = "block";
  // showMoreBtn.classList.add("hidden")
};

// Logica para los filtros

// Funcion para cambiar el estado de los botones del filtro/categoria

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...filterButtons];
  categories.forEach((categoyBtn) => {
    if (categoyBtn.dataset.category != selectedCategory) {
      categoyBtn.classList.remove("active");
      return;
    }
    categoyBtn.classList.add("active");
  });
};

//  Funcion para cambiar el estado del filtro activo
const changeFilterState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  toggleShowMorebtn(appState.activeFilter);
};

// Funcion para saber si el boton que se presiono es un boton de categoria y no esta activo

const isInactiveFilterBtn = (btn) => {
  return (
    btn.classList.classList.contains("category") &&
    !btn.classList.contains("active")
  );
};

// FUncion para aplicar el filtro cuando se aprieta el boton de categoria

const applyFilter = (event) => {
  const { target } = event;

  if (!isInactiveFilterBtn(target)) return;

  productsCardContainer.innerHTML = "";

  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentIndex = 0;
    return;
  }

  /* Si no hay un filtro activo xq el usuario toco el boton de TODOS */
  renderPoductCards(appState.products[0]);
};

// Funcion para filtrar los prouctos por categoria y mostrarlos / renderizarlos

const rederFilteredProducts = () => {
  const filteredProducts = productsData.filter((product) => {
    product.categoria === appState.activeFilter;
  });
  renderPoductCards(filteredProducts);
};

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

// Logica para agregar items al carrito

// Crear card de producto en el carrito
const createCartItemCard = (cartProduct) => {
  const {id, productName, precio, img, cantidad} = cartProduct

  return `<div class="cart-item">
  <img
    src="${img}"
    alt="Cart item icon"
  />
  <div class="item-info">
    <h3 class="item-title">${productName}</h3>
    <span class="item-price">$${precio}</span>
  </div>

  <div class="item-counter">
    <span class="quantity-handler down data-id=${id}">-</span>
    <span class="item-quantity">${cantidad}</span>
    <span class="quantity-handler up data-id=${id}">+</span>
  </div>
</div>`
}

const renderCart = () => {
  if(!cart.length) {
    cartContainer.innerHTML = `<p>Su carrito está vacío</p>`;
    return;
  }
  // Creamos una card con el item guardado en localstorage dentro del cartContainer del carrito
  cartContainer.innerHTML = cart.map(createCartItemCard).join("")
}

// Funcion para obtener el total de la compra

const sumarTotalCarrito = () => {
  return cart.reduce((contador, productoActual) => contador + Number(productoActual.precio) * productoActual.cantidad, 0);
}

// Funcion para mostrar el total de la compra

const showTotal = () => {
  totalPrice.innerHTML = `$${sumarTotalCarrito().toFixed(2)}`
}

// Funcion para actualizar el numero en el icono del carrito

const updateCartQuantityBubble = () => {
  cartItemsCounter.textContent = cart.reduce((contador, actual) => contador + actual.cantidad, 0)
}

// Funcion para habilitar o desabilitar un boton (Cualquiera)
const disableBtn = (btn) => {
  if(!cart.length) {
    btn.classList.add("disabled")
  }else {
    btn.classList.remove("disabled")
  }
}

// Funcion para modificar el estado del carrito  
const updateCartState = () => {
  saveCart()
  renderCart()
  disableBtn(btnComprar)
  disableBtn(btnLimpiar)
  updateCartQuantityBubble()
}

// Funcion para crear un objeto con la informacion del producto a agregar del carrito
const createProductData = (product) => {
  const {id, productName, precio, img} = product
  return id, productName, precio, img;
}

// Funcion para saber si cierto producto ya esta en el carrito
const isProductInCart = (product) => {
  return cart.find((item) => item.id === product.id)
}

// Funcion para agregar una unidad a un product que ya esta en el carrito
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) => cartProduct.id === product.id ? {...cartProduct, cantidad: cartProduct.cantidad + 1} : cartProduct);
};

// Funcion para crear un objeto con la info del producto que se quiere agregar al carrito
const createCartProduct = (product) => {
  cart = [...cart, {...product, cantidad: 1}]
}


// Funcion para mostrar el cartel de operacion exitosa al agregar un producto (Show Modal)
const showSuccessAlert = (msg) => {
  successModal.classList.add("active-modal")
  successModal.textContent = msg
  setTimeout(() => {
    successModal.classList.remove("active-modal")
  }, 1500)
};

// Funcion para crear un objeto con la informacion del producto que se agrega al carrito

const addProduct = (e) => {
  if(!e.target.classList.contains("btn-add")) return;
  const product = createProductData(e.target.dataset)
  if(isProductInCart(product)){
    addUnitToProduct(product)
    /* showSuccessAlert("Se agregó una unidad del producto al carrito") */
  }else {
    createCartProduct(product)
    showSuccessAlert("El producto se agregó al carrito")
  }
  updateCartState()
};

// Funcion para agregar mas de un producto desde el carrito
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id)
  addUnitToProduct(existingCartProduct)
}

// Funcion para restar un producto desde el carrito
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id)
  if(existingCartProduct.cantidad === 1){
    if(window.confirm("Desea eliminar el producto del carrito?")){
      removeProductFromCart(existingCartProduct)
    }
    return;
  }
  substractProductUnit(existingCartProduct)
}

// Funcion para remover un producto del carrito
const removeProductFromCart = (product) => {
  cart = cart.filter((item) => item.id !== product.id)
  updateCartState()
}

// Funcion para restar una unidad a un producto del carrito 
const substractProductUnit = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id ? 
    {...item, cantidad: Number(item.cantidad) - 1} 
    : item
  });
}

// Funcion para manejar los eventos al apretar los botones + o - de un item en el carrito
const handleQuantity = (e) => {
  if(e.target.classList.contains("down")){
    handleMinusBtnEvent(e.target.dataset.id)
  }
  else if(e.target.classList.contains("up")){
    handlePlusBtnEvent(e.target.dataset.id)
  }
  updateCartState()
}

//Funcion para vaciar el carrito 
    //resetCartItems
const resetCart = () => {
  cart = [] 
  updateCartState()
}

// Funcion para completar la compra o vaciar el carrito
const completeCartAction = (confirmMsg, successMsg) => {
  if(!cart.length) return;
  if(window.confirm(confirmMsg)){
    resetCart()
    alert(successMsg)
  }
}

// Funcion para disparar el mensaje de compra exitosa
const completeBuy = () => {
  completeCartAction("Desea finalizar la compra?", "Gracias por su compra!")
}

// Funcion para disparar el mensaje de vaciado exitoso de carrito
const deleteCart = () => {
  completeCartAction("Desea vaciar el carrito?", "No hay items en el carrito")
}

const init = () => {
  renderProductCards(appState.products[0])
 /*  catalogoRenderAll(appState.products[0]) */
  showMoreBtn.addEventListener("click", loadMoreProducts)
  filterBtnContainer.addEventListener("click", applyFilter)
  cartBtn.addEventListener("click", toggleCart)
  menuBtn.addEventListener("click", toggleMenu)
  window.addEventListener("scroll", closeOnScroll)
  menuList.addEventListener("click", closeOnClick)
  /* cartList.addEventListener("click", closeOnClick) */
  blurOverlay.addEventListener("click", closeOutsideClick)
  document.addEventListener("DOMContentLoaded", renderCart)
  document.addEventListener("DOMContentLoaded", showTotal)
  productsCardContainer.addEventListener("click", addProduct)
  cartContainer.addEventListener("click", handleQuantity)
  btnComprar.addEventListener("click", completeBuy)
  btnLimpiar.addEventListener("click", deleteCart)
  disableBtn(btnComprar)
  disableBtn(btnLimpiar)
  updateCartQuantityBubble(cart)
}

init();