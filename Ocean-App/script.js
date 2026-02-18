// On page load: auto-login and set checkbox
window.onload = function() {
    const remember = localStorage.getItem("rememberMe");
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (remember && storedUser && storedPass) {
        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");
    }

    // Set checkbox state if previously remembered
    if (remember === "true") {
        document.getElementById("rememberMe").checked = true;
        document.getElementById("username").value = storedUser;
        document.getElementById("password").value = storedPass;
    }
   if(localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode"); // Night mode
} else {
    document.body.classList.remove("dark-mode"); // Default = day mode
}
    // Restore recent queries
    const recent = JSON.parse(localStorage.getItem("recentQueries") || "[]");
    const chat = document.getElementById("chatMessages");
    recent.forEach(item => {
        chat.innerHTML += `<p>You: ${item}</p>`;
    });
};
function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const remember = document.getElementById("rememberMe").checked;

    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if(user === storedUser && pass === storedPass) {
        if(remember){
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.removeItem("rememberMe");
        }

        document.getElementById("loginContainer").classList.add("hidden");
        document.getElementById("mainApp").classList.remove("hidden");
    } else {
        alert("Incorrect username or password!");
    }
}
function signup() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if(localStorage.getItem("username") === user) {
        alert("Username already exists!");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Signup successful! Now login.");
    const remember = document.getElementById("rememberMe").checked;

if (remember) {
    localStorage.setItem("rememberMe", "true");
} else {
    localStorage.removeItem("rememberMe");
}

}
function logout() {
    // Hide main app
    document.getElementById("mainApp").classList.add("hidden");
    // Show login page
    document.getElementById("loginContainer").classList.remove("hidden");

    // Clear Remember Me if you want user to re-login manually
    localStorage.removeItem("rememberMe");
}


// SIDEBAR
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}
//show products
function showProducts() {
    const section = document.getElementById("productsSection");

    if (section.style.display === "grid") {
        section.style.display = "none";  // hide if already visible
    } else {
        section.style.display = "grid";  // show products
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// CHATBOT
function toggleChat() {
    document.getElementById("chatbot").classList.toggle("hidden");
}

function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    const chat = document.getElementById("chatMessages");

    if(message === "") return;

    chat.innerHTML += `<p>You: ${message}</p>`;

    // Save query in localStorage
    let recent = JSON.parse(localStorage.getItem("recentQueries") || "[]");
    recent.push(message);
    if(recent.length > 5) recent.shift(); // keep only last 5
    localStorage.setItem("recentQueries", JSON.stringify(recent));

    // Chatbot response
    let response = "I only answer about ocean 🌊";

    if(message.includes("coral")) response = "Corals are beautiful marine organisms!";
    if(message.includes("shark")) response = "Sharks are powerful ocean predators 🦈";
    if(message.includes("fish")) response = "Fishes are the best under water creatures!";
    if(message.includes("sea pearl necklace")) response = "Its a beautiful necklace with price only 120$";
    if(message.includes("glow coral lamp")) response = "The glow coral lamp will make your room shine with price only 150$";
    if(message.includes("ocean wave speaker")) response = "Ocean wave speaker has extremely loud sound with price only 200$";
    if(message.includes("shell mirror")) response = "Shell mirror makes your beauty outclass with price only 170$";
    if(message.includes("under water camera")) response = "Its a waterproof camera with high pixels with price only 350$";
    if(message.includes("star fish lamp")) response = "Star fish lamp makes your choice stylish and cool with price only 130$";

    chat.innerHTML += `<p>Bot: ${response}</p>`;
    input.value = "";

    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;
}

// SHARK
function showShark() {
    const popup = document.getElementById("sharkPopup");
    const sound = document.getElementById("sharkSound");

    popup.style.display = "flex";
    sound.currentTime = 0;
    sound.play().catch(err => console.log(err));

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

document.addEventListener("click", function(e) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");

    if (!sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
        sidebar.classList.remove("active");
    }
});
document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", function() {
        const sound = document.getElementById("bubbleSound");

        // Play bubble sound
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(err => console.log(err));
        }

        // Add glow + zoom
        card.classList.add("bubble-effect");

        setTimeout(() => {
            card.classList.remove("bubble-effect");
        }, 600);
    });
});
// REALISTIC FLOATING BUBBLES
function createBubbles() {
    const container = document.querySelector(".bubble-container");

    setInterval(() => {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");

        // Random horizontal position
        bubble.style.left = Math.random() * 100 + "vw";

        // Random size (5px to 25px)
        const size = 5 + Math.random() * 20;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        // Random animation duration for rise and sway
        const riseDuration = 5 + Math.random() * 5; // 5s to 10s
        const swayDuration = 2 + Math.random() * 3; // 2s to 5s
        bubble.style.animationDuration = `${riseDuration}s, ${swayDuration}s`;

        container.appendChild(bubble);

        // Remove bubble after rise animation completes
        setTimeout(() => {
            bubble.remove();
        }, riseDuration * 1000);

    }, 100); // create a bubble every 0.1s
}

// Start bubbles
createBubbles();
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
}
document.addEventListener("click", function(e) {
    // Optional: prevent ripple on inputs/buttons
    if(e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;

    const ripple = document.createElement("div");
    ripple.classList.add("ripple");
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600); // must match animation duration
});
let cart = []; // store selected products
let cartMode = false;

// Open cart selection mode
function openCart() {
    cartMode = true;
    document.getElementById("saveCartBtn").classList.remove("hidden");
    alert("Select products you want to add to your cart. Click 'Save Selection' when done.");
}

// Product click handler
document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
        if(!cartMode) return; // only selectable in cart mode
        const productName = card.dataset.name;
        
        // Toggle selection
        if(cart.includes(productName)) {
            cart = cart.filter(p => p !== productName);
            card.classList.remove("selected");
            card.querySelector(".remove-product").classList.add("hidden");
        } else {
            cart.push(productName);
            card.classList.add("selected");
            card.querySelector(".remove-product").classList.remove("hidden");
        }
    });

    // Remove button
    const removeBtn = card.querySelector(".remove-product");
    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productName = card.dataset.name;
        cart = cart.filter(p => p !== productName);
        card.classList.remove("selected");
        removeBtn.classList.add("hidden");
    });
});

// Save selection
document.getElementById("saveCartBtn").addEventListener("click", () => {
    if(cart.length === 0) {
        alert("No products selected!");
        return;
    }
    // Store in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cart));
    cartMode = false;
    document.getElementById("saveCartBtn").classList.add("hidden");
    
    // Remove all selections visually
    document.querySelectorAll(".product-card.selected").forEach(card => {
        card.classList.remove("selected");
        card.querySelector(".remove-product").classList.add("hidden");
    });

    alert("Products saved to cart! You can now go to Checkout.");
    
    // 👇 Redirect to checkout page
    window.location.href = "checkout.html";
});
