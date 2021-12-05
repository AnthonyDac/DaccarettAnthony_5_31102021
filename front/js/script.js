async function connect() {
  await fetch("http://localhost:3000/api/products/")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value);
      displayer(value);
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}
connect();

function displayer(products) {
  var container = document.getElementById("items");
  container.innerHTML += products.map(
    (product) => `<a href="./product.html?id=${product._id}">
  <article>
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    <h3 class="productName">${product.name}</h3>
    <p class="productDescription">${product.description}</p>
  </article>
</a>`);
}