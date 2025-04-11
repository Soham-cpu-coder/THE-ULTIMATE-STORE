document.addEventListener("DOMContentLoaded", function () {
    checkProgress();
    displayCart(); // Load cart on page load
});

// 🔄 Function to show a specific checkout step
function showStep(step) {
    document.querySelectorAll(".step-content").forEach((section) => {
        section.style.display = "none";
    });

    document.getElementById(`step-${step}`).style.display = "block";

    if (step === 1) {
        displayCart(); // Ensure cart data appears in the cart review step
    }

    checkProgress(); // Refresh progress check
}

// ✅ Check sessionStorage progress & update buttons
function checkProgress() {
    let shippingCompleted = sessionStorage.getItem("shippingCompleted");
    let paymentCompleted = sessionStorage.getItem("paymentCompleted");

    console.log("🔍 Shipping Status:", shippingCompleted);
    console.log("🔍 Payment Status:", paymentCompleted);
}

// 🛒 Display cart items in the review step
function displayCart() {
    let cartContainer = document.getElementById("cart-items");
    let cartTotalContainer = document.getElementById("cart-total");

    cartContainer.innerHTML = ""; // Clear previous content

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<tr><td colspan='4'>🛒 Your cart is empty.</td></tr>";
        cartTotalContainer.textContent = "0.00";
        return;
    }

    let totalAmount = 0;

    cart.forEach(item => {
        let row = document.createElement("tr");
        let totalItemPrice = item.price * item.quantity;
        totalAmount += totalItemPrice;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${totalItemPrice.toFixed(2)}</td>
        `;
        cartContainer.appendChild(row);
    });

    cartTotalContainer.textContent = totalAmount.toFixed(2);
}

// 🚚 Validate & Proceed to Payment
function validateShipping() {
    let name = document.getElementById("name").value.trim();
    let address = document.getElementById("address").value.trim();
    let city = document.getElementById("city").value.trim();
    let zip = document.getElementById("zip").value.trim();

    if (!name || !address || !city || !zip) {
        alert("❌ Please fill out all shipping details before proceeding.");
        return;
    }

    // ✅ Save shipping details IMMEDIATELY
    let shippingDetails = { name, address, city, zip };
    sessionStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

    // ✅ Save shipping status
    sessionStorage.setItem("shippingCompleted", "true");

    console.log("✅ Shipping Details Saved:", sessionStorage.getItem("shippingDetails"));

    showStep(3);
}
// 💳 Validate & Proceed to Confirmation
function validatePayment() {
    let cardNumber = document.getElementById("card-number").value.trim();
    let expiry = document.getElementById("expiry").value.trim();
    let cvv = document.getElementById("cvv").value.trim();

    if (!cardNumber || !expiry || !cvv) {
        alert("❌ Please enter your payment details.");
        return;
    }

    // ✅ Save payment status correctly
    sessionStorage.setItem("paymentCompleted", "true");
    console.log("✅ Payment Status Set:", sessionStorage.getItem("paymentCompleted"));

    showStep(4);
}

// ✅ Confirm Order
function confirmOrder() {
    let shippingCompleted = sessionStorage.getItem("shippingCompleted");
    let paymentCompleted = sessionStorage.getItem("paymentCompleted");

    if (shippingCompleted !== "true") {
        alert("❌ Please complete the shipping details before confirming your order.");
        showStep(2);
        return;
    }

    if (paymentCompleted !== "true") {
        alert("❌ Please complete the payment details before confirming your order.");
        showStep(3);
        return;
    }

    alert("🎉 Order Confirmed! Redirecting to receipt...");

    // ✅ Keep cart data for receipt page
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    sessionStorage.setItem("finalCart", JSON.stringify(cart)); // Store a copy for receipt

    window.location.href = "receipt.html"; // Redirect to receipt
}
