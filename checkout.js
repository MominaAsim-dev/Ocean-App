// 1️⃣ Dark mode
if(localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// 2️⃣ Selected products and prices
const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
const productPrices = {
    "Sea Pearl Necklace": 120,
    "Glow Coral Lamp": 150,
    "Ocean Wave Speaker": 200,
    "Shell Mirror": 170,
    "Underwater Camera": 350,
    "Starfish Lamp": 130
};

// 3️⃣ Count quantities
const cartCounts = {};
cart.forEach(item => {
    cartCounts[item] = (cartCounts[item] || 0) + 1;
});

// 4️⃣ Populate checkout products
const productList = document.getElementById("checkoutProducts");
let total = 0;

for(const [item, qty] of Object.entries(cartCounts)) {
    const div = document.createElement("div");
    div.classList.add("product-item");
    div.dataset.name = item;
    div.dataset.qty = qty;
    div.innerHTML = `
        ${item} - $${productPrices[item]} x <span class="qty">${qty}</span>
        <div class="plus-btn">+</div>
        <div class="minus-btn">×</div>
    `;
    productList.appendChild(div);
    updateTotal();
    total += productPrices[item] * qty;

    // Plus button
    div.querySelector(".plus-btn").addEventListener("click", () => {
        div.dataset.qty = parseInt(div.dataset.qty) + 1;
        div.querySelector(".qty").innerText = div.dataset.qty;
        updateTotal();
    });

    // Minus button
    div.querySelector(".minus-btn").addEventListener("click", () => {
        let newQty = parseInt(div.dataset.qty) - 1;
        if(newQty <= 0) {
            div.remove();
            delete cartCounts[item];
        } else {
            div.dataset.qty = newQty;
            div.querySelector(".qty").innerText = newQty;
        }
        updateTotal();
    });
}

// 5️⃣ Update total price
function updateTotal() {
    let newTotal = 0;
    document.querySelectorAll(".product-item").forEach(div => {
        const name = div.dataset.name;
        const qty = parseInt(div.dataset.qty);
        newTotal += productPrices[name] * qty;
    });
    document.getElementById("totalPrice").innerText = newTotal;
}

// 6️⃣ Handle form submission
document.getElementById("checkoutForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Your order is confirmed! Thank you for shopping 🛒");

    // Clear cart
    localStorage.removeItem("cartItems");
    window.location.href = "index.html";
});
