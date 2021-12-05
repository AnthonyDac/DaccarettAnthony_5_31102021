cart = JSON.parse(localStorage.getItem("cart"));
user = JSON.parse(localStorage.getItem("user"));
arrayOfId = [];
if(cart != null) {
    cart.forEach(element => {
        arrayOfId.push(element.id);
    });
}
const commande = {
    contact: {
    firstName: user.firstname,
    lastName: user.lastname,
    address: user.address,
    city: user.city,
    email: user.email
    }, products : arrayOfId,
}
const options = {
    method: "POST",
    body: JSON.stringify(commande),
    headers: {
        "Content-Type": "application/json"
    }
}
fetch("http://localhost:3000/api/products/order", options).then(res => res.json()).then(data => {
    var orderShowID = document.getElementById("orderId");
    orderShowID.innerHTML = data.orderId;
    localStorage.clear();
})