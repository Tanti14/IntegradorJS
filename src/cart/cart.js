const cartContainer = document.querySelector(".cart-container");
const totalPrice = document.querySelector(".total-price");
const btnComprar = document.querySelector(".pay-btn");
const btnLimpiar = document.querySelector(".clear-btn");
const cartItemsCounter = document.querySelector(".cart-items-counter");

/* Creamos el carrito en el local storage */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar el carrito en el local storage
const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Crear card de producto en el carrito
const createCartItemCard = (cartProduct) => {
  const { id, name, precio, img, cantidad } = cartProduct;
  return `<div class="cart-item">
    <img
      src='${img}'
      alt="Cart item icon"
    />
    <div class="item-card-top">
      <h3 class="item-title">${name}</h3>
      <div class="item-card-bottom">
        <span class="item-price">$${precio}</span>
        <div class="item-counter">
          <span class="quantity-handler down" data-id="${id}">-</span>
          <span class="item-quantity">${cantidad}</span>
          <span class="quantity-handler up" data-id="${id}">+</span>
        </div>
      </div>
    </div>
  </div>`;
};

const renderCart = () => {
  if (!cart.length) {
    cartContainer.innerHTML = `<p>Su carrito está vacío</p>`;
    return;
  }
  // Creamos una card con el item guardado en localstorage dentro del cartContainer del carrito
  cartContainer.innerHTML = cart.map(createCartItemCard).join("");
};

// Funcion para obtener el total de la compra
const sumarTotalCarrito = () => {
  let valor = cart.reduce(
    (acc, current) => acc + Number(current.precio) * current.cantidad,
    0
  );
  return valor;
};

// Funcion para mostrar el total de la compra

const showTotal = () => {
  totalPrice.innerHTML = `$${sumarTotalCarrito().toFixed(2)}`;
};

// Funcion para actualizar el numero en el icono del carrito

const updateCartQuantityBubble = () => {
  cartItemsCounter.textContent = cart.reduce(
    (acc, current) => acc + current.cantidad,
    0
  );
};

// Funcion para habilitar o desabilitar un boton (Cualquiera)
const disableBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

// Funcion para modificar el estado del carrito
const updateCartState = () => {
  saveCart();
  renderCart();
  showTotal();
  disableBtn(btnComprar);
  disableBtn(btnLimpiar);
  updateCartQuantityBubble();
};

// Funcion para crear un objeto con la informacion del producto a agregar del carrito
const createProductData = ({ id, name, precio, img }) => {
  console.log(name);
  return { id, name, precio, img };
};

// Funcion para saber si cierto producto ya esta en el carrito
const isProductInCart = (product) => {
  return cart.find((item) => item.id === product.id);
};

// Funcion para agregar una unidad a un product que ya esta en el carrito
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, cantidad: cartProduct.cantidad + 1 }
      : cartProduct
  );
};

// Funcion para crear un objeto con la info del producto que se quiere agregar al carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product, cantidad: 1 }];
};

// Funcion para crear un objeto con la informacion del producto que se agrega al carrito
export const addProduct = (e) => {
  if (!e.target.classList.contains("add-to-cart-btn")) return;
  const product = createProductData(e.target.dataset);
  if (isProductInCart(product)) {
    addUnitToProduct(product);
    Swal.fire({
      title: "¡Operacion Exitosa!",
      text: "SE AGREGO UNA UNIDAD MAS DE ESTE PRODUCTO",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  } else {
    createCartProduct(product);
    Swal.fire({
      title: "¡Operacion Exitosa!",
      text: "SE AGREGÓ EL PRODUCTO AL CARRITO",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  updateCartState();
};

// Funcion para agregar mas de un producto desde el carrito
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnitToProduct(existingCartProduct);
};

// Funcion para restar un producto desde el carrito
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.cantidad === 1) {
    if (window.confirm("Desea eliminar el producto del carrito?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};

// Funcion para remover un producto del carrito
const removeProductFromCart = (product) => {
  cart = cart.filter((item) => item.id !== product.id);
  updateCartState();
};

// Funcion para restar una unidad a un producto del carrito
const substractProductUnit = (product) => {
  cart = cart.map((item) => {
    return item.id === product.id
      ? { ...item, cantidad: Number(item.cantidad) - 1 }
      : item;
  });
};

// Funcion para manejar los eventos al apretar los botones + o - de un item en el carrito
const handleQuantity = (e) => {
  if (e.target.classList.contains("down")) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  updateCartState();
};

//Funcion para vaciar el carrito
//resetCartItems
const resetCart = () => {
  cart = [];
  updateCartState();
};

// Funcion para completar la compra o vaciar el carrito
const completeCartAction = (
  warnMsg,
  warnTxt,
  btnTxt,
  successMsg,
  confirmTxt
) => {
  if (!cart.length) return;
  Swal.fire({
    title: warnMsg,
    text: warnTxt,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: btnTxt,
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      resetCart();
      Swal.fire({
        title: successMsg,
        text: confirmTxt,
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      if (cartList.classList.contains("open-cart")) {
        cartList.classList.remove("open-cart");
        blurOverlay.classList.remove("show-overlay");
      }
    }
  });
};

// Funcion para disparar el mensaje de compra exitosa
const completeBuy = () => {
  completeCartAction(
    "¿Desea finalizar la compra?",
    "Esta a punto de finalizar la compra, ¿Que desea hacer?",
    "Finalizar",
    "Gracias por su compra!",
    "Hemos recibido su pedido. Enviaremos todos los detalles por correo"
  );
};

// Funcion para disparar el mensaje de vaciado exitoso de carrito
const deleteCart = () => {
  completeCartAction(
    "¿Desea vaciar el carrito?",
    "Esta accion no se puede revertir",
    "Vaciar",
    "¡Operacion Exitosa!",
    "El carrito se ha vaciado correctamente"
  );
};

export const cartFunctionsInit = () => {
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", showTotal);
  cartContainer.addEventListener("click", handleQuantity);
  btnComprar.addEventListener("click", completeBuy);
  btnLimpiar.addEventListener("click", deleteCart);
  disableBtn(btnComprar);
  disableBtn(btnLimpiar);
  updateCartQuantityBubble(cart);
};
