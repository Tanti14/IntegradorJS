const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const asuntoInput = document.getElementById("asunto");
const txtAreaInput = document.getElementById("message");
const loaderSpinnerContainer = document.querySelector("#contenedor-carga")

/* Loader */

window.onload = () => {
  const load = () => {
    loaderSpinnerContainer.style.visibility = 'hidden';
    loaderSpinnerContainer.style.opacity = '0';
  }
  setTimeout(load, 1000)
}

// =====================================================================
// Verificaciones
const isEmpty = (input) => {
  return !input.value.trim().length;
};

const hasNumber = (input) => {
  const re = /\d/;
  return re.test(input.value.trim());
};

const isBetween = (input, min, max) => {
  return input.value.length >= min && input.value.length < max;
};

const isValidMail = (input) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  return re.test(input.value.trim());
};
// ======================================================================

const showError = (input, message) => {
  const formField = input.parentElement;
  input.classList.remove("noerror");
  input.classList.add("error");
  const error = formField.querySelector(".msg");
  /* error.style.display = "block"; */
  error.textContent = message;
};

const showNoError = (input) => {
  const formField = input.parentElement;
  input.classList.add("noerror");
  input.classList.remove("error");
  const error = formField.querySelector(".msg");
  /* error.style.display = "block"; */
  error.textContent = "";
};

// =========================================================================
// Validacion de inputs

// Validacion Input Name y LastName
const checkCompleteName = (input) => {
  let valid = false;
  const minn = 2;
  const maxx = 16;

  if (isEmpty(input)) {
    showError(input, "Este campo es obligatorio");
    return;
  }

  if (hasNumber(input)) {
    showError(input, "Este campo es no admite números");
    return;
  }

  if (!isBetween(input, minn, maxx)) {
    showError(
      input,
      `Este campo debe tener entre ${minn} y ${maxx} caracteres`
    );
    return;
  }

  showNoError(input);
  valid = true;
  return valid;
};
// =========================================================================

// Validacion Input Email
const checkEmail = (input) => {
  let valid = false;

  if (isEmpty(input)) {
    showError(input, "Porfavor, ingrese un email");
    return;
  }

  if (!isValidMail(input)) {
    showError(input, "Porfavor, ingrese un email valido");
    return;
  }

  showNoError(input);
  valid = true;
  return valid;
};
// =========================================================================

// Validacion Input Asunto
const checkAsuntoInput = (input) => {
  let valid = false;
  const minn = 10;
  const maxx = 80;

  if (isEmpty(input)) {
    showError(input, "Porfavor, ingrese un Asunto para el Ticket");
    return;
  }

  if (!isBetween(input, minn, maxx)) {
    showError(
      input,
      `Este campo debe tener entre ${minn} y ${maxx} caracteres`
    );
    return;
  }

  showNoError(input);
  valid = true;
  return valid;
};
// =========================================================================

// Validacion Text Area
const checkTxtAreaInput = (input) => {
  let valid = false;
  const minn = 100;
  const maxx = 3000;

  if (isEmpty(input)) {
    showError(input, "Porfavor, escriba su mensaje");
    return;
  }

  if (!isBetween(input, minn, maxx)) {
    showError(
      input,
      `Este campo debe tener entre ${minn} y ${maxx} caracteres`
    );
    return;
  }

  showNoError(input);
  valid = true;
  return valid;
};
// =========================================================================

// =========================================================================

const validateForm = (e) => {
  e.preventDefault();

  let isNameValid = checkCompleteName(nameInput);
  let isLastNameValid = checkCompleteName(lastNameInput);
  let isEmailValid = checkEmail(emailInput);
  let isAsuntoValid = checkAsuntoInput(asuntoInput);
  let isTxtAreaValid = checkTxtAreaInput(txtAreaInput);

  const goToMain = () => {
    window.location.href = "../index.html"
  }

  let isValidForm =
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isAsuntoValid &&
    isTxtAreaValid;

  if (isValidForm) {
    Swal.fire({
      title: '¡Operacion Exitosa!',
      text: 'Su mensaje ha sido enviado con Exito. Nos comunicaremos lo antes posible',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(goToMain, 2500)
    
  } else {
    Swal.fire({
      title: '¡Oops, algo no ha salido bien! ',
      text: 'Complete los campos para poder enviar su ticket.',
      icon: 'error',
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const init = () => {
  contactForm.addEventListener("submit", validateForm);
  nameInput.addEventListener("input", () => checkCompleteName(nameInput));
  lastNameInput.addEventListener("input", () =>
    checkCompleteName(lastNameInput)
  );
  emailInput.addEventListener("input", () => checkEmail(emailInput));
  asuntoInput.addEventListener("input", () => checkAsuntoInput(asuntoInput));
  txtAreaInput.addEventListener("input", () => checkTxtAreaInput(txtAreaInput));
};

init()
