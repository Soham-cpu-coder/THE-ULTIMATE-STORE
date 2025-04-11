document.addEventListener("DOMContentLoaded", function () {
    renderCart();
});

// 🛒 Load Cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// 🖥️ Render Cart Items
function renderCart() {
    let cartTable = document.getElementById("cart-items");
    cartTable.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='5'>Your cart is empty.</td></tr>";
        document.getElementById("cart-total").innerText = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><input type='number' value='${item.quantity}' min='1' onchange='updateQuantity(${index}, this.value)'></td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        </tr>`;
        cartTable.innerHTML += row;
        total += item.price * item.quantity;
    });

    document.getElementById("cart-total").innerText = total.toFixed(2);
}

// 🔄 Update Quantity
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ❌ Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// 🚮 Clear Cart
function clearCart() {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ✅ Proceed to Checkout
function checkout() {
    let user = localStorage.getItem("loggedInUser");
    if (!user) {
        alert("You must be logged in to proceed to checkout.");
        window.location.href = "login.html";
    } else {
        sessionStorage.setItem("cart", JSON.stringify(cart)); // ✅ Store cart for checkout page
        window.location.href = "checkout.html";
    }
}

// ➕ Add Items to Cart (Called from Product Pages)
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " added to cart!");
}
