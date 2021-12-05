const link = window.location;
const url = new URL(link);
const id = url.searchParams.get("id");

async function connect() {
  await fetch("http://127.0.0.1:3000/api/products/" + id)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      productSelected = value;
      displayer(value);
    })
    .catch(function (err) {
      alert("Y a un problème de connexion!");
    });
}
connect();
function displayer(product) {
  var image = document.getElementsByClassName("item__img");
  image[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
  var title = document.getElementById("title");
  title.innerHTML = `${product.name}`
  var prix = document.getElementById("price");
  prix.innerHTML = `${product.price}`
  var description = document.getElementById("description");
  description.innerHTML = `${product.description}`
  var colors = document.getElementById("colors");
  colors.innerHTML += product.colors.map((color) => `<option value="${color}">${color}</option>`)
}