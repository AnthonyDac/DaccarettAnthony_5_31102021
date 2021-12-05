var cart = [];
var isFirstNameValid = false;
var isLastNameValid = false;
var isAddressValid = false;
var isCityValid = false;
var isEmailValid = false;
cart = JSON.parse(localStorage.getItem("cart"));
function displayer(products) {
  var container = document.getElementById("cart__items");
  if (cart.length > 0) {
    container.innerHTML = "";
    container.innerHTML += cart.map((product) => `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.image}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p>${product.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" oninput="update('${product.id}', '${product.color}')" class="itemQuantity" name="itemQuantity" id="${product.id}" min="1" max="100" value="${product.quantity}">
        </div>
        <div onclick="supprimer('${product.id}', '${product.color}')" class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`
    );
    calculerprix();
    calculerquantity()
  } else {
    container.innerHTML =
      "<h2>Votre panier est vide</h2> <a href='index.html'>Consultez nos produits pour vous confectionner un panier</a>";
  }
}
function update(id, color) {
  var quantity = document.getElementById(id).value;
  if(quantity == "") {
      quantity = 0;
  }
  if (quantity > 100) {
    document.getElementById(id).value = 100;
    quantity = 100;
  }
  const find = cart.findIndex((el) => el.id == id && el.color == color);
  cart[find].quantity = quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  calculerprix();
  calculerquantity();
}
function calculerprix() {
  var totalPrix = 0;
  var finalPrice = document.getElementById("totalPrice");
  cart.map((product) => {
    totalPrix += parseInt(product.quantity) * parseInt(product.price);
  });
  finalPrice.innerHTML = totalPrix;
}
function calculerquantity() {
    var totalquantity = 0;
    var finalQuantity = document.getElementById("totalQuantity");
    cart.map((product) => {
        totalquantity += parseInt(product.quantity);
    });
    finalQuantity.innerHTML = totalquantity;
}
function supprimer(id, color) {
  const find = cart.findIndex((el) => el.id == id && el.color == color);
  cart.splice(find, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayer();
}
displayer();
checkerSubmit();
var firstInput = document.getElementById("firstName");
firstInput.addEventListener('input', function(e) {
    let firstRegExp = new RegExp('^[A-Z-a-z\s]{3,40}$');
    var firstError = document.getElementById('firstNameErrorMsg');
    if(firstRegExp.test(firstInput.value)) {
        firstError.innerHTML = "";
        isFirstNameValid = true;
    }
    else {
        firstError.innerHTML = "Champ vide ou incorrect";
        isFirstNameValid = false;
    }
    checkerSubmit();
});
var nameInput = document.getElementById("lastName");
nameInput.addEventListener('input', function(e) {
    let nameRegExp = new RegExp('^[A-Z-a-z\s]{3,40}$');
    var nameError = document.getElementById('lastNameErrorMsg');
    if(nameRegExp.test(nameInput.value)) {
      nameError.innerHTML = "";
      isLastNameValid = true;
    }
    else {
      nameError.innerHTML = "Champ vide ou incorrect";
      isLastNameValid = false;
    }
    checkerSubmit();
});
var addressInput = document.getElementById("address");
addressInput.addEventListener('input', function(e) {
    let addressRegExp = new RegExp('^[a-zA-Z0-9-._\' &éèà\s]{3,70}$');
    var addressError = document.getElementById('addressErrorMsg');
    if(addressRegExp.test(addressInput.value)) {
      addressError.innerHTML = "";
      isAddressValid = true;
    }
    else {
      addressError.innerHTML = "Champ vide ou incorrect";
      isAddressValid = false;
    }
    checkerSubmit();
});
var cityInput = document.getElementById("city");
cityInput.addEventListener('input', function(e) {
    let cityRegExp = new RegExp('^[A-Z-a-z\s]{3,40}$');
    var cityError = document.getElementById('cityErrorMsg');
    if(cityRegExp.test(cityInput.value)) {
      cityError.innerHTML = "";
      isCityValid = true;
    }
    else {
      cityError.innerHTML = "Champ vide ou incorrect";
      isCityValid = false;
    }
    checkerSubmit();
});
var emailInput = document.getElementById("email");
emailInput.addEventListener('input', function(e) {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.]{4,}@[a-zA-Z0-9-]{3,}.[a-zA-Z0-9-]{2,}$');
    var emailError = document.getElementById('cityErrorMsg');
    if(emailRegExp.test(emailInput.value)) {
      emailError.innerHTML = "";
      isEmailValid = true;
    }
    else {
      emailError.innerHTML = "Champ vide ou incorrect";
      isEmailValid = false;
    }
    checkerSubmit();
});

function checkerSubmit() {
  var formSubmit = document.getElementById("order");
  if(isFirstNameValid && isLastNameValid && isAddressValid && isEmailValid && isCityValid) {
    document.getElementById("order").disabled = false;
  }
  else {
    document.getElementById("order").disabled = true;
  }
}

var formSubmit = document.getElementById("order");
formSubmit.addEventListener('click', function(e) {
  e.preventDefault();
    if(isFirstNameValid && isLastNameValid && isAddressValid && isEmailValid && isCityValid) {
      const user = {
        firstname: firstInput.value,
        lastname: nameInput.value,
        address: addressInput.value,
        city: cityInput.value,
        email: emailInput.value
      }
      localStorage.setItem('user', JSON.stringify(user));
      window.location.assign("./confirmation.html");
    }
    else {
      console.log("Nop");
    }
});